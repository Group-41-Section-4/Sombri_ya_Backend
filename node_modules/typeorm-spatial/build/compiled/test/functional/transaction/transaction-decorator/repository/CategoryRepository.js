"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Repository_1 = require("../../../../../src/repository/Repository");
var EntityRepository_1 = require("../../../../../src/decorator/EntityRepository");
var Category_1 = require("../entity/Category");
var CategoryRepository = /** @class */ (function (_super) {
    __extends(CategoryRepository, _super);
    function CategoryRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryRepository.prototype.findByName = function (name) {
        return this.findOne({ name: name });
    };
    CategoryRepository = __decorate([
        EntityRepository_1.EntityRepository(Category_1.Category)
    ], CategoryRepository);
    return CategoryRepository;
}(Repository_1.Repository));
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map