import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  biometric_enabled?: boolean;
}
