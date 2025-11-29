import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, IsUUID } from 'class-validator';

export class CreateRentalFormatDto {
  @Type(() => Number)
  @IsInt()
  someInt: number;

  @IsString()
  @MaxLength(250)
  description: string;

  @IsUUID() // o IsString() si rentalId no es uuid
  rentalId: string;
}
