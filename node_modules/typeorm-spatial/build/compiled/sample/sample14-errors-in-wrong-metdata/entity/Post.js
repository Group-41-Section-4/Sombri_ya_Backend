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
var PostAuthor_1 = require("./PostAuthor");
var JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
var OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
var JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
var ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
var Post = /** @class */ (function () {
    function Post() {
    }
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
        index_1.OneToOne(function (type) { return PostAuthor_1.PostAuthor; }, function (author) { return author.post; }, {
            cascade: true
        }),
        JoinColumn_1.JoinColumn() // comment this and you'll get an error because JoinColumn must be at least on one side of the one-to-one relationship
        // @JoinTable() // uncomment this and you'll get an error because JoinTable is not allowed here (only many-to-many)
        ,
        __metadata("design:type", PostAuthor_1.PostAuthor)
    ], Post.prototype, "author", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return PostAuthor_1.PostAuthor; }, function (author) { return author.editedPost; }, {
            cascade: true
        })
        // @JoinColumn() // uncomment this and you'll get an error, because JoinColumn is not allowed here (only many-to-one/one-to-one)
        // @JoinTable() // uncomment this and you'll get an error because JoinTable is not allowed here (only many-to-many)
        ,
        __metadata("design:type", Array)
    ], Post.prototype, "editors", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return PostAuthor_1.PostAuthor; }, function (author) { return author.manyPosts; }),
        JoinTable_1.JoinTable() // comment this and you'll get an error because JoinTable must be at least on one side of the many-to-many relationship
        ,
        __metadata("design:type", Array)
    ], Post.prototype, "manyAuthors", void 0);
    Post = __decorate([
        index_1.Entity("sample14_post")
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map