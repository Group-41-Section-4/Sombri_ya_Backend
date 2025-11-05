import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import {
  AuthType,
  Rental,
  RentalStatus,
} from '../database/entities/rental.entity';
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
      relations: ['start_station', 'end_station', 'umbrella'],
      order: { start_time: 'DESC' },
    });
  }

  /**
   * Export paginado con cursor (updatedAt|id). Devuelve { data, nextCursor }.
   * Usa Postgres row-comparison y tiene fallback si no está disponible.
   */
  async exportRentals(
    q: RentalsExportDto & { limit: number },
  ): Promise<{ data: Array<any>; nextCursor: string | null }> {
    const take = Math.min(q.limit ?? 1000, 10000);

    const qb = this.rentalRepository
      .createQueryBuilder('r')
      .leftJoin('r.user', 'u')
      .leftJoin('r.umbrella', 'um')
      .leftJoin('r.start_station', 'ss')
      .leftJoin('r.end_station', 'es')
      .select([
        'r.id AS id',
        'r.status AS status',
        'r.start_time AS start_time',
        'r.end_time AS end_time',
        // Calcula duración en minutos (evita depender de la columna física)
        `CASE 
           WHEN r.end_time IS NOT NULL AND r.start_time IS NOT NULL 
           THEN ROUND(EXTRACT(EPOCH FROM (r.end_time - r.start_time)) / 60.0)::int 
           ELSE NULL 
         END AS duration_minutes`,
        // Si TIENES columna distance_meters, descomenta la siguiente línea:
        // 'r.distance_meters AS distance_meters',
        'r.updated_at AS updated_at',
        'u.id AS user_id',
        'um.id AS umbrella_id',
        'ss.id AS start_station_id',
        'es.id AS end_station_id',
      ]);

    if (q.start) qb.andWhere('r.start_time >= :start', { start: q.start });
    if (q.end) qb.andWhere('r.start_time < :end', { end: q.end });
    if (q.status) qb.andWhere('r.status = :status', { status: q.status });
    if (q.userId) qb.andWhere('u.id = :uid', { uid: q.userId });
    if (q.placeId)
      qb.andWhere('(ss.id = :pid OR es.id = :pid)', { pid: q.placeId });
    if (q.updatedSince) {
      qb.andWhere('COALESCE(r.updated_at, r.end_time, r.start_time) >= :us', {
        us: q.updatedSince,
      });
    }

    // --- cursor ---
    if (q.cursor) {
      const [tsStr, lastId] = q.cursor.split('|');
      if (!tsStr || !lastId) {
        throw new BadRequestException(
          'Invalid cursor format. Use "<ISO>|<id>"',
        );
      }
      const ts = new Date(tsStr);
      if (isNaN(ts.getTime()))
        throw new BadRequestException('Invalid cursor timestamp');

      // Postgres row-wise comparison
      qb.andWhere(
        '(COALESCE(r.updated_at, r.end_time, r.start_time), r.id) > (:ts, :id)',
        { ts, id: lastId },
      );
    }

    qb.orderBy('COALESCE(r.updated_at, r.end_time, r.start_time)', 'ASC')
      .addOrderBy('r.id', 'ASC')
      .limit(take);

    let rows: any[] = [];
    try {
      rows = await qb.getRawMany();
    } catch (e: any) {
      // Fallback si la comparación por tuplas no estuviera disponible
      if (q.cursor) {
        const [tsStr, lastId] = q.cursor.split('|');
        const ts = new Date(tsStr);
        const qb2 = this.rentalRepository
          .createQueryBuilder('r')
          .leftJoin('r.user', 'u')
          .leftJoin('r.umbrella', 'um')
          .leftJoin('r.start_station', 'ss')
          .leftJoin('r.end_station', 'es')
          .select([
            'r.id AS id',
            'r.status AS status',
            'r.start_time AS start_time',
            'r.end_time AS end_time',
            `CASE 
               WHEN r.end_time IS NOT NULL AND r.start_time IS NOT NULL 
               THEN ROUND(EXTRACT(EPOCH FROM (r.end_time - r.start_time)) / 60.0)::int 
               ELSE NULL 
             END AS duration_minutes`,
            // 'r.distance_meters AS distance_meters',
            'r.updated_at AS updated_at',
            'u.id AS user_id',
            'um.id AS umbrella_id',
            'ss.id AS start_station_id',
            'es.id AS end_station_id',
          ])
          .where('COALESCE(r.updated_at, r.end_time, r.start_time) > :ts', {
            ts,
          })
          .orWhere(
            'COALESCE(r.updated_at, r.end_time, r.start_time) = :ts AND r.id > :id',
            { ts, id: lastId },
          )
          .orderBy('COALESCE(r.updated_at, r.end_time, r.start_time)', 'ASC')
          .addOrderBy('r.id', 'ASC')
          .limit(take);

        rows = await qb2.getRawMany();
      } else {
        throw e;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const last = rows[rows.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const lastUpdated =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      last?.updated_at ?? last?.end_time ?? last?.start_time ?? null;

    const nextCursor = lastUpdated
      ? `${new Date(lastUpdated).toISOString()}|${last.id}`
      : null;

    return { data: rows, nextCursor };
  }

  async getAuthTypeCounts(): Promise<{ nfc: number; qr: number }> {
    const rows = await this.rentalRepository
      .createQueryBuilder('rental')
      .select('rental.auth_type', 'auth_type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('rental.auth_type')
      .getRawMany<{ auth_type: string; count: string }>();

    const out = { nfc: 0, qr: 0 };
    for (const r of rows) {
      const at = (r.auth_type || '').toUpperCase();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (at === AuthType.NFC) out.nfc = parseInt(r.count, 10) || 0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (at === AuthType.QR) out.qr = parseInt(r.count, 10) || 0;
      // si en DB está como string 'NFC'/'QR', también queda cubierto por comparación arriba
      if (at === 'NFC') out.nfc = parseInt(r.count, 10) || out.nfc;
      if (at === 'QR') out.qr = parseInt(r.count, 10) || out.qr;
    }
    return out;
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
