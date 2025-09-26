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
exports.Umbrella = exports.UmbrellaState = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
var UmbrellaState;
(function (UmbrellaState) {
    UmbrellaState["AVAILABLE"] = "available";
    UmbrellaState["RENTED"] = "rented";
    UmbrellaState["MAINTENANCE"] = "maintenance";
})(UmbrellaState || (exports.UmbrellaState = UmbrellaState = {}));
let Umbrella = class Umbrella {
    id;
    station_id;
    state;
    last_maintenance_at;
    station;
};
exports.Umbrella = Umbrella;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Umbrella.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Umbrella.prototype, "station_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UmbrellaState, default: UmbrellaState.AVAILABLE }),
    __metadata("design:type", String)
], Umbrella.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Umbrella.prototype, "last_maintenance_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_entity_1.Station, (station) => station.umbrellas),
    (0, typeorm_1.JoinColumn)({ name: 'station_id' }),
    __metadata("design:type", station_entity_1.Station)
], Umbrella.prototype, "station", void 0);
exports.Umbrella = Umbrella = __decorate([
    (0, typeorm_1.Entity)('umbrellas')
], Umbrella);
//# sourceMappingURL=umbrella.entity.js.map