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
var PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
var Post_1 = require("./Post");
var src_1 = require("../../../../../../src");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Category.prototype, "type", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Category.prototype, "code", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Category.prototype, "version", void 0);
    __decorate([
        Column_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Category.prototype, "description", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.category; }),
        __metadata("design:type", Array)
    ], Category.prototype, "posts", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.categoryWithJoinColumn; }),
        __metadata("design:type", Array)
    ], Category.prototype, "postsWithJoinColumn", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.categoryWithOptions; }),
        __metadata("design:type", Array)
    ], Category.prototype, "postsWithOptions", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.categoryWithNonPKColumns; }),
        __metadata("design:type", Array)
    ], Category.prototype, "postsWithNonPKColumns", void 0);
    Category = __decorate([
        Entity_1.Entity(),
        src_1.Unique(["code", "version", "description"])
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map