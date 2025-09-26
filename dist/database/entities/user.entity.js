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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const subscription_entity_1 = require("./subscription.entity");
const rental_entity_1 = require("./rental.entity");
const payment_method_entity_1 = require("./payment-method.entity");
const feature_log_entity_1 = require("./feature-log.entity");
let User = class User {
    id;
    name;
    email;
    biometric_enabled;
    created_at;
    subscriptions;
    rentals;
    payment_methods;
    feature_logs;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "biometric_enabled", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (subscription) => subscription.user),
    __metadata("design:type", Array)
], User.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rental_entity_1.Rental, (rental) => rental.user),
    __metadata("design:type", Array)
], User.prototype, "rentals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_method_entity_1.PaymentMethod, (paymentMethod) => paymentMethod.user),
    __metadata("design:type", Array)
], User.prototype, "payment_methods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feature_log_entity_1.FeatureLog, (log) => log.user),
    __metadata("design:type", Array)
], User.prototype, "feature_logs", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map