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
var Unique_1 = require("../../../../src/decorator/Unique");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Index_1 = require("../../../../src/decorator/Index");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "name", void 0);
    __decorate([
        Column_1.Column(),
        Index_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], Photo.prototype, "tag", void 0);
    __decorate([
        Column_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Photo.prototype, "description", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "text", void 0);
    Photo = __decorate([
        Entity_1.Entity(),
        Unique_1.Unique(["name"]),
        Index_1.Index(["text"], { unique: true })
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map