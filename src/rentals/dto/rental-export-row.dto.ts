// src/rentals/dto/rental-export-row.dto.ts
import { Expose } from 'class-transformer';
import { RentalStatus } from '../../database/entities/rental.entity';

export class RentalExportRowDto {
  @Expose({ name: 'rental_id' })
  id: string;

  @Expose({ name: 'start_time' })
  startTime: Date;

  @Expose({ name: 'end_time' })
  endTime: Date;

  @Expose()
  status: RentalStatus;

  @Expose({ name: 'duration_minutes' })
  durationMinutes: number;

  @Expose({ name: 'distance_meters' })
  distanceMeters?: number | null;

  @Expose({ name: 'start_station_name' })
  startStationName: string; // place_name

  @Expose({ name: 'end_station_name' })
  endStationName?: string | null;
}
