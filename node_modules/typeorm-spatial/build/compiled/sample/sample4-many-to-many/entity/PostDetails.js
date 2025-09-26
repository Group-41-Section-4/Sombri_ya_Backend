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
var PostDetails = /** @class */ (function () {
    function PostDetails() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostDetails.prototype, "id", void 0);
    __decorate([
        index_1.Column({
            type: String,
            nullable: true
        }),
        __metadata("design:type", Object)
    ], PostDetails.prototype, "authorName", void 0);
    __decorate([
        index_1.Column({
            type: String,
            nullable: true
        }),
        __metadata("design:type", Object)
    ], PostDetails.prototype, "comment", void 0);
    __decorate([
        index_1.Column({
            type: String,
            nullable: true
        }),
        __metadata("design:type", Object)
    ], PostDetails.prototype, "metadata", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Post_1.Post; }, function (post) { return post.details; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], PostDetails.prototype, "posts", void 0);
    PostDetails = __decorate([
        index_1.Entity("sample4_post_details")
    ], PostDetails);
    return PostDetails;
}());
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map