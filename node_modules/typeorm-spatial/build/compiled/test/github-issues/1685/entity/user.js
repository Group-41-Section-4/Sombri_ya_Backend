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
var user_month_1 = require("./user-month");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return user_month_1.UserMonth; }, function (userMonth) { return userMonth.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "userMonths", void 0);
    User = __decorate([
        src_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map