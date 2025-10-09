import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class QueryStationDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsNumber()
  radius_m?: number = 10000;

  @IsOptional()
  @IsNumber()
  page?: number = 1;
}
