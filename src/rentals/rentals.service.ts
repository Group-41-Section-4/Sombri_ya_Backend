import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

    // Verificar que la estación existe y obtener su capacidad
    const startStation = await this.stationRepository.findOneBy({
      id: station_start_id,
    });
    if (!startStation) {
      throw new NotFoundException('Station not found');
    }

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

    // Verificar que el usuario no tenga una renta activa
    const activeRental = await this.findActiveRental(user_id);
    if (activeRental) {
      throw new NotFoundException('User already has an active rental');
    }

    // Obtener entidades relacionadas
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
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
    const { user_id, station_end_id } = endRentalDto;

    // Buscar la renta activa del usuario
    const rental = await this.findActiveRental(user_id);

    if (!rental) {
      throw new NotFoundException('No active rental found for this user.');
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
        // Verificar capacidad de la estación de destino
        const currentUmbrellaCount = await this.umbrellaRepository.count({
          where: { station: { id: station_end_id } },
        });

        if (currentUmbrellaCount >= (endStation.capacity ?? 0)) {
          throw new ConflictException(
            `Destination station has reached its maximum capacity of ${endStation.capacity} umbrellas`,
          );
        }

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

  async findActiveRental(user_id: string): Promise<Rental | null> {
    return this.rentalRepository.findOne({
      where: {
        user: { id: user_id },
        status: RentalStatus.ONGOING,
      },
      relations: ['umbrella', 'start_station'],
    });
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOneBy({ id });
    if (!rental) {
      throw new NotFoundException(`Rental with ID "${id}" not found`);
    }
    return rental;
  }

  async getUserHistory(userId: string) {
    return this.rentalRepository.find({
      where: { user: { id: userId } },
      relations: ['station_start', 'end_station', 'umbrella'],
      order: { start_time: 'DESC' },
    });
  }

  @Transactional()
  async deleteAll(): Promise<{
    deletedCount: number;
    updatedUmbrellas: number;
  }> {
    // Obtener todas las rentas con sus sombrillas para poder actualizar los estados
    const rentals = await this.rentalRepository.find({
      relations: ['umbrella'],
    });

    const deletedCount = rentals.length;

    // Actualizar estado de las sombrillas de RENTED a AVAILABLE
    const umbrellaIds = rentals
      .filter(
        (rental) =>
          rental.umbrella && rental.umbrella.state === UmbrellaState.RENTED,
      )
      .map((rental) => rental.umbrella.id);

    let updatedUmbrellas = 0;
    if (umbrellaIds.length > 0) {
      const updateResult = await this.umbrellaRepository.update(umbrellaIds, {
        state: UmbrellaState.AVAILABLE,
      });
      updatedUmbrellas = updateResult.affected || 0;
    }

    // Eliminar todas las rentas usando SQL directo para evitar problemas de FK
    await this.rentalRepository.query('DELETE FROM rentals');

    return {
      deletedCount,
      updatedUmbrellas,
    };
  }
}
