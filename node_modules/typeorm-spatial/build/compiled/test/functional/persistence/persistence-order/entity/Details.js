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
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var Post_1 = require("./Post");
var Photo_1 = require("./Photo");
var JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
var Details = /** @class */ (function () {
    function Details() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Details.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Details.prototype, "title", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Post_1.Post; }, function (post) { return post.details; }),
        __metadata("design:type", Post_1.Post)
    ], Details.prototype, "post", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Photo_1.Photo; }, function (photo) { return photo.details; }, {
            nullable: false
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Photo_1.Photo)
    ], Details.prototype, "photo", void 0);
    Details = __decorate([
        Entity_1.Entity()
    ], Details);
    return Details;
}());
exports.Details = Details;
//# sourceMappingURL=Details.js.map