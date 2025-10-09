import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../database/entities/station.entity';
import { StationTag } from '../database/entities/station-tag.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { Umbrella } from '../database/entities/umbrella.entity';
import { Rental } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Station, Umbrella, StationTag, Rental])],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
