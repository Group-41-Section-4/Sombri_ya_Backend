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
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let WeatherService = class WeatherService {
    configService;
    cache = new Map();
    constructor(configService) {
        this.configService = configService;
    }
    async getRainProbability(lat, lon) {
        const cacheKey = `${lat},${lon}`;
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (cached.expiry > new Date()) {
                return cached.data;
            }
        }
        console.log(`Fetching weather for ${lat}, ${lon} using API key: ${this.configService.get('WEATHER_API_KEY')}`);
        const mockData = {
            lat,
            lon,
            probability_of_rain: Math.random(),
            source: 'mock-weather-api',
        };
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);
        this.cache.set(cacheKey, { data: mockData, expiry });
        return mockData;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map