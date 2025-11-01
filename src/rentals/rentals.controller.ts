import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
import { RentalStatus } from '../database/entities/rental.entity';
import { RentalsExportDto } from './dto/rentals-export.dto';

@Controller('rentals')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
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

  // --- place specific routes BEFORE :id to avoid collisions ---

  // /rentals/history/:user_id
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

  // /rentals/export?start=...&end=...&status=...&userId=...&placeId=...&updatedSince=...&limit=...&cursor=...
  @Get('export')
  async exportRentals(@Query() q: RentalsExportDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const limit = Math.min(q.limit ?? 5000, 10000);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.rentalsService.exportRentals({ ...q, limit });
  }

  // /rentals?user_id=...&status=...
  @Get()
  find(
    @Query('user_id') user_id?: string,
    @Query('status') status?: RentalStatus,
  ) {
    return this.rentalsService.find(user_id, status);
  }

  // /rentals/:id  (kept last so it doesn't catch 'history' or 'export')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @Delete()
  async deleteAll() {
    const result = await this.rentalsService.deleteAll();
    return {
      message: 'All rentals deleted successfully',
      deletedCount: result.deletedCount,
      updatedUmbrellas: result.updatedUmbrellas,
    };
  }
}
