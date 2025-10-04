import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from '../database/entities/rental.entity';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Umbrella } from '../database/entities/umbrella.entity';
import { Station } from '../database/entities/station.entity';
import { PaymentMethod } from '../database/entities/payment-method.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, Umbrella, Station, PaymentMethod, User]),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
