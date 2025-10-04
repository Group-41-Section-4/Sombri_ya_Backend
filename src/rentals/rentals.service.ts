import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { Umbrella, UmbrellaState } from '../database/entities/umbrella.entity';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
import { Station } from 'src/database/entities/station.entity';
import { PaymentMethod, User } from 'src/database/entities';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}

  @Transactional()
  async start(startRentalDto: StartRentalDto): Promise<Rental> {
    const { user_id, station_start_id, payment_method_id, auth_type } =
      startRentalDto;

    // Obtener la primera sombrilla disponible de la estación
    const umbrella = await this.umbrellaRepository.findOne({
      where: {
        station: { id: station_start_id },
        state: UmbrellaState.AVAILABLE,
      },
      relations: ['station'],
    });

    if (!umbrella) {
      throw new NotFoundException('No available umbrellas at this station');
    }

    // Obtener entidades relacionadas
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const startStation = await this.stationRepository.findOneBy({
      id: station_start_id,
    });
    if (!startStation) {
      throw new NotFoundException('Station not found');
    }

    let paymentMethod: PaymentMethod | null = null;
    if (payment_method_id) {
      paymentMethod = await this.paymentMethodRepository.findOneBy({
        id: payment_method_id,
      });
    }

    // Cambiar estado de la sombrilla
    umbrella.state = UmbrellaState.RENTED;
    await this.umbrellaRepository.save(umbrella);

    // Crear el rental
    const rental = this.rentalRepository.create({
      user,
      umbrella,
      start_station: startStation,
      auth_type,
      start_time: new Date(),
      status: RentalStatus.ONGOING,
      ...(paymentMethod ? { payment_method: paymentMethod } : {}),
    });

    return this.rentalRepository.save(rental);
  }

  @Transactional()
  async end(endRentalDto: EndRentalDto): Promise<Rental> {
    const { rental_id, station_end_id } = endRentalDto;

    const rental = await this.rentalRepository.findOne({
      where: { id: rental_id },
      relations: ['umbrella'],
    });

    if (!rental || rental.status !== RentalStatus.ONGOING) {
      throw new NotFoundException('Rental not found or already completed.');
    }

    // Update rental
    rental.end_time = new Date();
    rental.status = RentalStatus.COMPLETED;
    rental.duration_minutes = Math.round(
      (rental.end_time.getTime() - rental.start_time.getTime()) / 60000,
    );

    if (station_end_id) {
      const endStation = await this.stationRepository.findOneBy({
        id: station_end_id,
      });
      if (endStation) {
        rental.end_station = endStation;
        rental.umbrella.station = endStation;
      }
    }

    // Update umbrella
    rental.umbrella.state = UmbrellaState.AVAILABLE;
    await this.umbrellaRepository.save(rental.umbrella);

    return this.rentalRepository.save(rental);
  }

  async find(user_id: string, status: RentalStatus): Promise<Rental[]> {
    return this.rentalRepository.find({
      where: { user: { id: user_id }, status },
    });
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOneBy({ id });
    if (!rental) {
      throw new NotFoundException(`Rental with ID "${id}" not found`);
    }
    return rental;
  }
}
