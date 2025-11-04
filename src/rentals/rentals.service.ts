import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { Umbrella, UmbrellaState } from '../database/entities/umbrella.entity';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
import { Station } from 'src/database/entities/station.entity';
import { PaymentMethod, User } from 'src/database/entities';
import { RentalsExportDto } from './dto/rental-export.dto';

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

    const startStation = await this.stationRepository.findOneBy({
      id: station_start_id,
    });
    if (!startStation) throw new NotFoundException('Station not found');

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

    const activeRental = await this.findActiveRental(user_id);
    if (activeRental) {
      throw new ConflictException('User already has an active rental');
    }

    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new NotFoundException('User not found');

    let paymentMethod: PaymentMethod | null = null;
    if (payment_method_id) {
      paymentMethod = await this.paymentMethodRepository.findOneBy({
        id: payment_method_id,
      });
    }

    umbrella.state = UmbrellaState.RENTED;
    await this.umbrellaRepository.save(umbrella);

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

    const rental = await this.findActiveRental(user_id);
    if (!rental) {
      throw new NotFoundException('No active rental found for this user.');
    }

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

    rental.umbrella.state = UmbrellaState.AVAILABLE;
    await this.umbrellaRepository.save(rental.umbrella);

    return this.rentalRepository.save(rental);
  }

  async find(user_id?: string, status?: RentalStatus): Promise<Rental[]> {
    return this.rentalRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: {
        ...(user_id ? { user: { id: user_id } } : {}),
        ...(status ? { status } : {}),
      } as any,
    });
  }

  async findActiveRental(user_id: string): Promise<Rental | null> {
    return this.rentalRepository.findOne({
      where: { user: { id: user_id }, status: RentalStatus.ONGOING },
      relations: ['umbrella', 'start_station'],
    });
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOneBy({ id });
    if (!rental)
      throw new NotFoundException(`Rental with ID "${id}" not found`);
    return rental;
  }

  async getUserHistory(userId: string) {
    return this.rentalRepository.find({
      where: { user: { id: userId } },
      relations: ['start_station', 'end_station', 'umbrella'], // <-- corregido
      order: { start_time: 'DESC' },
    });
  }

  /**
   * Export paginado con cursor (updatedAt|id). Devuelve { data, nextCursor }.
   */
  async exportRentals(q: RentalsExportDto & { limit: number }): Promise<{
    data: Array<any>;
    nextCursor: string | null;
  }> {
    const qb = this.rentalRepository
      .createQueryBuilder('r')
      .select([
        'r.id AS id',
        'r.status AS status',
        'r.start_time AS start_time',
        'r.end_time AS end_time',
        'r.duration_minutes AS duration_minutes',
        'r.distance_meters AS distance_meters',
        'r.updated_at AS updated_at',
        'u.id AS user_id',
        'us.id AS umbrella_id',
        'ss.id AS start_station_id',
        'es.id AS end_station_id',
      ])
      .leftJoin('r.user', 'u')
      .leftJoin('r.umbrella', 'us')
      .leftJoin('r.start_station', 'ss')
      .leftJoin('r.end_station', 'es');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    if (q.start) qb.andWhere('r.start_time >= :start', { start: q.start });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    if (q.end) qb.andWhere('r.start_time < :end', { end: q.end });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    if (q.status) qb.andWhere('r.status = :status', { status: q.status });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (q.placeId)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      qb.andWhere('(ss.id = :pid OR es.id = :pid)', { pid: q.placeId });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    if (q.userId) qb.andWhere('u.id = :uid', { uid: q.userId });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (q.updatedSince)
      qb.andWhere('COALESCE(r.updated_at, r.end_time, r.start_time) >= :u', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        u: q.updatedSince,
      });

    // Cursor simple: (updated_at_fallback, id)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (q.cursor) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const [u, id] = q.cursor.split('|');
      qb.andWhere(
        '(COALESCE(r.updated_at, r.end_time, r.start_time), r.id) > (:u, :id)',
        { u, id },
      );
    }

    qb.orderBy('COALESCE(r.updated_at, r.end_time, r.start_time)', 'ASC')
      .addOrderBy('r.id', 'ASC')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      .limit(q.limit);

    const rows = await qb.getRawMany();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const last = rows[rows.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const lastUpdated =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      last?.updated_at ?? last?.end_time ?? last?.start_time ?? null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const nextCursor = lastUpdated
      ? `${new Date(lastUpdated).toISOString()}|${last.id}`
      : null;

    return { data: rows, nextCursor };
  }

  async getAuthTypeCounts(): Promise<{ nfc: number; qr: number }> {
    const counts = await this.rentalRepository //
      .createQueryBuilder('rental')
      .select('rental.auth_type', 'auth_type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('rental.auth_type')
      .getRawMany();

    const result = {
      [AuthType.NFC]: 0,
      [AuthType.QR]: 0,
    };

    for (const row of counts) {
      if (row.auth_type === AuthType.NFC) {
        result.nfc = parseInt(row.count, 10) || 0;
      } else if (row.auth_type === AuthType.QR) {
        result.qr = parseInt(row.count, 10) || 0;
      }
    }

    return result;
  }

  @Transactional()
  async deleteAll(): Promise<{
    deletedCount: number;
    updatedUmbrellas: number;
  }> {
    const rentals = await this.rentalRepository.find({
      relations: ['umbrella'],
    });
    const deletedCount = rentals.length;

    const umbrellaIds = rentals
      .filter((r) => r.umbrella && r.umbrella.state === UmbrellaState.RENTED)
      .map((r) => r.umbrella.id);

    let updatedUmbrellas = 0;
    if (umbrellaIds.length > 0) {
      const updateResult = await this.umbrellaRepository.update(umbrellaIds, {
        state: UmbrellaState.AVAILABLE,
      });
      updatedUmbrellas = updateResult.affected || 0;
    }

    await this.rentalRepository.query('DELETE FROM rentals');

    return { deletedCount, updatedUmbrellas };
  }
}
