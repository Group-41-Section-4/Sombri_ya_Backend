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
var DeliverySlot_1 = require("./DeliverySlot");
var User_1 = require("./User");
var OrderItem_1 = require("./OrderItem");
var src_1 = require("../../../../src");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        src_1.ManyToOne(function (type) { return DeliverySlot_1.DeliverySlot; }, { primary: true }),
        __metadata("design:type", DeliverySlot_1.DeliverySlot)
    ], Order.prototype, "deliverySlot", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.recurringOrders; }, { primary: true }),
        __metadata("design:type", User_1.User)
    ], Order.prototype, "user", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", Boolean)
    ], Order.prototype, "enabled", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return OrderItem_1.OrderItem; }, function (item) { return item.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "items", void 0);
    Order = __decorate([
        src_1.Entity()
    ], Order);
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map