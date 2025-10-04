import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  try {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Mezclamos solo las propiedades que existen
    Object.assign(user, updateUserDto);

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    throw error;
  }
}


  async getTotalDistanceKm(
    userId: string,
  ): Promise<{ totalDistanceKm: number }> {
    // Verificar que el usuario existe
    await this.findOne(userId);

    // Obtener todos los rentals completados del usuario con estaciones
    const rentals = await this.rentalRepository.find({
      where: {
        user: { id: userId },
        status: RentalStatus.COMPLETED as RentalStatus,
      },
      relations: ['start_station', 'end_station'],
    });

    let totalDistanceKm = 0;

    for (const rental of rentals) {
      if (rental.start_station && rental.end_station) {
        const distance = this.calculateHaversineDistance(
          rental.start_station.latitude,
          rental.start_station.longitude,
          rental.end_station.latitude,
          rental.end_station.longitude,
        );
        totalDistanceKm += distance;
      }
    }

    return { totalDistanceKm: Math.round(totalDistanceKm * 100) / 100 };
  }

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
