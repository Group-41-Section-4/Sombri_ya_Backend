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
var index_1 = require("../../../../src/index");
var TournamentGraph_1 = require("./TournamentGraph");
var Tournament = /** @class */ (function () {
    function Tournament(tournament) {
        if (tournament) {
            this.name = tournament.name;
        }
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Tournament.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Tournament.prototype, "name", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return TournamentGraph_1.TournamentGraph; }, function (graph) { return graph.tournament; }),
        index_1.JoinColumn(),
        __metadata("design:type", TournamentGraph_1.TournamentGraph)
    ], Tournament.prototype, "graph", void 0);
    Tournament = __decorate([
        index_1.Entity(),
        index_1.TableInheritance({
            pattern: "STI",
            column: {
                name: "type",
                type: "varchar",
            },
        }),
        __metadata("design:paramtypes", [Object])
    ], Tournament);
    return Tournament;
}());
exports.Tournament = Tournament;
//# sourceMappingURL=Tournament.js.map