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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddDistanceDto } from './dto/add-distance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  ): Promise<void> {
    const isHard = (hard ?? '').toLowerCase() === 'true';
    if (isHard) {
      await this.usersService.hardDelete(id);
    } else {
      await this.usersService.softDelete(id);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/profile-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req: any, file, cb) => {
          const uniqueSuffix = Date.now();
          const ext = extname(file.originalname);

          // userId puede venir como id o userId según tu estrategia JWT
          const user = req.user as { id?: string; userId?: string } | undefined;
          const userId = user?.id ?? user?.userId ?? 'unknown';

          cb(null, `${userId}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadProfileImage(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No image file uploaded');
    }

    const relativeUrl = `/uploads/profile/${file.filename}`;
    const user = req.user as { id?: string; userId?: string } | undefined;
    const userId = user?.id ?? user?.userId;

    if (!userId) {
      throw new BadRequestException('User not found in request');
    }

    const updated = await this.usersService.updateProfileImage(
      userId,
      relativeUrl,
    );

    return { profileImageUrl: updated.profileImageUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(204)
  async removeMe(
    @Request() req: any,
    @Query('hard') hard?: string,
  ): Promise<void> {
    const isHard = (hard ?? '').toLowerCase() === 'true';
    const user = req.user as { id?: string; userId?: string } | undefined;
    const id = user?.id ?? user?.userId;

    if (!id) {
      throw new BadRequestException('User not found in request');
    }

    if (isHard) {
      await this.usersService.hardDelete(id);
    } else {
      await this.usersService.softDelete(id);
    }
  }

}
