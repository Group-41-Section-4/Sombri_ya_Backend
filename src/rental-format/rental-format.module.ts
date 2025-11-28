import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalFormat } from '../database/entities/rental-format.entity';
import { RentalFormatService } from './rental-format.service';
import { RentalFormatController } from './rental-format.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RentalFormat])],
  controllers: [RentalFormatController],
  providers: [RentalFormatService],
  exports: [RentalFormatService],
})
export class RentalFormatModule {}
