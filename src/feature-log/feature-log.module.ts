import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { FeatureLogController } from './feature-log.controller';
import { FeatureLogService } from './feature-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureLog])],
  controllers: [FeatureLogController],
  providers: [FeatureLogService],
})
export class FeatureLogModule {}