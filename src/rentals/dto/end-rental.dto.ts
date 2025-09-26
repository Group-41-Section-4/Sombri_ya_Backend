import { IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator';

class GpsCoordDto {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lon: number;
}

export class EndRentalDto {
  @IsNotEmpty()
  @IsUUID()
  rental_id: string;

  @IsOptional()
  @IsUUID()
  station_end_id?: string;

  @IsOptional()
  @IsObject()
  end_gps?: GpsCoordDto;
}
