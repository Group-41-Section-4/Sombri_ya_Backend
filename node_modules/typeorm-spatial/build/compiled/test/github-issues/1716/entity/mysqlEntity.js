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
var MysqlEntity = /** @class */ (function () {
    function MysqlEntity() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], MysqlEntity.prototype, "id", void 0);
    __decorate([
        src_1.Column("time"),
        __metadata("design:type", Date)
    ], MysqlEntity.prototype, "fieldTime", void 0);
    __decorate([
        src_1.Column("timestamp"),
        __metadata("design:type", Date)
    ], MysqlEntity.prototype, "fieldTimestamp", void 0);
    __decorate([
        src_1.Column("datetime"),
        __metadata("design:type", Date)
    ], MysqlEntity.prototype, "fieldDatetime", void 0);
    MysqlEntity = __decorate([
        src_1.Entity()
    ], MysqlEntity);
    return MysqlEntity;
}());
exports.MysqlEntity = MysqlEntity;
//# sourceMappingURL=mysqlEntity.js.map