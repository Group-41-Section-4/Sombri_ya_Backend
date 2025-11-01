// rentals-export.dto.ts
import { IsOptional, IsInt, IsISO8601, IsString } from 'class-validator';

export class RentalsExportDto {
  @IsOptional() @IsISO8601() start?: string;
  @IsOptional() @IsISO8601() end?: string;
  @IsOptional() @IsString() status?: 'confirmed' | 'completed' | 'cancelled';
  @IsOptional() @IsString() placeId?: string;
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsISO8601() updatedSince?: string;

  @IsOptional() @IsInt() limit?: number;
  @IsOptional() @IsString() cursor?: string;
}
