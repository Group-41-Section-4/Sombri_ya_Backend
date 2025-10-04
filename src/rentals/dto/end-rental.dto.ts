import { IsNotEmpty, IsUUID } from 'class-validator';

export class EndRentalDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  station_end_id: string;
}
