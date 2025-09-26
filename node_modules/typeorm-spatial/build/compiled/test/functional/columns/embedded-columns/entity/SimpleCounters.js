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
var Column_1 = require("../../../../../src/decorator/columns/Column");
var Information_1 = require("./Information");
var SimpleCounters = /** @class */ (function () {
    function SimpleCounters() {
    }
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], SimpleCounters.prototype, "likes", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], SimpleCounters.prototype, "comments", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], SimpleCounters.prototype, "favorites", void 0);
    __decorate([
        Column_1.Column(function (type) { return Information_1.Information; }, { prefix: "info" }),
        __metadata("design:type", Information_1.Information)
    ], SimpleCounters.prototype, "information", void 0);
    return SimpleCounters;
}());
exports.SimpleCounters = SimpleCounters;
//# sourceMappingURL=SimpleCounters.js.map