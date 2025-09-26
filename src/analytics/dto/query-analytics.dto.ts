import { IsDateString, IsIn, IsLatitude, IsLongitude, IsNumberString, IsOptional } from 'class-validator';

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
