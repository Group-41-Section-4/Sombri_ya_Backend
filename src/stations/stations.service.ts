import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Station } from '../database/entities/station.entity';
import { StationTag } from '../database/entities/station-tag.entity';
import { Rental } from '../database/entities/rental.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { CreateStationTagDto } from './dto/create-station-tag.dto';
import { Umbrella, UmbrellaState } from '../database/entities/umbrella.entity';
import { StationResponseDto } from './dto/station-response.dto';
import { AddUmbrellaDto } from '../umbrellas/dto/add-umbrella.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
    @InjectRepository(StationTag)
    private readonly stationTagRepository: Repository<StationTag>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const station = this.stationRepository.create({
      ...createStationDto,
      capacity: createStationDto.capacity || 10, // Valor por defecto si no se proporciona
      location: {
        type: 'Point',
        coordinates: [createStationDto.longitude, createStationDto.latitude],
      },
    });
    return this.stationRepository.save(station);
  }

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async findNearby(query: QueryStationDto): Promise<StationResponseDto[]> {
    const { latitude, longitude, radius_m = 1000, page = 1 } = query;
    const radiusInMeters = Number(radius_m);
    const pageNumber = Number(page);
    const pageSize = 10;

    const userLocation = `ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography`;

    type StationRaw = {
      id: string;
      placeName: string;
      description: string;
      imageUrl?: string;
      latitude: number;
      longitude: number;
      distanceMeters: number | string;
      availableUmbrellas: number | string;
      capacity: number | string; // TODO: Change DTO field name from totalUmbrellas to capacity
    };

    const stationsRaw: StationRaw[] = await this.stationRepository
      .createQueryBuilder('station')
      .select([
        'station.id AS id',
        'station.place_name AS "placeName"',
        'station.description AS description',
        'station.image_url AS "imageUrl"',
        'station.latitude AS latitude',
        'station.longitude AS longitude',
        `ST_Distance(station.location, ${userLocation}) AS "distanceMeters"`,
      ])
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(*)')
            .from(Umbrella, 'u')
            .where(`u.station_id = station.id AND u.state = :state`, {
              state: UmbrellaState.AVAILABLE,
            }),
        'availableUmbrellas',
      )
      .addSelect('station.capacity', 'capacity')
      .where(`ST_DWithin(station.location, ${userLocation}, :radius)`)
      .orderBy('"distanceMeters"', 'ASC')
      .setParameter('radius', radiusInMeters)
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();

    return stationsRaw.map(
      (station: StationRaw): StationResponseDto => ({
        ...station,
        distanceMeters: Math.round(Number(station.distanceMeters)),
        availableUmbrellas: parseInt(String(station.availableUmbrellas), 10),
        totalUmbrellas: parseInt(String(station.capacity ?? 10), 10), // TODO: Map capacity to totalUmbrellas field, default 10 for null values
      }),
    );
  }

  async findOne(id: string): Promise<Station> {
    const station = await this.stationRepository.findOneBy({ id });
    if (!station) {
      throw new NotFoundException(`Station with ID "${id}" not found`);
    }
    return station;
  }

  async findUmbrellas(id: string): Promise<Umbrella[]> {
    return this.umbrellaRepository.find({ where: { station: { id } } });
  }

  async addUmbrellas(
    stationId: string,
    addUmbrellaDto: AddUmbrellaDto,
  ): Promise<Umbrella> {
    // Verificar que la estación existe
    const station = await this.stationRepository.findOne({
      where: { id: stationId },
    });

    if (!station) {
      throw new NotFoundException(`Station with ID ${stationId} not found`);
    }

    // Verificar capacidad de la estación
    const currentUmbrellaCount = await this.umbrellaRepository.count({
      where: { station: { id: stationId } },
    });

    if (currentUmbrellaCount >= (station.capacity ?? 0)) {
      throw new ConflictException(
        `Station has reached its maximum capacity of ${station.capacity} umbrellas`,
      );
    }

    // Crear nueva sombrilla
    const umbrella = this.umbrellaRepository.create({
      station,
      last_maintenance_at: addUmbrellaDto.last_maintenance_at,
      state: UmbrellaState.AVAILABLE, // Por defecto disponible
    });

    return this.umbrellaRepository.save(umbrella);
  }

  async registerNFCTag(
    stationId: string,
    createStationTagDto: CreateStationTagDto,
  ): Promise<StationTag> {
    // Verificar que la estación existe
    const station = await this.stationRepository.findOne({
      where: { id: stationId },
    });

    if (!station) {
      throw new NotFoundException(`Station with ID ${stationId} not found`);
    }

    // Verificar que el tag_uid no esté ya registrado
    const existingTag = await this.stationTagRepository.findOne({
      where: { tag_uid: createStationTagDto.tag_uid },
    });

    if (existingTag) {
      throw new ConflictException('This NFC tag is already registered');
    }

    // Crear el nuevo tag NFC
    const stationTag = this.stationTagRepository.create({
      station,
      tag_uid: createStationTagDto.tag_uid,
      tag_type: createStationTagDto.tag_type,
      meta: createStationTagDto.meta,
    });

    return this.stationTagRepository.save(stationTag);
  }

  @Transactional()
  async deleteAll(): Promise<{
    deletedStations: number;
    deletedUmbrellas: number;
    deletedTags: number;
    updatedRentals: number;
  }> {
    // Contar antes de eliminar para estadísticas
    const totalUmbrellas = await this.umbrellaRepository.count();
    const totalTags = await this.stationTagRepository.count();
    const totalStations = await this.stationRepository.count();
    const totalRentals = await this.rentalRepository.count();

    // Primero, actualizar las rentas que referencian estaciones
    await this.rentalRepository.query(
      'UPDATE rentals SET station_start_id = NULL WHERE station_start_id IS NOT NULL',
    );

    await this.rentalRepository.query(
      'UPDATE rentals SET station_end_id = NULL WHERE station_end_id IS NOT NULL',
    );

    // Eliminar usando SQL directo para evitar problemas de FK constraints
    await this.rentalRepository.query('DELETE FROM rentals');
    await this.umbrellaRepository.query('DELETE FROM umbrellas');
    await this.stationTagRepository.query('DELETE FROM station_tags');
    await this.stationRepository.query('DELETE FROM stations');

    return {
      deletedStations: totalStations,
      deletedUmbrellas: totalUmbrellas,
      deletedTags: totalTags,
      updatedRentals: totalRentals,
    };
  }
}
