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
var PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
var UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
var CreateDateColumn_1 = require("../../../../../src/decorator/columns/CreateDateColumn");
var VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
var PostEmbedded = /** @class */ (function () {
    function PostEmbedded() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], PostEmbedded.prototype, "secondId", void 0);
    __decorate([
        CreateDateColumn_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], PostEmbedded.prototype, "createDate", void 0);
    __decorate([
        UpdateDateColumn_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], PostEmbedded.prototype, "updateDate", void 0);
    __decorate([
        VersionColumn_1.VersionColumn(),
        __metadata("design:type", Number)
    ], PostEmbedded.prototype, "version", void 0);
    return PostEmbedded;
}());
exports.PostEmbedded = PostEmbedded;
//# sourceMappingURL=PostEmbedded.js.map