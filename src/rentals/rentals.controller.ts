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
import { RentalsExportDto } from './dto/rental-export.dto';
import { RentalExportRowDto } from './dto/rental-export-row.dto';

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

  // Estadísticas de métodos de autenticación (NFC vs QR)
  @Get('stats/auth-types')
  async getAuthTypeCounts() {
    return this.rentalsService.getAuthTypeCounts();
  }

  // Colocar rutas específicas antes de :id para evitar colisiones
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

  // Export con filtros + cursor: /rentals/export?start=...&end=...&status=...&userId=...&placeId=...&updatedSince=...&limit=...&cursor=...
  @Get('export')
  async exportRentals(@Query() q: RentalsExportDto) {
    const limit = Math.min(q.limit ?? 5000, 10000);
    return this.rentalsService.exportRentals({ ...q, limit });
  }

  // Listado básico con filtros simples
  @Get()
  find(
    @Query('user_id') user_id?: string,
    @Query('status') status?: RentalStatus,
  ) {
    return this.rentalsService.find(user_id, status);
  }

  // Mantener al final para no capturar 'history' o 'export'
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
  @Get('export_rent')
  async export(@Query('id') id?: string): Promise<RentalExportRowDto[]> {
    return this.rentalsService.export(id);
  }
}
