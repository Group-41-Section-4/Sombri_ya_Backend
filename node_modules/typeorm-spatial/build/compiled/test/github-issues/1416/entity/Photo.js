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
var index_1 = require("../../../../src/index");
var PhotoMetadata_1 = require("./PhotoMetadata");
var Author_1 = require("./Author");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        index_1.Column({
            length: 500,
        }),
        __metadata("design:type", String)
    ], Photo.prototype, "name", void 0);
    __decorate([
        index_1.Column("text"),
        __metadata("design:type", String)
    ], Photo.prototype, "description", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "filename", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", Boolean)
    ], Photo.prototype, "isPublished", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return Author_1.Author; }, function (author) { return author.photos; }),
        __metadata("design:type", Author_1.Author)
    ], Photo.prototype, "author", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return PhotoMetadata_1.PhotoMetadata; }, function (photoMetadata) { return photoMetadata.photo; }, { eager: true }),
        index_1.JoinColumn(),
        __metadata("design:type", PhotoMetadata_1.PhotoMetadata)
    ], Photo.prototype, "metadata", void 0);
    Photo = __decorate([
        index_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map