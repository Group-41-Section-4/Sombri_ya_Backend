"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var TournamentParticipant_1 = require("./TournamentParticipant");
var User_1 = require("./User");
var TournamentUserParticipant = /** @class */ (function (_super) {
    __extends(TournamentUserParticipant, _super);
    function TournamentUserParticipant(tournamentUserParticipant) {
        var _this = _super.call(this) || this;
        if (tournamentUserParticipant) {
            _this.user = tournamentUserParticipant.user;
        }
        return _this;
    }
    __decorate([
        index_1.OneToOne(function (type) { return User_1.User; }, {
            eager: true,
        }),
        index_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], TournamentUserParticipant.prototype, "user", void 0);
    TournamentUserParticipant = __decorate([
        index_1.ChildEntity(),
        __metadata("design:paramtypes", [Object])
    ], TournamentUserParticipant);
    return TournamentUserParticipant;
}(TournamentParticipant_1.TournamentParticipant));
exports.TournamentUserParticipant = TournamentUserParticipant;
//# sourceMappingURL=TournamentUserParticipant.js.map