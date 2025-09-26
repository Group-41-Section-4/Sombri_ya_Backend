"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var PersonalInfo = /** @class */ (function () {
    function PersonalInfo() {
    }
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PersonalInfo.prototype, "firstName", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PersonalInfo.prototype, "lastName", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PersonalInfo.prototype, "address", void 0);
    return PersonalInfo;
}());
exports.PersonalInfo = PersonalInfo;
var UserInfo = /** @class */ (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], UserInfo.prototype, "userName", void 0);
    return UserInfo;
}(PersonalInfo));
exports.UserInfo = UserInfo;
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        Column_1.Column(function (type) { return UserInfo; }),
        __metadata("design:type", UserInfo)
    ], User.prototype, "info", void 0);
    User = __decorate([
        Entity_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map