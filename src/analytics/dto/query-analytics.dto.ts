import {
  IsDateString,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}

export class TopFeaturesDto extends DateRangeDto {
  @IsNumberString()
  @IsOptional()
  limit?: string;
}

export class BookingsFrequencyDto extends DateRangeDto {
  @IsIn(['day', 'week', 'month'])
  group_by: string;
}

export class RainProbabilityDto {
  @IsLatitude()
  lat: string;

  @IsLongitude()
  lon: string;
}

export class TimeBucketsDto extends DateRangeDto {
  @IsNumberString()
  @IsOptional()
  bucket_minutes?: string;

  @IsOptional()
  tz?: string;

  @IsOptional()
  auth_type?: 'nfc' | 'qr';
}

export class PeaksDto extends TimeBucketsDto {
  @IsNumberString()
  @IsOptional()
  top?: string;
}

export class TimeOfDayDto extends DateRangeDto {
  @IsOptional()
  tz?: string;

  @IsOptional()
  split_by_weekday?: '1' | '0';

  @IsOptional()
  station_id?: string;

  @IsOptional()
  auth_type?: 'nfc' | 'qr';
}
