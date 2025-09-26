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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("./analytics.service");
const query_analytics_dto_1 = require("./dto/query-analytics.dto");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getAvailability(station_id) {
        return this.analyticsService.getAvailability(station_id);
    }
    getBookingsFrequency(query) {
        return this.analyticsService.getBookingsFrequency(query.start_date, query.end_date, query.group_by);
    }
    getUserHeatmap(query) {
        return this.analyticsService.getUserHeatmap(query.start_date, query.end_date);
    }
    getStationHeatmap(query) {
        return this.analyticsService.getStationHeatmap(query.start_date, query.end_date);
    }
    getTopFeatures(query) {
        return this.analyticsService.getTopFeatures(query.start_date, query.end_date, Number(query.limit) || 5);
    }
    getNfcVsQr(query) {
        return this.analyticsService.getNfcVsQr(query.start_date, query.end_date);
    }
    getBiometricUsage() {
        return this.analyticsService.getBiometricUsage();
    }
    getRainProbability(query) {
        return this.analyticsService.getRainProbability(Number(query.lat), Number(query.lon));
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)('station_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Get)('bookings/frequency'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.BookingsFrequencyDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getBookingsFrequency", null);
__decorate([
    (0, common_1.Get)('heatmap/users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getUserHeatmap", null);
__decorate([
    (0, common_1.Get)('heatmap/stations'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getStationHeatmap", null);
__decorate([
    (0, common_1.Get)('features/top'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.TopFeaturesDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTopFeatures", null);
__decorate([
    (0, common_1.Get)('features/nfc-vs-qr'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getNfcVsQr", null);
__decorate([
    (0, common_1.Get)('biometric-usage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getBiometricUsage", null);
__decorate([
    (0, common_1.Get)('rain-probability'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_analytics_dto_1.RainProbabilityDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getRainProbability", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map