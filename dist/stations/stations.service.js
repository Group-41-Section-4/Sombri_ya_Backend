"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const station_entity_1 = require("../database/entities/station.entity");
const umbrella_entity_1 = require("../database/entities/umbrella.entity");
const umbrella_entity_2 = require("../database/entities/umbrella.entity");
let StationsService = class StationsService {
    stationRepository;
    umbrellaRepository;
    constructor(stationRepository, umbrellaRepository) {
        this.stationRepository = stationRepository;
        this.umbrellaRepository = umbrellaRepository;
    }
    async create(createStationDto) {
        const station = this.stationRepository.create({
            ...createStationDto,
            location: {
                type: 'Point',
                coordinates: [createStationDto.longitude, createStationDto.latitude],
            },
        });
        return this.stationRepository.save(station);
    }
    async findNearby(query) {
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
            .addSelect((subQuery) => subQuery
            .select('COUNT(*)')
            .from(umbrella_entity_1.Umbrella, 'u')
            .where(`u.station_id = station.id AND u.state = :state`, { state: umbrella_entity_2.UmbrellaState.AVAILABLE }), 'available_umbrellas')
            .addSelect((subQuery) => subQuery
            .select('COUNT(*)')
            .from(umbrella_entity_1.Umbrella, 'u')
            .where(`u.station_id = station.id`), 'total_umbrellas')
            .where(`ST_DWithin(station.location, ${userLocation}, :radius)`)
            .orderBy('distance_meters', 'ASC')
            .setParameter('radius', radiusInMeters)
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .getRawMany();
        return stations;
    }
    async findUmbrellas(id) {
        return this.umbrellaRepository.find({ where: { station_id: id } });
    }
};
exports.StationsService = StationsService;
exports.StationsService = StationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(station_entity_1.Station)),
    __param(1, (0, typeorm_1.InjectRepository)(umbrella_entity_1.Umbrella)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StationsService);
//# sourceMappingURL=stations.service.js.map