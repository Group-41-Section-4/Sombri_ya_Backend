import { IsUUID, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsUUID()
  userId!: string;

  @IsString()
  token!: string; // token crudo que vino por email

  @IsString()
  @MinLength(8)
  newPassword!: string;
}
