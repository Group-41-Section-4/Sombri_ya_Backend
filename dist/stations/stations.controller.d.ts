import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryStationDto } from './dto/query-station.dto';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    create(createStationDto: CreateStationDto): Promise<import("../database/entities/station.entity").Station>;
    findNearby(query: QueryStationDto): Promise<any[]>;
    findUmbrellas(id: string): Promise<import("../database/entities/umbrella.entity").Umbrella[]>;
}
