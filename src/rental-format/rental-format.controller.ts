// src/rental-format/rental-format.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RentalFormatService } from './rental-format.service';
import { CreateRentalFormatDto } from './dto/create-rental-format.dto';

@Controller('rental-format')
export class RentalFormatController {
  constructor(private readonly rentalFormatService: RentalFormatService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      storage: memoryStorage(), // deja el archivo en file.buffer
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por ejemplo
      },
    }),
  )
  async create(@Body() dto: CreateRentalFormatDto, @UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.rentalFormatService.create(dto, file.buffer);
  }

  @Get('rental/:rentalId')
  async findByRental(@Param('rentalId') rentalId: string) {
    const records = await this.rentalFormatService.findByRentalId(rentalId);

    // Para no mandar el Buffer crudo, lo convierto a base64
    return records.map((r) => ({
      id: r.id,
      someInt: r.someInt,
      description: r.description,
      rentalId: r.rentalId,
      imageBase64: r.imageData.toString('base64'),
    }));
  }
}
