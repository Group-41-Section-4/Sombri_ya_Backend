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
var ImageDetails_1 = require("./ImageDetails");
var JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
var Image = /** @class */ (function () {
    function Image() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Image.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Image.prototype, "name", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return Post_1.Post; }, function (post) { return post.images; }),
        __metadata("design:type", Post_1.Post)
    ], Image.prototype, "post", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return Post_1.Post; }, function (post) { return post.secondaryImages; }, {
            cascade: ["insert"]
        }),
        __metadata("design:type", Post_1.Post)
    ], Image.prototype, "secondaryPost", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return ImageDetails_1.ImageDetails; }, function (details) { return details.image; }, {
            cascade: true
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", ImageDetails_1.ImageDetails)
    ], Image.prototype, "details", void 0);
    Image = __decorate([
        index_1.Entity("sample10_image")
    ], Image);
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=Image.js.map