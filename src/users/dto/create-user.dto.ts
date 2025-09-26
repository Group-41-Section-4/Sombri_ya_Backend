import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  biometric_enabled?: boolean;
}
