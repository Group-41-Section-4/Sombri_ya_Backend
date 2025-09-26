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
exports.AppOpenLog = void 0;
const typeorm_1 = require("typeorm");
let AppOpenLog = class AppOpenLog {
    id;
    user_id;
    created_at;
    location;
};
exports.AppOpenLog = AppOpenLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AppOpenLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AppOpenLog.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], AppOpenLog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Index)({ spatial: true }),
    (0, typeorm_1.Column)({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], AppOpenLog.prototype, "location", void 0);
exports.AppOpenLog = AppOpenLog = __decorate([
    (0, typeorm_1.Entity)('app_open_logs')
], AppOpenLog);
//# sourceMappingURL=app-open-log.entity.js.map