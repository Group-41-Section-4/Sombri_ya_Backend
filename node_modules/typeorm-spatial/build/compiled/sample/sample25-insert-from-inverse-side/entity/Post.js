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
var Author_1 = require("./Author");
var ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
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
        ManyToOne_1.ManyToOne(function (type) { return Author_1.Author; }, function (author) { return author.posts; }),
        __metadata("design:type", Author_1.Author)
    ], Post.prototype, "author", void 0);
    Post = __decorate([
        index_1.Entity("sample25_post")
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map