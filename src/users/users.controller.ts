import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Get(':id/total-distance')
  getTotalDistance(@Param('id') id: string) {
    return this.usersService.getTotalDistanceKm(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    // 🔍 Usa el id del JWT (puede ser req.user.id o req.user.userId)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id || req.user.userId;

    // 🧠 Busca el usuario real en la DB
    const user = await this.usersService.findOne(userId);

    // 🔁 Devuelve solo los campos que quieras exponer
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
