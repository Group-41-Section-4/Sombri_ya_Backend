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
var ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
var OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
var OneToOne_1 = require("../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
var JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
var Category = /** @class */ (function () {
    function Category() {
        this.oneManyCategories = [];
        this.manyCategories = [];
        this.manyInverseCategories = [];
    }
    Category_1 = Category;
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1; }, function (category) { return category.oneInverseCategory; }, {
            cascade: true
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Category)
    ], Category.prototype, "oneCategory", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1; }, function (category) { return category.oneCategory; }, {
            cascade: true
        }),
        __metadata("design:type", Category)
    ], Category.prototype, "oneInverseCategory", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Category_1; }, function (category) { return category.oneManyCategories; }, {
            cascade: true
        }),
        __metadata("design:type", Category)
    ], Category.prototype, "oneManyCategory", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Category_1; }, function (category) { return category.oneManyCategory; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], Category.prototype, "oneManyCategories", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Category_1; }, function (category) { return category.manyInverseCategories; }, {
            cascade: true
        }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Category.prototype, "manyCategories", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Category_1; }, function (category) { return category.manyCategories; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], Category.prototype, "manyInverseCategories", void 0);
    Category = Category_1 = __decorate([
        index_1.Entity("sample8_category")
    ], Category);
    return Category;
    var Category_1;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map