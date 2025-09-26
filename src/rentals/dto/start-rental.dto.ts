import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator';
import { AuthType } from '../../database/entities/rental.entity';

class GpsCoordDto {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lon: number;
}

export class StartRentalDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  umbrella_id: string;

  @IsNotEmpty()
  @IsUUID()
  station_start_id: string;

  @IsOptional()
  @IsUUID()
  payment_method_id?: string;

  @IsNotEmpty()
  @IsObject()
  start_gps: GpsCoordDto;

  @IsNotEmpty()
  @IsEnum(AuthType)
  auth_type: AuthType;
}
