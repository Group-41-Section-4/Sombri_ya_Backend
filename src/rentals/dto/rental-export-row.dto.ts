// src/rentals/dto/rental-export-row.dto.ts
import { Expose } from 'class-transformer';
import { RentalStatus } from '../../database/entities/rental.entity';

export class RentalExportRowDto {
  @Expose()
  id: string;

  @Expose()
  startTime: Date;

  @Expose()
  endTime: Date;

  @Expose()
  status: RentalStatus;

  @Expose()
  durationMinutes: number;

  @Expose()
  distanceMeters?: number | null;

  @Expose()
  startStationName: string; // place_name

  @Expose()
  endStationName?: string | null;
}
