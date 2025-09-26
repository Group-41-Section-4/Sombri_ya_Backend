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
var Column_1 = require("../../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
var JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
var Category_1 = require("./Category");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var Tag_1 = require("./Tag");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        Column_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Post.prototype, "categoryName", void 0);
    __decorate([
        Column_1.Column({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Post.prototype, "categoryId", void 0);
    __decorate([
        Column_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Post.prototype, "tagName", void 0);
    __decorate([
        Column_1.Column({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Post.prototype, "tagId", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Category_1.Category)
    ], Post.prototype, "categoryWithEmptyJoinCol", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        JoinColumn_1.JoinColumn({ name: "categoryId" }),
        __metadata("design:type", Category_1.Category)
    ], Post.prototype, "categoryWithoutRefColName", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        JoinColumn_1.JoinColumn({ referencedColumnName: "name" }),
        __metadata("design:type", Category_1.Category)
    ], Post.prototype, "categoryWithoutColName", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        JoinColumn_1.JoinColumn({ name: "categoryIdentifier" }),
        __metadata("design:type", Category_1.Category)
    ], Post.prototype, "categoryWithoutRefColName2", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }),
        JoinColumn_1.JoinColumn({ name: "categoryName", referencedColumnName: "name" }),
        __metadata("design:type", Category_1.Category)
    ], Post.prototype, "category", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Tag_1.Tag; }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Tag_1.Tag)
    ], Post.prototype, "tagWithEmptyJoinCol", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Tag_1.Tag; }),
        JoinColumn_1.JoinColumn({ name: "tagId" }),
        __metadata("design:type", Tag_1.Tag)
    ], Post.prototype, "tagWithoutRefColName", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Tag_1.Tag; }),
        JoinColumn_1.JoinColumn({ referencedColumnName: "name" }),
        __metadata("design:type", Tag_1.Tag)
    ], Post.prototype, "tagWithoutColName", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Tag_1.Tag; }),
        JoinColumn_1.JoinColumn({ name: "tagIdentifier" }),
        __metadata("design:type", Tag_1.Tag)
    ], Post.prototype, "tagWithoutRefColName2", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Tag_1.Tag; }),
        JoinColumn_1.JoinColumn({ name: "tagName", referencedColumnName: "name" }),
        __metadata("design:type", Tag_1.Tag)
    ], Post.prototype, "tag", void 0);
    Post = __decorate([
        Entity_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map