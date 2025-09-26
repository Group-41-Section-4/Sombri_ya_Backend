import { Repository } from 'typeorm';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { CreateFeatureLogDto } from './dto/create-feature-log.dto';
export declare class FeatureLogService {
    private readonly featureLogRepository;
    private readonly BANNED_LOG_NAMES;
    constructor(featureLogRepository: Repository<FeatureLog>);
    create(createFeatureLogDto: CreateFeatureLogDto): Promise<FeatureLog>;
}
