import { Module } from '@nestjs/common';
import { UmbrellasController } from './umbrellas.controller';
import { UmbrellasService } from './umbrellas.service';

@Module({
  controllers: [UmbrellasController],
  providers: [UmbrellasService]
})
export class UmbrellasModule {}
