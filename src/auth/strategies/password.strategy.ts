import { AuthStrategy } from './authentication_strategy.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../authentication.service';
import * as bcrypt from 'bcrypt';

export class PasswordStrategy implements AuthStrategy {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  async authenticate(data: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; user: any }> {
    // Buscar el usuario
    const user = await this.authService.findUserByEmail(data.email);

    if (!user || !user.password) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar la contraseña con bcrypt
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    // Firmar JWT
    const token = this.jwt.sign(payload);

    return {
      accessToken: token,
      user,
    };
  }
}
