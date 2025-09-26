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
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var AccountActivationToken_1 = require("./AccountActivationToken");
var index_1 = require("../../../../src/index");
var Account = /** @class */ (function () {
    function Account() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Account.prototype, "id", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return AccountActivationToken_1.AccountActivationToken; }, "account", { cascade: ["insert", "remove"] }),
        __metadata("design:type", AccountActivationToken_1.AccountActivationToken)
    ], Account.prototype, "accountActivationToken", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Account.prototype, "username", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Account.prototype, "password", void 0);
    Account = __decorate([
        Entity_1.Entity()
    ], Account);
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=Account.js.map