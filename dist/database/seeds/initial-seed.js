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
exports.InitialSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const plan_entity_1 = require("../entities/plan.entity");
const station_entity_1 = require("../entities/station.entity");
const umbrella_entity_1 = require("../entities/umbrella.entity");
let InitialSeed = class InitialSeed {
    userRepository;
    planRepository;
    stationRepository;
    umbrellaRepository;
    constructor(userRepository, planRepository, stationRepository, umbrellaRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.stationRepository = stationRepository;
        this.umbrellaRepository = umbrellaRepository;
    }
    async run() {
        await this.createUsers();
        await this.createPlans();
        const stations = await this.createStations();
        await this.createUmbrellas(stations);
    }
    async createUsers() {
        const users = [];
        for (let i = 0; i < 50; i++) {
            users.push({
                name: `User ${i}`,
                email: `user${i}@example.com`,
                biometric_enabled: Math.random() > 0.5,
            });
        }
        await this.userRepository.save(users);
    }
    async createPlans() {
        const plans = [
            { name: 'Pay per use', duration_days: 0, price: 1.5 },
            { name: 'Monthly', duration_days: 30, price: 15 },
            { name: 'Annual', duration_days: 365, price: 150 },
        ];
        await this.planRepository.save(plans);
    }
    async createStations() {
        const stationsData = [
            { description: 'Main Square Station', place_name: 'Plaza Mayor', latitude: 40.415, longitude: -3.707 },
            { description: 'Retiro Park Station', place_name: 'Parque del Retiro', latitude: 40.414, longitude: -3.683 },
            { description: 'Prado Museum Station', place_name: 'Museo del Prado', latitude: 40.413, longitude: -3.692 },
            { description: 'Atocha Station', place_name: 'Estación de Atocha', latitude: 40.407, longitude: -3.690 },
            { description: 'Sol Station', place_name: 'Puerta del Sol', latitude: 40.417, longitude: -3.703 },
            { description: 'Gran Via Station', place_name: 'Gran Vía', latitude: 40.420, longitude: -3.705 },
            { description: 'Royal Palace Station', place_name: 'Palacio Real', latitude: 40.418, longitude: -3.714 },
            { description: 'Cibeles Station', place_name: 'Plaza de Cibeles', latitude: 40.419, longitude: -3.693 },
            { description: 'Debod Temple Station', place_name: 'Templo de Debod', latitude: 40.424, longitude: -3.718 },
            { description: 'Malasaña Station', place_name: 'Barrio de Malasaña', latitude: 40.426, longitude: -3.704 },
        ];
        const stations = stationsData.map(s => this.stationRepository.create({
            ...s,
            location: { type: 'Point', coordinates: [s.longitude, s.latitude] },
        }));
        return this.stationRepository.save(stations);
    }
    async createUmbrellas(stations) {
        const umbrellas = [];
        for (const station of stations) {
            for (let i = 0; i < 5; i++) {
                umbrellas.push({
                    station_id: station.id,
                    state: umbrella_entity_1.UmbrellaState.AVAILABLE,
                });
            }
        }
        await this.umbrellaRepository.save(umbrellas);
    }
};
exports.InitialSeed = InitialSeed;
exports.InitialSeed = InitialSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(station_entity_1.Station)),
    __param(3, (0, typeorm_1.InjectRepository)(umbrella_entity_1.Umbrella)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InitialSeed);
//# sourceMappingURL=initial-seed.js.map