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
var src_1 = require("../../../../src");
var JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
var Category_1 = require("./Category");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        src_1.PrimaryColumn({ collation: "utf8_unicode_ci", charset: "utf8" }),
        __metadata("design:type", String)
    ], Post.prototype, "id", void 0);
    __decorate([
        src_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.posts; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Post.prototype, "categories", void 0);
    Post = __decorate([
        src_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map