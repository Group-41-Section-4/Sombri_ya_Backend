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
var JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
var Platform_1 = require("./Platform");
var Game = /** @class */ (function () {
    function Game() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Game.prototype, "id", void 0);
    __decorate([
        Column_1.Column({
            length: 80
        }),
        __metadata("design:type", String)
    ], Game.prototype, "name", void 0);
    __decorate([
        Column_1.Column({
            name: "search_terms",
            length: 80
        }),
        __metadata("design:type", String)
    ], Game.prototype, "searchTerms", void 0);
    __decorate([
        Column_1.Column({
            name: "reviewed"
        }),
        __metadata("design:type", Boolean)
    ], Game.prototype, "isReviewed", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Platform_1.Platform; }, function (platform) { return platform.games; }, {
            cascade: true
        }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Game.prototype, "platforms", void 0);
    Game = __decorate([
        Entity_1.Entity("games"),
        Index_1.Index("game_name_idx", ["name"], { unique: true })
    ], Game);
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map