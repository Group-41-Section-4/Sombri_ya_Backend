import { AuthStrategy } from './authentication_strategy.interface';
import {
  GoogleAuthAdapter,
  AuthenticatedUser,
} from '../adapters/google-auth.adapter';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../authentication.service';

export class GoogleStrategy implements AuthStrategy {
  constructor(
    private readonly googleAdapter: GoogleAuthAdapter,
    private readonly jwt: JwtService,
    private readonly authService: AuthService, // para guardar/obtener user en DB
  ) {}

  async authenticate(data: {
    idToken: string;
  }): Promise<{ accessToken: string; user: any }> {
    const googleUser: AuthenticatedUser = await this.googleAdapter.verifyToken(
      data.idToken,
    );

    if (!googleUser) {
      throw new Error('Usuario de Google no válido');
    }

    // Buscar o crear usuario en DB
    let user: any;
    try {
      user = await this.authService.findOrCreateUser(
        googleUser.email,
        googleUser.name,
      );
    } catch {
      throw new Error(
        'Error al buscar o crear el usuario: ' + googleUser.email,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token: string = this.jwt.sign({ sub: user.id, email: user.email });

    return {
      accessToken: token,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user,
    };
  }
}
