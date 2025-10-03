import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './authentication.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { PasswordStrategy } from './strategies/password.strategy';
import { GoogleAuthAdapter } from './adapters/google-auth.adapter';

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
    @Body() body: { email: string; name: string; password: string },
  ) {
    const user = await this.authService.registerUser(
      body.email,
      body.name,
      body.password,
    );
    return { message: 'Usuario registrado', user };
  }
}
