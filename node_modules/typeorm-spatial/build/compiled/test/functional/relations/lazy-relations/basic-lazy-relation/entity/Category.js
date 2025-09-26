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
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
var OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
var OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
var Post_1 = require("./Post");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Post_1.Post; }, function (post) { return post.oneCategory; }),
        __metadata("design:type", Promise)
    ], Category.prototype, "onePost", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Post_1.Post; }, function (post) { return post.twoSideCategories; }),
        __metadata("design:type", Promise)
    ], Category.prototype, "twoSidePosts", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.twoSideCategory; }),
        __metadata("design:type", Promise)
    ], Category.prototype, "twoSidePosts2", void 0);
    Category = __decorate([
        Entity_1.Entity()
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map