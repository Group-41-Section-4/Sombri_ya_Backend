import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../database/entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { Umbrella } from '../database/entities/umbrella.entity';
import { UmbrellaState } from '../database/entities/umbrella.entity';

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

  async findNearby(query: QueryStationDto) {
    const { lat, lon, radius_m = 1000, page = 1 } = query;
    const radiusInMeters = Number(radius_m);
    const pageNumber = Number(page);
    const pageSize = 10;

    const userLocation = `ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)::geography`;

    const stations = await this.stationRepository
      .createQueryBuilder('station')
      .select([
        'station.id',
        'station.place_name',
        'station.description',
        'station.latitude',
        'station.longitude',
        `ST_Distance(station.location, ${userLocation}) AS distance_meters`,
      ])
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(*)')
            .from(Umbrella, 'u')
            .where(`u.station_id = station.id AND u.state = :state`, { state: UmbrellaState.AVAILABLE }),
        'available_umbrellas',
      )
       .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(*)')
            .from(Umbrella, 'u')
            .where(`u.station_id = station.id`),
        'total_umbrellas',
      )
      .where(`ST_DWithin(station.location, ${userLocation}, :radius)`)
      .orderBy('distance_meters', 'ASC')
      .setParameter('radius', radiusInMeters)
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();

    return stations;
  }

  async findUmbrellas(id: string): Promise<Umbrella[]> {
    return this.umbrellaRepository.find({ where: { station_id: id } });
  }
}