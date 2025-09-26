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
var PostCategory_1 = require("./PostCategory");
var PostAuthor_1 = require("./PostAuthor");
var ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
var AfterLoad_1 = require("../../../src/decorator/listeners/AfterLoad");
var AfterInsert_1 = require("../../../src/decorator/listeners/AfterInsert");
var BeforeInsert_1 = require("../../../src/decorator/listeners/BeforeInsert");
var BeforeUpdate_1 = require("../../../src/decorator/listeners/BeforeUpdate");
var AfterUpdate_1 = require("../../../src/decorator/listeners/AfterUpdate");
var BeforeRemove_1 = require("../../../src/decorator/listeners/BeforeRemove");
var AfterRemove_1 = require("../../../src/decorator/listeners/AfterRemove");
var JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
var Post = /** @class */ (function () {
    function Post() {
        this.categories = [];
    }
    Post.prototype.generateRandomNumbers = function () {
        console.log("event: Post \"" + this.title + "\" entity has been loaded and callback executed");
        this.uid = Math.ceil(Math.random() * 1000);
    };
    Post.prototype.doSomethingBeforeInsertion = function () {
        console.log("event: Post entity will be inserted so soon...");
    };
    Post.prototype.doSomethingAfterInsertion = function () {
        console.log("event: Post entity has been inserted and callback executed");
    };
    Post.prototype.doSomethingBeforeUpdate = function () {
        console.log("event: Post entity will be updated so soon...");
    };
    Post.prototype.doSomethingAfterUpdate = function () {
        console.log("event: Post entity has been updated and callback executed");
    };
    Post.prototype.doSomethingBeforeRemove = function () {
        console.log("event: Post entity will be removed so soon...");
    };
    Post.prototype.doSomethingAfterRemove = function () {
        console.log("event: Post entity has been removed and callback executed");
    };
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return PostAuthor_1.PostAuthor; }, function (post) { return post.posts; }, {
            cascade: true
        }),
        __metadata("design:type", PostAuthor_1.PostAuthor)
    ], Post.prototype, "author", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return PostCategory_1.PostCategory; }, function (category) { return category.posts; }, {
            cascade: true
        }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Post.prototype, "categories", void 0);
    __decorate([
        AfterLoad_1.AfterLoad(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "generateRandomNumbers", null);
    __decorate([
        BeforeInsert_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingBeforeInsertion", null);
    __decorate([
        AfterInsert_1.AfterInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingAfterInsertion", null);
    __decorate([
        BeforeUpdate_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingBeforeUpdate", null);
    __decorate([
        AfterUpdate_1.AfterUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingAfterUpdate", null);
    __decorate([
        BeforeRemove_1.BeforeRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingBeforeRemove", null);
    __decorate([
        AfterRemove_1.AfterRemove(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Post.prototype, "doSomethingAfterRemove", null);
    Post = __decorate([
        index_1.Entity("sample9_post")
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map