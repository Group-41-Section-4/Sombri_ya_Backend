import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { AuthType } from '../../database/entities/rental.entity';

export class StartRentalDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  station_start_id: string;

  @IsOptional()
  @IsUUID()
  payment_method_id?: string;

  @IsNotEmpty()
  @IsEnum(AuthType)
  auth_type: AuthType;
}
