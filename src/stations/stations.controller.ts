import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { AddUmbrellaDto } from '../umbrellas/dto/add-umbrella.dto';
import { CreateStationTagDto } from './dto/create-station-tag.dto';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationsService.create(createStationDto);
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
  registerNFCTag(
    @Param('id') id: string,
    @Body() createStationTagDto: CreateStationTagDto,
  ) {
    return this.stationsService.registerNFCTag(id, createStationTagDto);
  }
}
