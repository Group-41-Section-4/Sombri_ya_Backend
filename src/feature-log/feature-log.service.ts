import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { CreateFeatureLogDto } from './dto/create-feature-log.dto';

@Injectable()
export class FeatureLogService {
  private readonly BANNED_LOG_NAMES = ['window', 'screen', 'view', 'open_window', 'screen_view'];

  constructor(
    @InjectRepository(FeatureLog)
    private readonly featureLogRepository: Repository<FeatureLog>,
  ) {}

  async create(createFeatureLogDto: CreateFeatureLogDto): Promise<FeatureLog> {
    const logName = createFeatureLogDto.name.toLowerCase();
    if (this.BANNED_LOG_NAMES.some(banned => logName.includes(banned))) {
      // Silently ignore or throw an error. Throwing is better for development.
      throw new BadRequestException(`Feature log name '${createFeatureLogDto.name}' is not allowed.`);
    }

    const log = this.featureLogRepository.create(createFeatureLogDto);
    return this.featureLogRepository.save(log);
  }
}