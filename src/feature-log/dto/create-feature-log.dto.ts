import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFeatureLogDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_bug?: boolean;

  @IsOptional()
  @IsObject()
  details?: object;
}
