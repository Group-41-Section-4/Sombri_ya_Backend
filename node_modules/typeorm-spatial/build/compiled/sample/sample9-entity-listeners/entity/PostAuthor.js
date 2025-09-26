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
var OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
var AfterRemove_1 = require("../../../src/decorator/listeners/AfterRemove");
var BeforeRemove_1 = require("../../../src/decorator/listeners/BeforeRemove");
var AfterUpdate_1 = require("../../../src/decorator/listeners/AfterUpdate");
var BeforeUpdate_1 = require("../../../src/decorator/listeners/BeforeUpdate");
var AfterInsert_1 = require("../../../src/decorator/listeners/AfterInsert");
var BeforeInsert_1 = require("../../../src/decorator/listeners/BeforeInsert");
var PostAuthor = /** @class */ (function () {
    function PostAuthor() {
    }
    PostAuthor.prototype.doSomethingBeforeInsertion = function () {
        console.log("event: PostAuthor entity will be inserted so soon...");
    };
    PostAuthor.prototype.doSomethingAfterInsertion = function () {
        console.log("event: PostAuthor entity has been inserted and callback executed");
    };
    PostAuthor.prototype.doSomethingBeforeUpdate = function () {
        console.log("event: PostAuthor entity will be updated so soon...");
    };
    PostAuthor.prototype.doSomethingAfterUpdate = function () {
        console.log("event: PostAuthor entity has been updated and callback executed");
    };
    PostAuthor.prototype.doSomethingBeforeRemove = function () {
        console.log("event: PostAuthor entity will be removed so soon...");
    };
    PostAuthor.prototype.doSomethingAfterRemove = function () {
        console.log("event: PostAuthor entity has been removed and callback executed");
    };
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostAuthor.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], PostAuthor.prototype, "name", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.author; }),
        __metadata("design:type", Array)
    ], PostAuthor.prototype, "posts", void 0);
    __decorate([
        BeforeInsert_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingBeforeInsertion", null);
    __decorate([
        AfterInsert_1.AfterInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingAfterInsertion", null);
    __decorate([
        BeforeUpdate_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingBeforeUpdate", null);
    __decorate([
        AfterUpdate_1.AfterUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingAfterUpdate", null);
    __decorate([
        BeforeRemove_1.BeforeRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingBeforeRemove", null);
    __decorate([
        AfterRemove_1.AfterRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostAuthor.prototype, "doSomethingAfterRemove", null);
    PostAuthor = __decorate([
        index_1.Entity("sample9_post_author")
    ], PostAuthor);
    return PostAuthor;
}());
exports.PostAuthor = PostAuthor;
//# sourceMappingURL=PostAuthor.js.map