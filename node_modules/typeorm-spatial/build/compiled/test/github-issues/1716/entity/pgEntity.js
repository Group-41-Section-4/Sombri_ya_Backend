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
var src_1 = require("../../../../src");
var PgEntity = /** @class */ (function () {
    function PgEntity() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], PgEntity.prototype, "id", void 0);
    __decorate([
        src_1.Column("time"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTime", void 0);
    __decorate([
        src_1.Column("time with time zone"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTimeWithTZ", void 0);
    __decorate([
        src_1.Column("time without time zone"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTimeWithoutTZ", void 0);
    __decorate([
        src_1.Column("timestamp"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTimestamp", void 0);
    __decorate([
        src_1.Column("timestamp without time zone"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTimestampWithoutTZ", void 0);
    __decorate([
        src_1.Column("timestamp with time zone"),
        __metadata("design:type", Date)
    ], PgEntity.prototype, "fieldTimestampWithTZ", void 0);
    PgEntity = __decorate([
        src_1.Entity()
    ], PgEntity);
    return PgEntity;
}());
exports.PgEntity = PgEntity;
//# sourceMappingURL=pgEntity.js.map