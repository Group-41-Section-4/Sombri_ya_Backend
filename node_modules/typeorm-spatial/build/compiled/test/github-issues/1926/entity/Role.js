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
var index_1 = require("../../../../src/index");
var EventRole_1 = require("./EventRole");
var src_1 = require("../../../../src");
var Role = /** @class */ (function () {
    function Role() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], Role.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Role.prototype, "title", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return EventRole_1.EventRole; }, function (role) { return role.role; }),
        __metadata("design:type", Array)
    ], Role.prototype, "roles", void 0);
    Role = __decorate([
        index_1.Entity()
    ], Role);
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=Role.js.map