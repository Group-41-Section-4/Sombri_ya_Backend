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
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var TreeParent_1 = require("../../../../../src/decorator/tree/TreeParent");
var TreeChildren_1 = require("../../../../../src/decorator/tree/TreeChildren");
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var Tree_1 = require("../../../../../src/decorator/tree/Tree");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        TreeParent_1.TreeParent(),
        __metadata("design:type", Category)
    ], Category.prototype, "parentCategory", void 0);
    __decorate([
        TreeChildren_1.TreeChildren({ cascade: true }),
        __metadata("design:type", Array)
    ], Category.prototype, "childCategories", void 0);
    Category = __decorate([
        Entity_1.Entity(),
        Tree_1.Tree("materialized-path")
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map