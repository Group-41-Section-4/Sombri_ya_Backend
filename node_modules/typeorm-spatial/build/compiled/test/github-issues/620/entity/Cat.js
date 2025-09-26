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
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var Dog_1 = require("./Dog");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Cat = /** @class */ (function () {
    function Cat() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Cat.prototype, "id", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Dog_1.Dog; }, function (dog) { return dog.cats; }),
        __metadata("design:type", Dog_1.Dog)
    ], Cat.prototype, "dog", void 0);
    Cat = __decorate([
        index_1.Entity()
    ], Cat);
    return Cat;
}());
exports.Cat = Cat;
//# sourceMappingURL=Cat.js.map