import { FeatureLogService } from './feature-log.service';
import { CreateFeatureLogDto } from './dto/create-feature-log.dto';
export declare class FeatureLogController {
    private readonly featureLogService;
    constructor(featureLogService: FeatureLogService);
    create(createFeatureLogDto: CreateFeatureLogDto): Promise<import("../database/entities/feature-log.entity").FeatureLog>;
}
