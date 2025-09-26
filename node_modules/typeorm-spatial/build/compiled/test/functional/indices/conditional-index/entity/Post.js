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
var src_1 = require("../../../../../src");
var Index_1 = require("../../../../../src/decorator/Index");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "name", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    __decorate([
        Index_1.Index({ where: "\"version\" IS NOT NULL AND \"version\" > 0" }),
        src_1.Column(),
        __metadata("design:type", Number)
    ], Post.prototype, "version", void 0);
    Post = __decorate([
        Index_1.Index(["name", "text"], { where: "\"name\" IS NOT NULL AND \"text\" IS NOT NULL" }),
        src_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map