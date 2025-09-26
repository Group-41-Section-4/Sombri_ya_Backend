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
var VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
var UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
var PostWithVersionAndUpdatedDate = /** @class */ (function () {
    function PostWithVersionAndUpdatedDate() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostWithVersionAndUpdatedDate.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PostWithVersionAndUpdatedDate.prototype, "title", void 0);
    __decorate([
        VersionColumn_1.VersionColumn(),
        __metadata("design:type", Number)
    ], PostWithVersionAndUpdatedDate.prototype, "version", void 0);
    __decorate([
        UpdateDateColumn_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], PostWithVersionAndUpdatedDate.prototype, "updateDate", void 0);
    PostWithVersionAndUpdatedDate = __decorate([
        Entity_1.Entity("post_with_v_ud")
    ], PostWithVersionAndUpdatedDate);
    return PostWithVersionAndUpdatedDate;
}());
exports.PostWithVersionAndUpdatedDate = PostWithVersionAndUpdatedDate;
//# sourceMappingURL=PostWithVersionAndUpdatedDate.js.map