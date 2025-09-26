import { Repository } from 'typeorm';
import { Station } from '../database/entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
import { Umbrella } from '../database/entities/umbrella.entity';
export declare class StationsService {
    private readonly stationRepository;
    private readonly umbrellaRepository;
    constructor(stationRepository: Repository<Station>, umbrellaRepository: Repository<Umbrella>);
    create(createStationDto: CreateStationDto): Promise<Station>;
    findNearby(query: QueryStationDto): Promise<any[]>;
    findUmbrellas(id: string): Promise<Umbrella[]>;
}
