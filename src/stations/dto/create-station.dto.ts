import { IsNotEmpty, IsString, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class CreateStationDto {
  @IsNotEmpty()
  @IsString()
  place_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
