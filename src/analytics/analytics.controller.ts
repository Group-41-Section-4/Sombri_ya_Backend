import { Controller, Get, Query, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { DateRangeDto, TopFeaturesDto, BookingsFrequencyDto, RainProbabilityDto } from './dto/query-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('availability')
  getAvailability(@Query('station_id') station_id: string) {
    return this.analyticsService.getAvailability(station_id);
  }

  @Get('bookings/frequency')
  getBookingsFrequency(@Query() query: BookingsFrequencyDto) {
    return this.analyticsService.getBookingsFrequency(query.start_date, query.end_date, query.group_by);
  }

  @Get('heatmap/users')
  getUserHeatmap(@Query() query: DateRangeDto) {
    return this.analyticsService.getUserHeatmap(query.start_date, query.end_date);
  }

  @Get('heatmap/stations')
  getStationHeatmap(@Query() query: DateRangeDto) {
    return this.analyticsService.getStationHeatmap(query.start_date, query.end_date);
  }

  @Get('features/top')
  getTopFeatures(@Query() query: TopFeaturesDto) {
    return this.analyticsService.getTopFeatures(query.start_date, query.end_date, Number(query.limit) || 5);
  }

  @Get('features/nfc-vs-qr')
  getNfcVsQr(@Query() query: DateRangeDto) {
    return this.analyticsService.getNfcVsQr(query.start_date, query.end_date);
  }

  @Get('biometric-usage')
  getBiometricUsage() {
    return this.analyticsService.getBiometricUsage();
  }

  @Get('rain-probability')
  getRainProbability(@Query() query: RainProbabilityDto) {
    return this.analyticsService.getRainProbability(Number(query.lat), Number(query.lon));
  }
}