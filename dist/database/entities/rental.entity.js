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
exports.Rental = exports.AuthType = exports.RentalStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const umbrella_entity_1 = require("./umbrella.entity");
const station_entity_1 = require("./station.entity");
const payment_method_entity_1 = require("./payment-method.entity");
var RentalStatus;
(function (RentalStatus) {
    RentalStatus["ONGOING"] = "ongoing";
    RentalStatus["COMPLETED"] = "completed";
    RentalStatus["CANCELLED"] = "cancelled";
})(RentalStatus || (exports.RentalStatus = RentalStatus = {}));
var AuthType;
(function (AuthType) {
    AuthType["NFC"] = "nfc";
    AuthType["QR"] = "qr";
})(AuthType || (exports.AuthType = AuthType = {}));
let Rental = class Rental {
    id;
    user_id;
    umbrella_id;
    station_start_id;
    station_end_id;
    start_time;
    end_time;
    status;
    duration_minutes;
    distance_meters;
    payment_method_id;
    auth_type;
    auth_attempts;
    user;
    umbrella;
    start_station;
    end_station;
    payment_method;
};
exports.Rental = Rental;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rental.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rental.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rental.prototype, "umbrella_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rental.prototype, "station_start_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Rental.prototype, "station_end_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Rental.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Rental.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RentalStatus, default: RentalStatus.ONGOING }),
    __metadata("design:type", String)
], Rental.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Rental.prototype, "duration_minutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], Rental.prototype, "distance_meters", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Rental.prototype, "payment_method_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AuthType }),
    __metadata("design:type", String)
], Rental.prototype, "auth_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 1 }),
    __metadata("design:type", Number)
], Rental.prototype, "auth_attempts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.rentals),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Rental.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => umbrella_entity_1.Umbrella),
    (0, typeorm_1.JoinColumn)({ name: 'umbrella_id' }),
    __metadata("design:type", umbrella_entity_1.Umbrella)
], Rental.prototype, "umbrella", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.started_rentals),
    (0, typeorm_1.JoinColumn)({ name: 'station_start_id' }),
    __metadata("design:type", station_entity_1.Station)
], Rental.prototype, "start_station", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.ended_rentals, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'station_end_id' }),
    __metadata("design:type", station_entity_1.Station)
], Rental.prototype, "end_station", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_method_entity_1.PaymentMethod),
    (0, typeorm_1.JoinColumn)({ name: 'payment_method_id' }),
    __metadata("design:type", payment_method_entity_1.PaymentMethod)
], Rental.prototype, "payment_method", void 0);
exports.Rental = Rental = __decorate([
    (0, typeorm_1.Entity)('rentals')
], Rental);
//# sourceMappingURL=rental.entity.js.map