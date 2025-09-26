import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Plan } from '../entities/plan.entity';
import { Station } from '../entities/station.entity';
import { Umbrella } from '../entities/umbrella.entity';
import { InitialSeed } from './initial-seed';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan, Station, Umbrella])],
  providers: [InitialSeed],
})
export class SeedsModule {}
