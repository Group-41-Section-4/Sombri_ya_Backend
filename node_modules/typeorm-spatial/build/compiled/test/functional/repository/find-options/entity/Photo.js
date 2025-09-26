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
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var index_1 = require("../../../../../src/index");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var Category_1 = require("./Category");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        Column_1.Column({
            length: 500
        }),
        __metadata("design:type", String)
    ], Photo.prototype, "name", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "description", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "filename", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Photo.prototype, "views", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Boolean)
    ], Photo.prototype, "isPublished", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Category_1.Category; }),
        index_1.JoinTable(),
        __metadata("design:type", Array)
    ], Photo.prototype, "categories", void 0);
    Photo = __decorate([
        Entity_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map