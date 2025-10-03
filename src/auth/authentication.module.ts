import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';
import { User } from '../database/entities/user.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { PasswordStrategy } from './strategies/password.strategy';
import { JwtStrategy } from './strategies/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, GoogleStrategy, PasswordStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
