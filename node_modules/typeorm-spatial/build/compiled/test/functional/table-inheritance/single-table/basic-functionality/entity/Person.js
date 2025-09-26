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
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var TableInheritance_1 = require("../../../../../../src/decorator/entity/TableInheritance");
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Person = /** @class */ (function () {
    function Person() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Person.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Person.prototype, "name", void 0);
    Person = __decorate([
        Entity_1.Entity(),
        TableInheritance_1.TableInheritance({ column: { name: "type", type: "varchar" } })
    ], Person);
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=Person.js.map