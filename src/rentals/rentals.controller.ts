import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
import { RentalStatus } from '../database/entities/rental.entity';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post('start')
  async start(@Body() startRentalDto: StartRentalDto) {
    const rental = await this.rentalsService.start(startRentalDto);
    return {
      rental_id: rental.id,
      start_time: rental.start_time,
      status: rental.status,
      auth_attempts: rental.auth_attempts,
    };
  }

  @Post('end')
  async end(@Body() endRentalDto: EndRentalDto) {
    const rental = await this.rentalsService.end(endRentalDto);
    return {
      rental_id: rental.id,
      end_time: rental.end_time,
      status: rental.status,
      duration_minutes: rental.duration_minutes,
      distance_meters: rental.distance_meters,
    };
  }

  @Get()
  find(
    @Query('user_id') user_id: string,
    @Query('status') status: RentalStatus,
  ) {
    return this.rentalsService.find(user_id, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @Get('history/:user_id')
  async getUserHistory(@Param('user_id') userId: string) {
    const history = await this.rentalsService.getUserHistory(userId);
    return history.map((rental) => ({
      rental_id: rental.id,
      start_time: rental.start_time,
      end_time: rental.end_time,
      status: rental.status,
      duration_minutes: rental.duration_minutes,
      station_start: rental.start_station?.place_name,
      station_end: rental.end_station?.place_name,
    }));
  }
}
