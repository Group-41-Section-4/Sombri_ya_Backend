import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { AddUmbrellaDto } from '../umbrellas/dto/add-umbrella.dto';
import { CreateStationTagDto } from './dto/create-station-tag.dto';
import { StationTag } from '../database/entities/station-tag.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import express from 'express';
import { Res, NotFoundException } from '@nestjs/common';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationsService.create(createStationDto);
  }

  @Get('all')
  findAll() {
    return this.stationsService.findAll();
  }

  @Get()
  findNearby(@Body() queryStationDto: QueryStationDto) {
    return this.stationsService.findNearby(queryStationDto);
  }

  @Post('nearby')
  findNearbyPost(@Body() queryStationDto: QueryStationDto) {
    return this.stationsService.findNearby(queryStationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationsService.findOne(id);
  }

  @Get(':id/umbrellas')
  findUmbrellas(@Param('id') id: string) {
    return this.stationsService.findUmbrellas(id);
  }

  @Post(':id/umbrellas')
  addUmbrellas(
    @Param('id') id: string,
    @Body() addUmbrellaDto: AddUmbrellaDto,
  ) {
    return this.stationsService.addUmbrellas(id, addUmbrellaDto);
  }

  @Post(':id/tags')
  @HttpCode(HttpStatus.CREATED)
  async registerNFCTag(
    @Param('id') id: string,
    @Body() createStationTagDto: CreateStationTagDto,
  ): Promise<StationTag> {
    const tag = await this.stationsService.registerNFCTag(
      id,
      createStationTagDto,
    );
    return tag;
  }

  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.stationsService.updateImage(id, file);
  }
  @Get(':id/image')
  async getImage(@Param('id') id: string, @Res() res: express.Response) {
    const station = await this.stationsService.findOne(id);

    if (!station.image) {
      throw new NotFoundException(`Image for station with ID ${id} not found`);
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(station.image);
  }

  @Delete()
  async deleteAll() {
    const result = await this.stationsService.deleteAll();
    return {
      message: 'All stations deleted successfully',
      deletedStations: result.deletedStations,
      deletedUmbrellas: result.deletedUmbrellas,
      deletedTags: result.deletedTags,
      updatedRentals: result.updatedRentals,
    };
  }
}
