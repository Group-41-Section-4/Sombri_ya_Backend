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
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Parent_1 = require("./Parent");
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var Child = /** @class */ (function () {
    function Child() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Child.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Child.prototype, "name", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (target) { return Parent_1.Parent; }, function (parent) { return parent.id; }, { lazy: true }),
        __metadata("design:type", Object)
    ], Child.prototype, "parent", void 0);
    Child = __decorate([
        Entity_1.Entity()
    ], Child);
    return Child;
}());
exports.Child = Child;
//# sourceMappingURL=Child.js.map