"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feature_log_entity_1 = require("../database/entities/feature-log.entity");
const feature_log_controller_1 = require("./feature-log.controller");
const feature_log_service_1 = require("./feature-log.service");
let FeatureLogModule = class FeatureLogModule {
};
exports.FeatureLogModule = FeatureLogModule;
exports.FeatureLogModule = FeatureLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([feature_log_entity_1.FeatureLog])],
        controllers: [feature_log_controller_1.FeatureLogController],
        providers: [feature_log_service_1.FeatureLogService],
    })
], FeatureLogModule);
//# sourceMappingURL=feature-log.module.js.map