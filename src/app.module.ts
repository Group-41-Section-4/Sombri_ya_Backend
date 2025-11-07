import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { StationsModule } from './stations/stations.module';
import { UmbrellasModule } from './umbrellas/umbrellas.module';
import { RentalsModule } from './rentals/rentals.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { FeatureLogModule } from './feature-log/feature-log.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WeatherModule } from './weather/weather.module';
import { AuthModule } from './auth/authentication.module';
import { TagsModule } from './tags/tags.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    DatabaseModule,
    UsersModule,
    PlansModule,
    SubscriptionsModule,
    StationsModule,
    UmbrellasModule,
    RentalsModule,
    PaymentMethodsModule,
    FeatureLogModule,
    AnalyticsModule,
    WeatherModule,
    AuthModule,
    TagsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
