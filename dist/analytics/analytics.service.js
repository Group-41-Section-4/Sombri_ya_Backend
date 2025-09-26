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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rental_entity_1 = require("../database/entities/rental.entity");
const user_entity_1 = require("../database/entities/user.entity");
const feature_log_entity_1 = require("../database/entities/feature-log.entity");
const app_open_log_entity_1 = require("../database/entities/app-open-log.entity");
const weather_service_1 = require("../weather/weather.service");
const subscription_entity_1 = require("../database/entities/subscription.entity");
let AnalyticsService = class AnalyticsService {
    rentalRepo;
    userRepo;
    featureLogRepo;
    appOpenLogRepo;
    subscriptionRepo;
    weatherService;
    dataSource;
    constructor(rentalRepo, userRepo, featureLogRepo, appOpenLogRepo, subscriptionRepo, weatherService, dataSource) {
        this.rentalRepo = rentalRepo;
        this.userRepo = userRepo;
        this.featureLogRepo = featureLogRepo;
        this.appOpenLogRepo = appOpenLogRepo;
        this.subscriptionRepo = subscriptionRepo;
        this.weatherService = weatherService;
        this.dataSource = dataSource;
    }
    async getAvailability(station_id) {
        const query = `
      SELECT
        s.id AS station_id,
        COUNT(CASE WHEN u.state = 'available' THEN 1 END) AS available_umbrellas,
        COUNT(u.id) AS total_umbrellas,
        NOW() as timestamp
      FROM stations s
      LEFT JOIN umbrellas u ON s.id = u.station_id
      WHERE s.id = $1
      GROUP BY s.id;
    `;
        const result = await this.dataSource.query(query, [station_id]);
        return result[0];
    }
    async getBookingsFrequency(start_date, end_date, group_by) {
        const query = `
      SELECT
        date_trunc($3, r.start_time) AS period,
        r.station_start_id,
        COUNT(r.id) AS bookings_count
      FROM rentals r
      WHERE r.start_time BETWEEN $1 AND $2
      GROUP BY period, r.station_start_id
      ORDER BY period;
    `;
        return this.dataSource.query(query, [start_date, end_date, group_by]);
    }
    async getUserHeatmap(start_date, end_date) {
        const query = `
      SELECT
        ROUND(ST_X(location::geometry)::numeric, 4) as lon,
        ROUND(ST_Y(location::geometry)::numeric, 4) as lat,
        COUNT(id) as count
      FROM app_open_logs
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY lon, lat;
    `;
        return this.dataSource.query(query, [start_date, end_date]);
    }
    async getStationHeatmap(start_date, end_date) {
        const query = `
      SELECT
        s.id as station_id,
        s.latitude as lat,
        s.longitude as lon,
        COUNT(r.id) as bookings_count
      FROM rentals r
      JOIN stations s ON r.station_start_id = s.id
      WHERE r.start_time BETWEEN $1 AND $2
      GROUP BY s.id, s.latitude, s.longitude;
    `;
        return this.dataSource.query(query, [start_date, end_date]);
    }
    async getTopFeatures(start_date, end_date, limit) {
        const query = `
      WITH total_logs AS (
        SELECT COUNT(*) as total FROM feature_logs WHERE created_at BETWEEN $1 AND $2
      )
      SELECT 
        name as feature_name,
        COUNT(id) as uses,
        (COUNT(id)::float / (SELECT total FROM total_logs)) * 100 as percent_of_total
      FROM feature_logs
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY name
      ORDER BY uses DESC
      LIMIT $3;
    `;
        return this.dataSource.query(query, [start_date, end_date, limit]);
    }
    async getNfcVsQr(start_date, end_date) {
        const query = `
      SELECT
        COUNT(CASE WHEN auth_type = 'nfc' THEN 1 END) AS nfc_uses,
        COUNT(CASE WHEN auth_type = 'qr' THEN 1 END) AS qr_uses,
        (SELECT COUNT(*) FROM feature_logs WHERE name = 'nfc_tap_attempt' AND (details->>'success')::boolean = false AND created_at BETWEEN $1 AND $2) as nfc_fails,
        (SELECT COUNT(*) FROM feature_logs WHERE name = 'qr_scan_attempt' AND (details->>'success')::boolean = false AND created_at BETWEEN $1 AND $2) as qr_fails
      FROM rentals
      WHERE start_time BETWEEN $1 AND $2;
    `;
        const result = await this.dataSource.query(query, [start_date, end_date]);
        const stats = result[0] || {};
        const nfc_uses = parseInt(stats.nfc_uses) || 0;
        const nfc_fails = parseInt(stats.nfc_fails) || 0;
        const qr_uses = parseInt(stats.qr_uses) || 0;
        const qr_fails = parseInt(stats.qr_fails) || 0;
        return {
            nfc: { uses: nfc_uses, fails: nfc_fails },
            qr: { uses: qr_uses, fails: qr_fails },
            nfc_failure_rate: nfc_uses + nfc_fails > 0 ? nfc_fails / (nfc_uses + nfc_fails) : 0,
            qr_failure_rate: qr_uses + qr_fails > 0 ? qr_fails / (qr_uses + qr_fails) : 0,
        };
    }
    async getBiometricUsage() {
        const total_users = await this.userRepo.count();
        const biometric_enabled_count = await this.userRepo.count({ where: { biometric_enabled: true } });
        return {
            total_users,
            biometric_enabled_count,
            percent: total_users > 0 ? (biometric_enabled_count / total_users) * 100 : 0,
        };
    }
    async getRainProbability(lat, lon) {
        return this.weatherService.getRainProbability(lat, lon);
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(feature_log_entity_1.FeatureLog)),
    __param(3, (0, typeorm_1.InjectRepository)(app_open_log_entity_1.AppOpenLog)),
    __param(4, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        weather_service_1.WeatherService,
        typeorm_2.DataSource])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map