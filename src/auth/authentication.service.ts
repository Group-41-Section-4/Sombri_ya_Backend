import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailer: MailerService,
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
    const generic = { ok: true };

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      await new Promise((r) => setTimeout(r, 100));
      return generic;
    }

    const rawToken = crypto.randomBytes(32).toString('base64url');
    const tokenHash = await bcrypt.hash(rawToken, 10);
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    user.passwordResetTokenHash = tokenHash;
    user.passwordResetExpires = expires;
    await this.userRepo.save(user);

    // Ejemplo de valor por defecto: sombriya://reset
    const appDeepLinkBase =
      process.env.APP_DEEPLINK_BASE ?? 'sombri-ya://reset-password';

    // 🌐 Fallback web (solo por si la app no está instalada)
    const query = `user=${encodeURIComponent(user.id)}&token=${encodeURIComponent(rawToken)}`;

    const appLink = `${appDeepLinkBase}?${query}`;

    try {
      await this.mailer.sendMail({
        to: user.email,
        subject: 'Recupera tu contraseña',
        html: `
          <p>Hola,</p>
          <p>Para restablecer tu contraseña, abre el siguiente enlace desde tu <strong>celular con la app instalada</strong>:</p>
          <p><a href="${appLink}">Abrir en Sombri-Ya</a></p>
          <p>Este enlace vence en 30 minutos. Si no solicitaste esto, ignora este correo.</p>
        `,
      });
    } catch (e) {
      console.error('[reset email error]', e);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] App deep link:', appLink);
    }

    return generic;
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

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetTokenHash = null;
    user.passwordResetExpires = null;
    user.passwordVersion = (user.passwordVersion ?? 0) + 1;

    await this.userRepo.save(user);
    return { ok: true };
  }
}
