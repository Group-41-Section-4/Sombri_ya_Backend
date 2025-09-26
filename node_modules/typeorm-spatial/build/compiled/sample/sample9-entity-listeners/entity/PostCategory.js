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
var index_1 = require("../../../src/index");
var Post_1 = require("./Post");
var ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
var AfterRemove_1 = require("../../../src/decorator/listeners/AfterRemove");
var BeforeRemove_1 = require("../../../src/decorator/listeners/BeforeRemove");
var AfterUpdate_1 = require("../../../src/decorator/listeners/AfterUpdate");
var BeforeUpdate_1 = require("../../../src/decorator/listeners/BeforeUpdate");
var AfterInsert_1 = require("../../../src/decorator/listeners/AfterInsert");
var BeforeInsert_1 = require("../../../src/decorator/listeners/BeforeInsert");
var PostCategory = /** @class */ (function () {
    function PostCategory() {
        this.posts = [];
    }
    PostCategory.prototype.doSomethingBeforeInsertion = function () {
        console.log("event: PostCategory \"" + this.name + "\" will be inserted so soon...");
    };
    PostCategory.prototype.doSomethingAfterInsertion = function () {
        console.log("event: PostCategory \"" + this.name + "\" has been inserted and callback executed");
    };
    PostCategory.prototype.doSomethingBeforeUpdate = function () {
        console.log("event: PostCategory \"" + this.name + "\" will be updated so soon...");
    };
    PostCategory.prototype.doSomethingAfterUpdate = function () {
        console.log("event: PostCategory \"" + this.name + "\" has been updated and callback executed");
    };
    PostCategory.prototype.doSomethingBeforeRemove = function () {
        console.log("event: PostCategory \"" + this.name + "\" will be removed so soon...");
    };
    PostCategory.prototype.doSomethingAfterRemove = function () {
        console.log("event: PostCategory \"" + this.name + "\" has been removed and callback executed");
    };
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostCategory.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], PostCategory.prototype, "name", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Post_1.Post; }, function (post) { return post.categories; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], PostCategory.prototype, "posts", void 0);
    __decorate([
        BeforeInsert_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingBeforeInsertion", null);
    __decorate([
        AfterInsert_1.AfterInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingAfterInsertion", null);
    __decorate([
        BeforeUpdate_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingBeforeUpdate", null);
    __decorate([
        AfterUpdate_1.AfterUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingAfterUpdate", null);
    __decorate([
        BeforeRemove_1.BeforeRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingBeforeRemove", null);
    __decorate([
        AfterRemove_1.AfterRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostCategory.prototype, "doSomethingAfterRemove", null);
    PostCategory = __decorate([
        index_1.Entity("sample9_post_category")
    ], PostCategory);
    return PostCategory;
}());
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map