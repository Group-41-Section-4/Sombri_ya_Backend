// src/rentals/dto/rental-export.dto.ts
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { RentalStatus } from '../../database/entities/rental.entity';

export class RentalsExportDto {
  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  start?: Date;

  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  end?: Date;

  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  updatedSince?: Date;

  @IsOptional()
  @IsEnum(RentalStatus)
  status?: RentalStatus;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  placeId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  limit?: number;

  // keyset: "<ISO8601>|<id-uuid>"
  @IsOptional()
  @IsString()
  cursor?: string;
}
