import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../database/entities/station.entity';
import { StationTag } from '../database/entities/station-tag.entity';
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
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const station = this.stationRepository.create({
      ...createStationDto,
      location: {
        type: 'Point',
        coordinates: [createStationDto.longitude, createStationDto.latitude],
      },
    });
    return this.stationRepository.save(station);
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
      latitude: number;
      longitude: number;
      distanceMeters: number | string;
      availableUmbrellas: number | string;
      totalUmbrellas: number | string;
    };

    const stationsRaw: StationRaw[] = await this.stationRepository
      .createQueryBuilder('station')
      .select([
        'station.id AS id',
        'station.place_name AS "placeName"',
        'station.description AS description',
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
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(*)')
            .from(Umbrella, 'u')
            .where(`u.station_id = station.id`),
        'totalUmbrellas',
      )
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
        totalUmbrellas: parseInt(String(station.totalUmbrellas), 10),
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
}
