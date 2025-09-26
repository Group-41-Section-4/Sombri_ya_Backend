"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const analytics_controller_1 = require("./analytics.controller");
const analytics_service_1 = require("./analytics.service");
const rental_entity_1 = require("../database/entities/rental.entity");
const station_entity_1 = require("../database/entities/station.entity");
const user_entity_1 = require("../database/entities/user.entity");
const feature_log_entity_1 = require("../database/entities/feature-log.entity");
const app_open_log_entity_1 = require("../database/entities/app-open-log.entity");
const weather_module_1 = require("../weather/weather.module");
const subscription_entity_1 = require("../database/entities/subscription.entity");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rental_entity_1.Rental,
                station_entity_1.Station,
                user_entity_1.User,
                feature_log_entity_1.FeatureLog,
                app_open_log_entity_1.AppOpenLog,
                subscription_entity_1.Subscription,
            ]),
            weather_module_1.WeatherModule,
        ],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map