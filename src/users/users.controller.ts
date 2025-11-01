import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Patch,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddDistanceDto } from './dto/add-distance.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/add-distance')
  async addPedometerDistance(@Request() req: any, @Body() dto: AddDistanceDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id || req.user.userId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.usersService.addPedometerDistance(userId, dto.distanceKm);
  }

  @Get(':id/total-distance')
  getTotalDistance(@Param('id') id: string) {
    return this.usersService.getTotalDistanceKm(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id || req.user.userId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = await this.usersService.findOne(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  /**
   * DELETE /users/:id
   * ?hard=true → borrado duro (requiere que no haya rentals activos)
   * por defecto → soft delete (marca deleted_at)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(
    @Param('id') id: string,
    @Query('hard') hard?: string,
    @Request() req?: any,
  ): Promise<void> {
    const isHard = (hard ?? '').toLowerCase() === 'true';
    if (isHard) {
      await this.usersService.hardDelete(id);
    } else {
      await this.usersService.softDelete(
        id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        req?.user?.id || req?.user?.userId,
      );
    }
  }
}
