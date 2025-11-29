// src/rental-format/rental-format.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalFormat } from '../database/entities/rental-format.entity';
import { CreateRentalFormatDto } from './dto/create-rental-format.dto';

@Injectable()
export class RentalFormatService {
  constructor(
    @InjectRepository(RentalFormat)
    private readonly rentalFormatRepo: Repository<RentalFormat>,
  ) {}

  async create(dto: CreateRentalFormatDto, imageBuffer: Buffer | null) {
    const entity = this.rentalFormatRepo.create({
      someInt: dto.someInt,
      description: dto.description ?? null,
      rentalId: dto.rentalId,
      imageData: imageBuffer ?? null,
    });

    return this.rentalFormatRepo.save(entity);
  }

  async findByRentalId(rentalId: string): Promise<RentalFormat[]> {
    return this.rentalFormatRepo.find({
      where: { rentalId },
    });
  }
}
