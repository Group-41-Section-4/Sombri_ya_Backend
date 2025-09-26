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
var EntityRepository_1 = require("../../../src/decorator/EntityRepository");
var AbstractRepository_1 = require("../../../src/repository/AbstractRepository");
var Author_1 = require("../entity/Author");
/**
 * First type of custom repository - extends abstract repository.
 */
var AuthorRepository = /** @class */ (function (_super) {
    __extends(AuthorRepository, _super);
    function AuthorRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthorRepository.prototype.createAndSave = function (firstName, lastName) {
        var author = new Author_1.Author();
        author.firstName = firstName;
        author.lastName = lastName;
        return this.manager.save(author);
    };
    AuthorRepository.prototype.findMyAuthor = function () {
        return this
            .createQueryBuilder("author")
            .getOne();
    };
    AuthorRepository = __decorate([
        EntityRepository_1.EntityRepository(Author_1.Author)
    ], AuthorRepository);
    return AuthorRepository;
}(AbstractRepository_1.AbstractRepository));
exports.AuthorRepository = AuthorRepository;
//# sourceMappingURL=AuthorRepository.js.map