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
var Index_1 = require("../../../../src/decorator/Index");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var Game_1 = require("./Game");
var Platform = /** @class */ (function () {
    function Platform() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Platform.prototype, "id", void 0);
    __decorate([
        Column_1.Column({
            length: 100
        }),
        __metadata("design:type", String)
    ], Platform.prototype, "name", void 0);
    __decorate([
        Column_1.Column({
            length: 100
        }),
        __metadata("design:type", String)
    ], Platform.prototype, "slug", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Game_1.Game; }, function (game) { return game.platforms; }),
        __metadata("design:type", Array)
    ], Platform.prototype, "games", void 0);
    Platform = __decorate([
        Entity_1.Entity("platforms"),
        Index_1.Index("platform_name_idx", ["name"], { unique: true })
    ], Platform);
    return Platform;
}());
exports.Platform = Platform;
//# sourceMappingURL=Platform.js.map