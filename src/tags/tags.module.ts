// src/tags/tags.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Station } from '../database/entities/station.entity';
import { StationTag } from '../database/entities/station-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station, StationTag])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
