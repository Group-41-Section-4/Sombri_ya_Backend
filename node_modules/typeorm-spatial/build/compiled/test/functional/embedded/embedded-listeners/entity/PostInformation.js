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
var PostCounter_1 = require("./PostCounter");
var BeforeInsert_1 = require("../../../../../src/decorator/listeners/BeforeInsert");
var Index_1 = require("../../../../../src/decorator/Index");
var PostInformation = /** @class */ (function () {
    function PostInformation() {
        this.counters = new PostCounter_1.PostCounter();
    }
    PostInformation.prototype.beforeInsert = function () {
        this.description = "default post description";
    };
    __decorate([
        Column_1.Column(),
        Index_1.Index(),
        __metadata("design:type", String)
    ], PostInformation.prototype, "description", void 0);
    __decorate([
        Column_1.Column(function (type) { return PostCounter_1.PostCounter; }, { prefix: "counters" }),
        __metadata("design:type", PostCounter_1.PostCounter)
    ], PostInformation.prototype, "counters", void 0);
    __decorate([
        BeforeInsert_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostInformation.prototype, "beforeInsert", null);
    return PostInformation;
}());
exports.PostInformation = PostInformation;
//# sourceMappingURL=PostInformation.js.map