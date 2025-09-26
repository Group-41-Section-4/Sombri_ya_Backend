import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from '../database/entities/rental.entity';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Umbrella } from '../database/entities/umbrella.entity';
import { Station } from '../database/entities/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Umbrella, Station])],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}