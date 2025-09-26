import { Test, TestingModule } from '@nestjs/testing';
import { FeatureLogController } from './feature-log.controller';

describe('FeatureLogController', () => {
  let controller: FeatureLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureLogController],
    }).compile();

    controller = module.get<FeatureLogController>(FeatureLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
