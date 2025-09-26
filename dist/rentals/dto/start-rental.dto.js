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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartRentalDto = void 0;
const class_validator_1 = require("class-validator");
const rental_entity_1 = require("../../database/entities/rental.entity");
class GpsCoordDto {
    lat;
    lon;
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GpsCoordDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GpsCoordDto.prototype, "lon", void 0);
class StartRentalDto {
    user_id;
    umbrella_id;
    station_start_id;
    payment_method_id;
    start_gps;
    auth_type;
}
exports.StartRentalDto = StartRentalDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartRentalDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartRentalDto.prototype, "umbrella_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartRentalDto.prototype, "station_start_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartRentalDto.prototype, "payment_method_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", GpsCoordDto)
], StartRentalDto.prototype, "start_gps", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(rental_entity_1.AuthType),
    __metadata("design:type", String)
], StartRentalDto.prototype, "auth_type", void 0);
//# sourceMappingURL=start-rental.dto.js.map