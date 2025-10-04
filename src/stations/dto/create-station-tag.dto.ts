import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateStationTagDto {
  @IsString()
  @IsNotEmpty()
  tag_uid: string;

  @IsOptional()
  @IsString()
  tag_type?: string;

  @IsOptional()
  meta?: Record<string, any>;
}
