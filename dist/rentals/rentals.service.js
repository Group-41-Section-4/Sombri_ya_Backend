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
exports.RentalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rental_entity_1 = require("../database/entities/rental.entity");
const umbrella_entity_1 = require("../database/entities/umbrella.entity");
let RentalsService = class RentalsService {
    rentalRepository;
    umbrellaRepository;
    dataSource;
    constructor(rentalRepository, umbrellaRepository, dataSource) {
        this.rentalRepository = rentalRepository;
        this.umbrellaRepository = umbrellaRepository;
        this.dataSource = dataSource;
    }
    async start(startRentalDto) {
        const { umbrella_id } = startRentalDto;
        const umbrella = await this.umbrellaRepository.findOneBy({ id: umbrella_id });
        if (!umbrella || umbrella.state !== umbrella_entity_1.UmbrellaState.AVAILABLE) {
            throw new common_1.NotFoundException('Umbrella not available for rental.');
        }
        let newRental = null;
        await this.dataSource.transaction(async (manager) => {
            umbrella.state = umbrella_entity_1.UmbrellaState.RENTED;
            await manager.save(umbrella);
            const rental = this.rentalRepository.create({
                ...startRentalDto,
                start_time: new Date(),
                status: rental_entity_1.RentalStatus.ONGOING,
            });
            newRental = await manager.save(rental);
        });
        return newRental;
    }
    async end(endRentalDto) {
        const { rental_id, station_end_id } = endRentalDto;
        const rental = await this.rentalRepository.findOneBy({ id: rental_id });
        if (!rental || rental.status !== rental_entity_1.RentalStatus.ONGOING) {
            throw new common_1.NotFoundException('Rental not found or already completed.');
        }
        await this.dataSource.transaction(async (manager) => {
            rental.end_time = new Date();
            rental.status = rental_entity_1.RentalStatus.COMPLETED;
            if (station_end_id) {
                rental.station_end_id = station_end_id;
            }
            rental.duration_minutes = Math.round((rental.end_time.getTime() - rental.start_time.getTime()) / 60000);
            await manager.save(rental);
            const umbrella = await manager.findOneBy(umbrella_entity_1.Umbrella, { id: rental.umbrella_id });
            if (umbrella) {
                umbrella.state = umbrella_entity_1.UmbrellaState.AVAILABLE;
                if (station_end_id) {
                    umbrella.station_id = station_end_id;
                }
                await manager.save(umbrella);
            }
        });
        return rental;
    }
    async find(user_id, status) {
        return this.rentalRepository.find({ where: { user_id, status } });
    }
    async findOne(id) {
        const rental = await this.rentalRepository.findOneBy({ id });
        if (!rental) {
            throw new common_1.NotFoundException(`Rental with ID "${id}" not found`);
        }
        return rental;
    }
};
exports.RentalsService = RentalsService;
exports.RentalsService = RentalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(1, (0, typeorm_1.InjectRepository)(umbrella_entity_1.Umbrella)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RentalsService);
//# sourceMappingURL=rentals.service.js.map