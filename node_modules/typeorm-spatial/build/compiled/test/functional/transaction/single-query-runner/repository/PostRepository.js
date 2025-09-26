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
var AbstractRepository_1 = require("../../../../../src/repository/AbstractRepository");
var EntityRepository_1 = require("../../../../../src/decorator/EntityRepository");
var PostRepository = /** @class */ (function (_super) {
    __extends(PostRepository, _super);
    function PostRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostRepository.prototype.save = function (post) {
        return this.manager.save(post);
    };
    PostRepository.prototype.getManager = function () {
        return this.manager;
    };
    PostRepository = __decorate([
        EntityRepository_1.EntityRepository()
    ], PostRepository);
    return PostRepository;
}(AbstractRepository_1.AbstractRepository));
exports.PostRepository = PostRepository;
//# sourceMappingURL=PostRepository.js.map