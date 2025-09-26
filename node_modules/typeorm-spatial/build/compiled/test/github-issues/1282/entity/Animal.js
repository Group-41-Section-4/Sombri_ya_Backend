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
var Category_1 = require("./Category");
var JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var Animal = /** @class */ (function () {
    function Animal() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Animal.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Animal.prototype, "name", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, { eager: true }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Animal.prototype, "categories", void 0);
    Animal = __decorate([
        index_1.Entity()
    ], Animal);
    return Animal;
}());
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map