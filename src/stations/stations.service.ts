import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../database/entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { Umbrella } from '../database/entities/umbrella.entity';
import { UmbrellaState } from '../database/entities/umbrella.entity';
import { StationResponseDto } from './dto/station-response.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
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

  async findUmbrellas(id: string): Promise<Umbrella[]> {
    // ... (sin cambios aquí)
    return this.umbrellaRepository.find({ where: { station_id: id } });
  }
}
