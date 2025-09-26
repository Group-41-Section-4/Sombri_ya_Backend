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
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn("increment", { type: "bigint" }),
        __metadata("design:type", String)
    ], Message.prototype, "id", void 0);
    Message = __decorate([
        Entity_1.Entity()
    ], Message);
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map