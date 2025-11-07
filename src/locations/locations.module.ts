import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../database/entities/location.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, User])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
