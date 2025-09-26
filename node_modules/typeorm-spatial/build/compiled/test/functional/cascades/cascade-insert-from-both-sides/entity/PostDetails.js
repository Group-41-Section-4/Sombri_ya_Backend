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
var PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
var Post_1 = require("./Post");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var PostDetails = /** @class */ (function () {
    function PostDetails() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], PostDetails.prototype, "keyword", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Post_1.Post; }, function (post) { return post.details; }, {
            cascade: ["insert"]
        }),
        __metadata("design:type", Post_1.Post)
    ], PostDetails.prototype, "post", void 0);
    PostDetails = __decorate([
        Entity_1.Entity()
    ], PostDetails);
    return PostDetails;
}());
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map