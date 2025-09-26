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
var Event_1 = require("./Event");
var Role_1 = require("./Role");
var EventRole = /** @class */ (function () {
    function EventRole() {
    }
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], EventRole.prototype, "eventId", void 0);
    __decorate([
        src_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], EventRole.prototype, "roleId", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], EventRole.prototype, "description", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], EventRole.prototype, "compensation", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return Role_1.Role; }, function (role) { return role.roles; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Role_1.Role)
    ], EventRole.prototype, "role", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return Event_1.Event; }, function (event) { return event.roles; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Event_1.Event)
    ], EventRole.prototype, "event", void 0);
    EventRole = __decorate([
        src_1.Entity()
    ], EventRole);
    return EventRole;
}());
exports.EventRole = EventRole;
//# sourceMappingURL=EventRole.js.map