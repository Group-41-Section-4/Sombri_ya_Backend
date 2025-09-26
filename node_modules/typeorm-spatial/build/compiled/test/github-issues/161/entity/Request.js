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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
var Ticket_1 = require("./Ticket");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Request = /** @class */ (function () {
    function Request() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Request.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Request.prototype, "owner", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Request.prototype, "type", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Boolean)
    ], Request.prototype, "success", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Ticket_1.Ticket; }, function (ticket) { return ticket.request; }),
        __metadata("design:type", Ticket_1.Ticket)
    ], Request.prototype, "ticket", void 0);
    Request = __decorate([
        Entity_1.Entity()
    ], Request);
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=Request.js.map