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
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var Post_1 = require("./Post");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
var Details_1 = require("./Details");
var Category_1 = require("./Category");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "name", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Details_1.Details; }, function (details) { return details.photo; }),
        __metadata("design:type", Details_1.Details)
    ], Photo.prototype, "details", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Post_1.Post; }, function (post) { return post.photo; }, {
            nullable: false
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Post_1.Post)
    ], Photo.prototype, "post", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, {
            nullable: false
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Category_1.Category)
    ], Photo.prototype, "category", void 0);
    Photo = __decorate([
        Entity_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map