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
var src_1 = require("../../../../src");
var month_1 = require("./month");
var Year = /** @class */ (function () {
    function Year() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Year.prototype, "yearNo", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return month_1.Month; }, function (month) { return month.yearNo; }),
        __metadata("design:type", Array)
    ], Year.prototype, "month", void 0);
    Year = __decorate([
        src_1.Entity()
    ], Year);
    return Year;
}());
exports.Year = Year;
//# sourceMappingURL=year.js.map