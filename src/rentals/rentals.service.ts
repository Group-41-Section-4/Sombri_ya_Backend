import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { Umbrella, UmbrellaState } from '../database/entities/umbrella.entity';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
    private readonly dataSource: DataSource,
  ) {}

  async start(startRentalDto: StartRentalDto): Promise<Rental> {
    const { umbrella_id } = startRentalDto;

    const umbrella = await this.umbrellaRepository.findOneBy({ id: umbrella_id });
    if (!umbrella || umbrella.state !== UmbrellaState.AVAILABLE) {
      throw new NotFoundException('Umbrella not available for rental.');
    }

    let newRental: Rental = null!;

    await this.dataSource.transaction(async (manager) => {
      umbrella.state = UmbrellaState.RENTED;
      await manager.save(umbrella);

      const rental = this.rentalRepository.create({
        ...startRentalDto,
        start_time: new Date(),
        status: RentalStatus.ONGOING,
      });
      newRental = await manager.save(rental);
    });

    return newRental;
  }

  async end(endRentalDto: EndRentalDto): Promise<Rental> {
    const { rental_id, station_end_id } = endRentalDto;

    const rental = await this.rentalRepository.findOneBy({ id: rental_id });
    if (!rental || rental.status !== RentalStatus.ONGOING) {
      throw new NotFoundException('Rental not found or already completed.');
    }

    await this.dataSource.transaction(async (manager) => {
      // Update rental
      rental.end_time = new Date();
      rental.status = RentalStatus.COMPLETED;
      if (station_end_id) {
        rental.station_end_id = station_end_id;
      }
      rental.duration_minutes = Math.round((rental.end_time.getTime() - rental.start_time.getTime()) / 60000);
      await manager.save(rental);

      // Update umbrella
      const umbrella = await manager.findOneBy(Umbrella, { id: rental.umbrella_id });
      if (umbrella) {
        umbrella.state = UmbrellaState.AVAILABLE;
        // If an end station is provided, update the umbrella's location
        if (station_end_id) {
          umbrella.station_id = station_end_id;
        }
        await manager.save(umbrella);
      }
    });

    return rental;
  }

  async find(user_id: string, status: RentalStatus): Promise<Rental[]> {
    return this.rentalRepository.find({ where: { user_id, status } });
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOneBy({ id });
    if (!rental) {
      throw new NotFoundException(`Rental with ID "${id}" not found`);
    }
    return rental;
  }
}
