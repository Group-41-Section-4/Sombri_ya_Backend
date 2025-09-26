import { Body, Controller, Post } from '@nestjs/common';
import { FeatureLogService } from './feature-log.service';
import { CreateFeatureLogDto } from './dto/create-feature-log.dto';

@Controller('feature-log')
export class FeatureLogController {
  constructor(private readonly featureLogService: FeatureLogService) {}

  @Post()
  create(@Body() createFeatureLogDto: CreateFeatureLogDto) {
    return this.featureLogService.create(createFeatureLogDto);
  }
}