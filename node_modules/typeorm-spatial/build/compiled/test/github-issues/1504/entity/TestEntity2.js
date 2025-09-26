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
var TestEntity1_1 = require("./TestEntity1");
var TestEntity3_1 = require("./TestEntity3");
var TestEntity2 = /** @class */ (function () {
    function TestEntity2() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], TestEntity2.prototype, "id", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], TestEntity2.prototype, "name", void 0);
    __decorate([
        src_1.OneToOne(function (t) { return TestEntity1_1.TestEntity1; }, function (a) { return a.Entity2; }),
        __metadata("design:type", TestEntity1_1.TestEntity1)
    ], TestEntity2.prototype, "Entity1", void 0);
    __decorate([
        src_1.OneToOne(function (t) { return TestEntity3_1.TestEntity3; }, function (a) { return a.Entity2; }),
        src_1.JoinColumn(),
        __metadata("design:type", TestEntity3_1.TestEntity3)
    ], TestEntity2.prototype, "Entity3", void 0);
    TestEntity2 = __decorate([
        src_1.Entity()
    ], TestEntity2);
    return TestEntity2;
}());
exports.TestEntity2 = TestEntity2;
//# sourceMappingURL=TestEntity2.js.map