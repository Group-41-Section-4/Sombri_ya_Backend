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
exports.RentalsController = void 0;
const common_1 = require("@nestjs/common");
const rentals_service_1 = require("./rentals.service");
const start_rental_dto_1 = require("./dto/start-rental.dto");
const end_rental_dto_1 = require("./dto/end-rental.dto");
const rental_entity_1 = require("../database/entities/rental.entity");
let RentalsController = class RentalsController {
    rentalsService;
    constructor(rentalsService) {
        this.rentalsService = rentalsService;
    }
    async start(startRentalDto) {
        const rental = await this.rentalsService.start(startRentalDto);
        return { rental_id: rental.id, start_time: rental.start_time, status: rental.status, auth_attempts: rental.auth_attempts };
    }
    async end(endRentalDto) {
        const rental = await this.rentalsService.end(endRentalDto);
        return { rental_id: rental.id, end_time: rental.end_time, status: rental.status, duration_minutes: rental.duration_minutes, distance_meters: rental.distance_meters };
    }
    find(user_id, status) {
        return this.rentalsService.find(user_id, status);
    }
    findOne(id) {
        return this.rentalsService.findOne(id);
    }
};
exports.RentalsController = RentalsController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [start_rental_dto_1.StartRentalDto]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('end'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [end_rental_dto_1.EndRentalDto]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "end", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findOne", null);
exports.RentalsController = RentalsController = __decorate([
    (0, common_1.Controller)('rentals'),
    __metadata("design:paramtypes", [rentals_service_1.RentalsService])
], RentalsController);
//# sourceMappingURL=rentals.controller.js.map