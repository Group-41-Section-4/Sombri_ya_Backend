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
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
var ActivityEntity_1 = require("./ActivityEntity");
var TileEntity = /** @class */ (function () {
    function TileEntity() {
    }
    TileEntity_1 = TileEntity;
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn({ type: "bigint" }),
        __metadata("design:type", String)
    ], TileEntity.prototype, "id", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return TileEntity_1; }, function (tile) { return tile.children; }, {
            cascade: ["insert"]
        }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], TileEntity.prototype, "parents", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return TileEntity_1; }, function (tile) { return tile.parents; }, {
            cascade: ["insert"]
        }),
        __metadata("design:type", Array)
    ], TileEntity.prototype, "children", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return ActivityEntity_1.ActivityEntity; }, function (activity) { return activity.tiles; }, {
            cascade: ["insert"]
        }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], TileEntity.prototype, "activities", void 0);
    TileEntity = TileEntity_1 = __decorate([
        Entity_1.Entity("tile")
    ], TileEntity);
    return TileEntity;
    var TileEntity_1;
}());
exports.TileEntity = TileEntity;
//# sourceMappingURL=TileEntity.js.map