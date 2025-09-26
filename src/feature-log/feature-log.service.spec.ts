import { Test, TestingModule } from '@nestjs/testing';
import { FeatureLogService } from './feature-log.service';

describe('FeatureLogService', () => {
  let service: FeatureLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureLogService],
    }).compile();

    service = module.get<FeatureLogService>(FeatureLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
