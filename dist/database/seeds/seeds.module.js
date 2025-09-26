"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const plan_entity_1 = require("../entities/plan.entity");
const station_entity_1 = require("../entities/station.entity");
const umbrella_entity_1 = require("../entities/umbrella.entity");
const initial_seed_1 = require("./initial-seed");
let SeedsModule = class SeedsModule {
};
exports.SeedsModule = SeedsModule;
exports.SeedsModule = SeedsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, plan_entity_1.Plan, station_entity_1.Station, umbrella_entity_1.Umbrella])],
        providers: [initial_seed_1.InitialSeed],
    })
], SeedsModule);
//# sourceMappingURL=seeds.module.js.map