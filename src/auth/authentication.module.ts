import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';
import { User } from '../database/entities/user.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { PasswordStrategy } from './strategies/password.strategy';
import { JwtStrategy } from './strategies/jwt-auth.guard';
import { GoogleAuthAdapter } from './adapters/google-auth.adapter';
import { UsersModule } from '../users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM ?? '"Sombri-Ya" <no-reply@ejemplo.com>',
      },
      template: {
        dir: __dirname + '/templates',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
    UsersModule,
  ],
  providers: [AuthService, GoogleStrategy, PasswordStrategy, JwtStrategy, GoogleAuthAdapter],
  controllers: [AuthController],
})
export class AuthModule {}
