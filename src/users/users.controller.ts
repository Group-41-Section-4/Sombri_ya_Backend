import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddDistanceDto } from './dto/add-distance.dto.ts';

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
    const userId = req.user.id || req.user.userId;
    return this.usersService.addPedometerDistance(userId, dto.distanceKm);
  }

  @Get(':id/total-distance')
  getTotalDistance(@Param('id') id: string) {
    return this.usersService.getTotalDistanceKm(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    const userId = req.user.id || req.user.userId;
    const user = await this.usersService.findOne(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
