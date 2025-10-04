import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './authentication.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { PasswordStrategy } from './strategies/password.strategy';
import { GoogleAuthAdapter } from './adapters/google-auth.adapter';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
    private readonly googleAdapter: GoogleAuthAdapter,
  ) {}

  @Post('login/google')
  async googleLogin(@Body('idToken') idToken: string) {
    const strategy = new GoogleStrategy(
      this.googleAdapter,
      this.jwt,
      this.authService,
    );
    return strategy.authenticate({ idToken });
  }

  @Post('login/password')
  async passwordLogin(@Body() body: { email: string; password: string }) {
    const strategy = new PasswordStrategy(this.authService, this.jwt);
    return strategy.authenticate(body);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      biometric_enabled: boolean;
      email: string;
      name: string;
      password: string;
    },
  ) {
    const user = await this.authService.registerUser(
      body.email,
      body.name,
      body.password,
      body.biometric_enabled ?? false,
    );
    return { message: 'Usuario registrado', user };
  }
  @Post('debug-password')
  async debugPassword(@Body() body: { email: string; password: string }) {
    const user = await this.authService.findUserByEmail(body.email);

    if (!user) {
      return { ok: false, reason: 'Usuario no encontrado' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const match = await bcrypt.compare(body.password, user.password ?? '');
    return {
      ok: match,
      inputPassword: body.password,
      storedHash: user.password,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user; // aquí el JWT guard mete el user.id, email, name, etc.
  }
}
