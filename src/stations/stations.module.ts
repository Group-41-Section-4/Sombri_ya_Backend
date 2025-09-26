import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../database/entities/station.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { Umbrella } from '../database/entities/umbrella.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station, Umbrella])],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}