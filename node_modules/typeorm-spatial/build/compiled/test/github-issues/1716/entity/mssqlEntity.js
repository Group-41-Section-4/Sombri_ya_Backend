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
var MssqlEntity = /** @class */ (function () {
    function MssqlEntity() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], MssqlEntity.prototype, "id", void 0);
    __decorate([
        src_1.Column("time"),
        __metadata("design:type", Date)
    ], MssqlEntity.prototype, "fieldTime", void 0);
    __decorate([
        src_1.Column("datetime"),
        __metadata("design:type", Date)
    ], MssqlEntity.prototype, "fieldDatetime", void 0);
    __decorate([
        src_1.Column("datetime2"),
        __metadata("design:type", Date)
    ], MssqlEntity.prototype, "fieldDatetime2", void 0);
    __decorate([
        src_1.Column("datetimeoffset"),
        __metadata("design:type", Date)
    ], MssqlEntity.prototype, "fieldDatetimeoffset", void 0);
    MssqlEntity = __decorate([
        src_1.Entity()
    ], MssqlEntity);
    return MssqlEntity;
}());
exports.MssqlEntity = MssqlEntity;
//# sourceMappingURL=mssqlEntity.js.map