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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var TileEntity_1 = require("./TileEntity");
var ActivityEntity = /** @class */ (function () {
    function ActivityEntity() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn({ type: "bigint" }),
        __metadata("design:type", String)
    ], ActivityEntity.prototype, "id", void 0);
    __decorate([
        Column_1.Column({ type: "datetime" }),
        __metadata("design:type", Date)
    ], ActivityEntity.prototype, "endDate", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return TileEntity_1.TileEntity; }, function (tile) { return tile.activities; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], ActivityEntity.prototype, "tiles", void 0);
    ActivityEntity = __decorate([
        Entity_1.Entity("activity")
    ], ActivityEntity);
    return ActivityEntity;
}());
exports.ActivityEntity = ActivityEntity;
//# sourceMappingURL=ActivityEntity.js.map