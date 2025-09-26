import { Test, TestingModule } from '@nestjs/testing';
import { UmbrellasService } from './umbrellas.service';

describe('UmbrellasService', () => {
  let service: UmbrellasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UmbrellasService],
    }).compile();

    service = module.get<UmbrellasService>(UmbrellasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
