import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateRentalFormatDto {
  @Type(() => Number)
  @IsInt()
  someInt: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description: string;

  @IsUUID() // o IsString() si rentalId no es uuid
  rentalId: string;
}
