import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  mailer: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOrCreateUser(email: string, name: string) {
    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      user = this.userRepo.create({ email, name });
      user = await this.userRepo.save(user);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async registerUser(
    email: string,
    name: string,
    password: string,
    biometric_enabled: boolean,
  ) {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      name,
      password: hashedPassword,
      biometric_enabled,
    });

    return this.userRepo.save(user);
  }

  // =============== FORGOT ===============
  async requestPasswordReset(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    // Siempre respondemos ok para no revelar existencia del email
    if (!user) return { ok: true };

    // 1) Generar token crudo aleatorio
    const rawToken = crypto.randomBytes(32).toString('base64url');

    // 2) Hashear token para almacenar (bcrypt)
    const tokenHash = await bcrypt.hash(rawToken, 10);

    // 3) Expiración (30 minutos)
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    user.passwordResetTokenHash = tokenHash;
    user.passwordResetExpires = expires;
    await this.userRepo.save(user);

    // 4) Construir enlaces (deep link + web)
    const scheme = process.env.APP_SCHEME ?? 'sombri-ya';
    const host = process.env.APP_SCHEME_HOST ?? 'reset-password';

    const deepLink = `${scheme}://${host}?userId=${user.id}&token=${rawToken}`;

    await this.sendPasswordResetEmail(user.email, { deepLink });

    if (process.env.NODE_ENV !== 'production') {
      // Para probar rápido en dev
      // eslint-disable-next-line no-console
      console.log('[DEV] Reset links:', { deepLink });
    }

    return { ok: true };
  }

  // =============== RESET ===============
  async resetPassword(userId: string, rawToken: string, newPassword: string) {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException(
        'La nueva contraseña es inválida (mínimo 8 caracteres)',
      );
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.passwordResetTokenHash || !user.passwordResetExpires) {
      throw new BadRequestException('Token inválido o expirado');
    }
    if (user.passwordResetExpires.getTime() < Date.now()) {
      throw new BadRequestException('Token expirado');
    }

    const ok = await bcrypt.compare(rawToken, user.passwordResetTokenHash);
    if (!ok) throw new BadRequestException('Token inválido');

    // Actualiza contraseña y limpia campos de reset
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetTokenHash = null;
    user.passwordResetExpires = null;

    // Invalida JWTs previos (si verificas passwordVersion en tu JwtStrategy)
    user.passwordVersion = (user.passwordVersion ?? 0) + 1;

    await this.userRepo.save(user);
    return { ok: true };
  }

  // =============== EMAIL ===============
  private async sendPasswordResetEmail(
    to: string,
    links: { deepLink: string },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.mailer.sendMail({
      to,
      subject: 'Restablece tu contraseña',
      template: 'reset-password',
      context: links,
    });
  }
}
