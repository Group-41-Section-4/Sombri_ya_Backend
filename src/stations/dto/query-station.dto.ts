import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class QueryStationDto {
  @IsNotEmpty()
  @IsNumberString()
  lat: string;

  @IsNotEmpty()
  @IsNumberString()
  lon: string;

  @IsOptional()
  @IsNumberString()
  radius_m?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
