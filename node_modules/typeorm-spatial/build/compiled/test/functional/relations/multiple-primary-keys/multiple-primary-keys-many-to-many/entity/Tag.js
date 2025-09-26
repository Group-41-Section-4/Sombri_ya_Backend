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
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
var JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
var PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
var Category_1 = require("./Category");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var Tag = /** @class */ (function () {
    function Tag() {
    }
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Tag.prototype, "code", void 0);
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Tag.prototype, "title", void 0);
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Tag.prototype, "description", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.tags; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Tag.prototype, "categories", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.tagsWithOptions; }),
        JoinTable_1.JoinTable({
            name: "tag_categories",
            joinColumns: [{
                    name: "tagTitle",
                    referencedColumnName: "title"
                }, {
                    name: "tagDescription",
                    referencedColumnName: "description"
                }],
            inverseJoinColumns: [{
                    name: "categoryName",
                    referencedColumnName: "name"
                }, {
                    name: "categoryType",
                    referencedColumnName: "type"
                }]
        }),
        __metadata("design:type", Array)
    ], Tag.prototype, "categoriesWithOptions", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }, function (category) { return category.tagsWithNonPKColumns; }),
        JoinTable_1.JoinTable({
            name: "tag_categories_non_primary",
            joinColumns: [{
                    name: "tagTitle",
                    referencedColumnName: "title"
                }, {
                    name: "tagDescription",
                    referencedColumnName: "description"
                }],
            inverseJoinColumns: [{
                    name: "categoryCode",
                    referencedColumnName: "code"
                }, {
                    name: "categoryVersion",
                    referencedColumnName: "version"
                }, {
                    name: "categoryDescription",
                    referencedColumnName: "description"
                }]
        }),
        __metadata("design:type", Array)
    ], Tag.prototype, "categoriesWithNonPKColumns", void 0);
    Tag = __decorate([
        Entity_1.Entity()
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map