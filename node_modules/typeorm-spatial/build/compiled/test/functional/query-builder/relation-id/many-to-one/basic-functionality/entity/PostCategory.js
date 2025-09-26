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
var Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
var ManyToOne_1 = require("../../../../../../../src/decorator/relations/ManyToOne");
var Post_1 = require("./Post");
var Category_1 = require("./Category");
var Image_1 = require("./Image");
var PostCategory = /** @class */ (function () {
    function PostCategory() {
    }
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Post_1.Post; }, function (post) { return post.categories; }, {
            primary: true
        }),
        __metadata("design:type", Post_1.Post)
    ], PostCategory.prototype, "post", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1.Category; }, function (category) { return category.posts; }, {
            primary: true
        }),
        __metadata("design:type", Category_1.Category)
    ], PostCategory.prototype, "category", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Image_1.Image; }),
        __metadata("design:type", Image_1.Image)
    ], PostCategory.prototype, "image", void 0);
    PostCategory = __decorate([
        Entity_1.Entity()
    ], PostCategory);
    return PostCategory;
}());
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map