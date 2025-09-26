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
var user_1 = require("./user");
var UserMonth = /** @class */ (function () {
    function UserMonth() {
    }
    UserMonth.prototype.workaround = function () {
        // Here a workaround for this issue
        // this.yearNo = this.month.year.yearNo;
    };
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], UserMonth.prototype, "yearNo", void 0);
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], UserMonth.prototype, "monthNo", void 0);
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], UserMonth.prototype, "username", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return month_1.Month; }, function (month) { return month.userMonth; }),
        src_1.JoinColumn([
            { name: "yearNo", referencedColumnName: "yearNo" },
            { name: "monthNo", referencedColumnName: "monthNo" }
        ]),
        __metadata("design:type", month_1.Month)
    ], UserMonth.prototype, "month", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return user_1.User; }, function (user) { return user.username; }),
        src_1.JoinColumn({ name: "username", referencedColumnName: "username" }),
        __metadata("design:type", user_1.User)
    ], UserMonth.prototype, "user", void 0);
    __decorate([
        src_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserMonth.prototype, "workaround", null);
    UserMonth = __decorate([
        src_1.Entity()
    ], UserMonth);
    return UserMonth;
}());
exports.UserMonth = UserMonth;
//# sourceMappingURL=user-month.js.map