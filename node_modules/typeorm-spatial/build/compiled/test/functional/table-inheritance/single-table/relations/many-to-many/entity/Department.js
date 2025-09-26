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
var Column_1 = require("../../../../../../../src/decorator/columns/Column");
var Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
var Accountant_1 = require("./Accountant");
var Department = /** @class */ (function () {
    function Department() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Department.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Department.prototype, "name", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Accountant_1.Accountant; }, function (accountant) { return accountant.departments; }),
        __metadata("design:type", Array)
    ], Department.prototype, "accountants", void 0);
    Department = __decorate([
        Entity_1.Entity()
    ], Department);
    return Department;
}());
exports.Department = Department;
//# sourceMappingURL=Department.js.map