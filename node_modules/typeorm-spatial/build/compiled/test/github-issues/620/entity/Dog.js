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
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
var Cat_1 = require("./Cat");
var Dog = /** @class */ (function () {
    function Dog() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Dog.prototype, "DogID", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Cat_1.Cat; }, function (cat) { return cat.dog; }),
        __metadata("design:type", Array)
    ], Dog.prototype, "cats", void 0);
    Dog = __decorate([
        index_1.Entity()
    ], Dog);
    return Dog;
}());
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map