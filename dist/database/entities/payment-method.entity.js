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
exports.PaymentMethod = exports.PaymentMethodType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["CARD"] = "card";
    PaymentMethodType["NFC"] = "nfc";
    PaymentMethodType["QR"] = "qr";
    PaymentMethodType["WALLET"] = "wallet";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
let PaymentMethod = class PaymentMethod {
    id;
    user_id;
    type;
    meta;
    user;
};
exports.PaymentMethod = PaymentMethod;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaymentMethod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentMethodType }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], PaymentMethod.prototype, "meta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.payment_methods),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PaymentMethod.prototype, "user", void 0);
exports.PaymentMethod = PaymentMethod = __decorate([
    (0, typeorm_1.Entity)('payment_methods')
], PaymentMethod);
//# sourceMappingURL=payment-method.entity.js.map