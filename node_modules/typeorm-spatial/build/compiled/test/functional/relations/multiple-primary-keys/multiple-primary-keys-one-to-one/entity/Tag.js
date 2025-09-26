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
var PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
var Category_1 = require("./Category");
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
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.tag; }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Category_1.Category)
    ], Tag.prototype, "category", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.tagWithOptions; }),
        JoinColumn_1.JoinColumn([
            { name: "category_name", referencedColumnName: "name" },
            { name: "category_type", referencedColumnName: "type" }
        ]),
        __metadata("design:type", Category_1.Category)
    ], Tag.prototype, "categoryWithOptions", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.tagWithNonPKColumns; }),
        JoinColumn_1.JoinColumn([
            { name: "category_code", referencedColumnName: "code" },
            { name: "category_version", referencedColumnName: "version" },
            { name: "category_description", referencedColumnName: "description" }
        ]),
        __metadata("design:type", Category_1.Category)
    ], Tag.prototype, "categoryWithNonPKColumns", void 0);
    Tag = __decorate([
        Entity_1.Entity()
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map