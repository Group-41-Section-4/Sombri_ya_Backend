import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationsService.create(createStationDto);
  }

  @Get()
  findNearby(@Query() query: QueryStationDto) {
    return this.stationsService.findNearby(query);
  }

  @Get(':id/umbrellas')
  findUmbrellas(@Param('id') id: string) {
    return this.stationsService.findUmbrellas(id);
  }
}
