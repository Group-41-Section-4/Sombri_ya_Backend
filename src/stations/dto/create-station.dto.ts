import {
  IsNotEmpty,
  IsString,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateStationDto {
  @IsNotEmpty()
  @IsString()
  place_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity: number = 10;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
