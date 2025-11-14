import { IsNumber, IsPositive } from 'class-validator';

export class AddDistanceDto {
  @IsNumber()
  @IsPositive()
  distanceKm: number;
}