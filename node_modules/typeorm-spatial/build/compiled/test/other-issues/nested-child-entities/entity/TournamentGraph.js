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
var Tournament_1 = require("./Tournament");
var TournamentGraph = /** @class */ (function () {
    function TournamentGraph() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], TournamentGraph.prototype, "id", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return Tournament_1.Tournament; }, function (tournament) { return tournament.graph; }),
        __metadata("design:type", Tournament_1.Tournament)
    ], TournamentGraph.prototype, "tournament", void 0);
    TournamentGraph = __decorate([
        index_1.Entity()
    ], TournamentGraph);
    return TournamentGraph;
}());
exports.TournamentGraph = TournamentGraph;
//# sourceMappingURL=TournamentGraph.js.map