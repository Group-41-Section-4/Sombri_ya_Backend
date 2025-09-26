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
exports.Station = void 0;
const typeorm_1 = require("typeorm");
const umbrella_entity_1 = require("./umbrella.entity");
const rental_entity_1 = require("./rental.entity");
let Station = class Station {
    id;
    description;
    place_name;
    latitude;
    longitude;
    location;
    umbrellas;
    started_rentals;
    ended_rentals;
};
exports.Station = Station;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Station.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Station.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Station.prototype, "place_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Station.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Station.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Index)({ spatial: true }),
    (0, typeorm_1.Column)({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Station.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => umbrella_entity_1.Umbrella, (umbrella) => umbrella.station),
    __metadata("design:type", Array)
], Station.prototype, "umbrellas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rental_entity_1.Rental, (rental) => rental.start_station),
    __metadata("design:type", Array)
], Station.prototype, "started_rentals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rental_entity_1.Rental, (rental) => rental.end_station),
    __metadata("design:type", Array)
], Station.prototype, "ended_rentals", void 0);
exports.Station = Station = __decorate([
    (0, typeorm_1.Entity)('stations')
], Station);
//# sourceMappingURL=station.entity.js.map