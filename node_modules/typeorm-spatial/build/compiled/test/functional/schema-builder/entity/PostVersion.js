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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var src_1 = require("../../../../src");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Post_1 = require("./Post");
var PostVersion = /** @class */ (function () {
    function PostVersion() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], PostVersion.prototype, "id", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Post_1.Post; }),
        src_1.JoinColumn({ referencedColumnName: "version" }),
        __metadata("design:type", Post_1.Post)
    ], PostVersion.prototype, "post", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PostVersion.prototype, "details", void 0);
    PostVersion = __decorate([
        Entity_1.Entity()
    ], PostVersion);
    return PostVersion;
}());
exports.PostVersion = PostVersion;
//# sourceMappingURL=PostVersion.js.map