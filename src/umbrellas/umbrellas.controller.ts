import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Umbrella } from 'src/database/entities/umbrella.entity';

@Controller('umbrellas')
export class UmbrellasController {
  constructor(
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
  ) {}

  @Get()
  async findAll() {
    return this.umbrellaRepository.find({
      relations: ['station'],
    });
  }
}
