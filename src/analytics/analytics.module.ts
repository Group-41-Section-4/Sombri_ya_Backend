import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Rental } from '../database/entities/rental.entity';
import { Station } from '../database/entities/station.entity';
import { User } from '../database/entities/user.entity';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { AppOpenLog } from '../database/entities/app-open-log.entity';
import { WeatherModule } from '../weather/weather.module';
import { Subscription } from '../database/entities/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rental,
      Station,
      User,
      FeatureLog,
      AppOpenLog,
      Subscription,
    ]),
    WeatherModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
