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
var JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
var ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
var OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
var Category_1 = require("./Category");
var Post = /** @class */ (function () {
    function Post() {
        this.viewCount = 0;
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn({
            name: "s_post_id"
        }),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Promise)
    ], Post.prototype, "categories", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.twoSidePosts; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Promise)
    ], Post.prototype, "twoSideCategories", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Post.prototype, "viewCount", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        __metadata("design:type", Promise)
    ], Post.prototype, "category", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.onePost; }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Promise)
    ], Post.prototype, "oneCategory", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }, function (category) { return category.twoSidePosts2; }),
        __metadata("design:type", Promise)
    ], Post.prototype, "twoSideCategory", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.postsNamedAll; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Promise)
    ], Post.prototype, "categoriesNamedAll", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }, function (category) { return category.onePostsNamedAll; }),
        JoinColumn_1.JoinColumn({
            name: "s_category_named_all_id"
        }),
        __metadata("design:type", Promise)
    ], Post.prototype, "categoryNamedAll", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.onePostNamedAll; }),
        JoinColumn_1.JoinColumn({
            name: "s_one_category_named_all_id"
        }),
        __metadata("design:type", Promise)
    ], Post.prototype, "oneCategoryNamedAll", void 0);
    Post = __decorate([
        Entity_1.Entity("s_post_named_all", {
            orderBy: {
                title: "ASC",
                id: "DESC",
            }
        })
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map