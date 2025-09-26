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
var PostCategory = /** @class */ (function () {
    function PostCategory() {
        this.posts = [];
    }
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
    PostCategory = __decorate([
        index_1.Entity("sample6_post_category")
    ], PostCategory);
    return PostCategory;
}());
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map