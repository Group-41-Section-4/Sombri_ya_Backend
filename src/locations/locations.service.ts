import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../database/entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { User } from '../database/entities/user.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const { userId, ...locationData } = createLocationDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const newLocation = this.locationRepository.create({
      ...locationData,
      user,
    });

    return this.locationRepository.save(newLocation);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}
