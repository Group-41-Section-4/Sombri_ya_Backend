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
exports.RainProbabilityDto = exports.BookingsFrequencyDto = exports.TopFeaturesDto = exports.DateRangeDto = void 0;
const class_validator_1 = require("class-validator");
class DateRangeDto {
    start_date;
    end_date;
}
exports.DateRangeDto = DateRangeDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "end_date", void 0);
class TopFeaturesDto extends DateRangeDto {
    limit;
}
exports.TopFeaturesDto = TopFeaturesDto;
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TopFeaturesDto.prototype, "limit", void 0);
class BookingsFrequencyDto extends DateRangeDto {
    group_by;
}
exports.BookingsFrequencyDto = BookingsFrequencyDto;
__decorate([
    (0, class_validator_1.IsIn)(['day', 'week', 'month']),
    __metadata("design:type", String)
], BookingsFrequencyDto.prototype, "group_by", void 0);
class RainProbabilityDto {
    lat;
    lon;
}
exports.RainProbabilityDto = RainProbabilityDto;
__decorate([
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", String)
], RainProbabilityDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", String)
], RainProbabilityDto.prototype, "lon", void 0);
//# sourceMappingURL=query-analytics.dto.js.map