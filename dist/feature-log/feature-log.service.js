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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feature_log_entity_1 = require("../database/entities/feature-log.entity");
let FeatureLogService = class FeatureLogService {
    featureLogRepository;
    BANNED_LOG_NAMES = ['window', 'screen', 'view', 'open_window', 'screen_view'];
    constructor(featureLogRepository) {
        this.featureLogRepository = featureLogRepository;
    }
    async create(createFeatureLogDto) {
        const logName = createFeatureLogDto.name.toLowerCase();
        if (this.BANNED_LOG_NAMES.some(banned => logName.includes(banned))) {
            throw new common_1.BadRequestException(`Feature log name '${createFeatureLogDto.name}' is not allowed.`);
        }
        const log = this.featureLogRepository.create(createFeatureLogDto);
        return this.featureLogRepository.save(log);
    }
};
exports.FeatureLogService = FeatureLogService;
exports.FeatureLogService = FeatureLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feature_log_entity_1.FeatureLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeatureLogService);
//# sourceMappingURL=feature-log.service.js.map