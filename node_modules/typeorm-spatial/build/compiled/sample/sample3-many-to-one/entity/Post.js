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
var PostDetails_1 = require("./PostDetails");
var PostCategory_1 = require("./PostCategory");
var PostAuthor_1 = require("./PostAuthor");
var PostInformation_1 = require("./PostInformation");
var PostImage_1 = require("./PostImage");
var PostMetadata_1 = require("./PostMetadata");
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
        index_1.ManyToOne(function (type) { return PostCategory_1.PostCategory; }, {
            cascade: true
        }),
        __metadata("design:type", PostCategory_1.PostCategory)
    ], Post.prototype, "category", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return PostDetails_1.PostDetails; }, function (details) { return details.posts; }, {
            cascade: ["insert"]
        }),
        __metadata("design:type", PostDetails_1.PostDetails)
    ], Post.prototype, "details", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return PostImage_1.PostImage; }, function (image) { return image.posts; }, {
            cascade: ["update"]
        }),
        __metadata("design:type", PostImage_1.PostImage)
    ], Post.prototype, "image", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return PostMetadata_1.PostMetadata; }, function (metadata) { return metadata.posts; }),
        __metadata("design:type", Object)
    ], Post.prototype, "metadata", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return PostInformation_1.PostInformation; }, function (information) { return information.posts; }, {
            cascade: true
        }),
        __metadata("design:type", PostInformation_1.PostInformation)
    ], Post.prototype, "information", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return PostAuthor_1.PostAuthor; }, function (author) { return author.posts; }),
        __metadata("design:type", PostAuthor_1.PostAuthor)
    ], Post.prototype, "author", void 0);
    Post = __decorate([
        index_1.Entity("sample3_post")
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map