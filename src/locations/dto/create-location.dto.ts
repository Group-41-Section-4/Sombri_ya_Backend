import { IsLatitude, IsLongitude, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsUUID()
  userId: string;
}
