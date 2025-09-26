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
var year_1 = require("./year");
var user_month_1 = require("./user-month");
var Month = /** @class */ (function () {
    function Month() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Month.prototype, "yearNo", void 0);
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Month.prototype, "monthNo", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return year_1.Year; }, function (year) { return year.month; }),
        src_1.JoinColumn({ name: "yearNo", referencedColumnName: "yearNo" }),
        __metadata("design:type", year_1.Year)
    ], Month.prototype, "year", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return user_month_1.UserMonth; }, function (userMonth) { return userMonth.month; }),
        __metadata("design:type", Array)
    ], Month.prototype, "userMonth", void 0);
    Month = __decorate([
        src_1.Entity()
    ], Month);
    return Month;
}());
exports.Month = Month;
//# sourceMappingURL=month.js.map