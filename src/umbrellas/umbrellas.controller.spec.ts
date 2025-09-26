import { Test, TestingModule } from '@nestjs/testing';
import { UmbrellasController } from './umbrellas.controller';

describe('UmbrellasController', () => {
  let controller: UmbrellasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmbrellasController],
    }).compile();

    controller = module.get<UmbrellasController>(UmbrellasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
