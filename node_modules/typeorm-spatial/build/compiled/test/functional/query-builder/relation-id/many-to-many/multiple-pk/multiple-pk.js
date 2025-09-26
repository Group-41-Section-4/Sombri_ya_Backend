"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var Image_1 = require("./entity/Image");
describe("query builder > relation-id > many-to-many > multiple-pk", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("owner side", function () {
        it("should load ids when both entities have multiple primary keys", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var category1, category2, category3, category4, post1, post2, loadedPosts, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 1:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 2;
                        category2.name = "BMW";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 2:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 1;
                        category3.name = "airplanes";
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 3:
                        _a.sent();
                        category4 = new Category_1.Category();
                        category4.id = 4;
                        category4.code = 2;
                        category4.name = "Boeing";
                        return [4 /*yield*/, connection.manager.save(category4)];
                    case 4:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        post1.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 5:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.title = "About Boeing";
                        post2.categories = [category3, category4];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories")
                                .getMany()];
                    case 7:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPosts[0].categoryIds[1]).to.be.eql({ id: 2, code: 2 });
                        chai_1.expect(loadedPosts[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categoryIds[0]).to.be.eql({ id: 3, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds[1]).to.be.eql({ id: 4, code: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories")
                                .where("post.id = :id", { id: 1 })
                                .andWhere("post.authorId = :authorId", { authorId: 1 })
                                .getOne()];
                    case 8:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPost.categoryIds[1]).to.be.eql({ id: 2, code: 2 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when only one entity have multiple primary key", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var image1, image2, image3, image4, category1, category2, loadedCategories, loadedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image1 = new Image_1.Image();
                        image1.name = "Image #1";
                        return [4 /*yield*/, connection.manager.save(image1)];
                    case 1:
                        _a.sent();
                        image2 = new Image_1.Image();
                        image2.name = "Image #2";
                        return [4 /*yield*/, connection.manager.save(image2)];
                    case 2:
                        _a.sent();
                        image3 = new Image_1.Image();
                        image3.name = "Image #3";
                        return [4 /*yield*/, connection.manager.save(image3)];
                    case 3:
                        _a.sent();
                        image4 = new Image_1.Image();
                        image4.name = "Image #4";
                        return [4 /*yield*/, connection.manager.save(image4)];
                    case 4:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        category1.images = [image1, image2];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 5:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 2;
                        category2.name = "airplanes";
                        category2.images = [image3, image4];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.imageIds", "category.images")
                                .getMany()];
                    case 7:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].imageIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].imageIds[0]).to.be.equal(1);
                        chai_1.expect(loadedCategories[0].imageIds[1]).to.be.equal(2);
                        chai_1.expect(loadedCategories[1].imageIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[1].imageIds[0]).to.be.equal(3);
                        chai_1.expect(loadedCategories[1].imageIds[1]).to.be.equal(4);
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.imageIds", "category.images")
                                .where("category.id = :id", { id: 1 })
                                .andWhere("category.code = :code", { code: 1 })
                                .getOne()];
                    case 8:
                        loadedCategory = _a.sent();
                        chai_1.expect(loadedCategory.imageIds).to.not.be.empty;
                        chai_1.expect(loadedCategory.imageIds[0]).to.be.equal(1);
                        chai_1.expect(loadedCategory.imageIds[1]).to.be.equal(2);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when both entities have multiple primary keys and additional condition used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var category1, category2, category3, category4, post1, post2, loadedPosts, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 1:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.isRemoved = true;
                        category2.name = "BMW";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 2:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 1;
                        category3.name = "airplanes";
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 3:
                        _a.sent();
                        category4 = new Category_1.Category();
                        category4.id = 4;
                        category4.code = 2;
                        category4.isRemoved = true;
                        category4.name = "Boeing";
                        return [4 /*yield*/, connection.manager.save(category4)];
                    case 4:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        post1.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 5:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.title = "About Boeing";
                        post2.categories = [category3, category4];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", function (qb) { return qb.andWhere("category.id = :id AND category.code = :code", { id: 1, code: 1 }); })
                                .getMany()];
                    case 7:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds).to.be.empty;
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", function (qb) { return qb.andWhere("category.code = :code", { code: 1 }); })
                                .getMany()];
                    case 8:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPosts[0].categoryIds[1]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categoryIds[0]).to.be.eql({ id: 3, code: 1 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", function (qb) { return qb.andWhere("category.isRemoved = :isRemoved", { isRemoved: true }); })
                                .getMany()];
                    case 9:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categoryIds[0]).to.be.eql({ id: 4, code: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", function (qb) { return qb.andWhere("category.isRemoved = :isRemoved", { isRemoved: true }); })
                                .where("post.id = :id", { id: 1 })
                                .andWhere("post.authorId = :authorId", { authorId: 1 })
                                .getOne()];
                    case 10:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categoryIds[0]).to.be.eql({ id: 2, code: 1 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when both entities have multiple primary keys and related entity does not have inverse side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var category1, category2, category3, category4, post1, post2, loadedPosts, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 1:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 2;
                        category2.name = "BMW";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 2:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 1;
                        category3.name = "airplanes";
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 3:
                        _a.sent();
                        category4 = new Category_1.Category();
                        category4.id = 4;
                        category4.code = 2;
                        category4.name = "Boeing";
                        return [4 /*yield*/, connection.manager.save(category4)];
                    case 4:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        post1.subcategories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 5:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.title = "About Boeing";
                        post2.subcategories = [category3, category4];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.subcategories")
                                .getMany()];
                    case 7:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPosts[0].categoryIds[1]).to.be.eql({ id: 2, code: 2 });
                        chai_1.expect(loadedPosts[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categoryIds[0]).to.be.eql({ id: 3, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds[1]).to.be.eql({ id: 4, code: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.subcategories")
                                .where("post.id = :id", { id: 1 })
                                .andWhere("post.authorId = :authorId", { authorId: 1 })
                                .getOne()];
                    case 8:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPost.categoryIds[1]).to.be.eql({ id: 2, code: 2 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when loadRelationIdAndMap used on nested relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var image1, image2, image3, image4, image5, category1, category2, category3, post1, post2, loadedPosts, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image1 = new Image_1.Image();
                        image1.name = "Image #1";
                        return [4 /*yield*/, connection.manager.save(image1)];
                    case 1:
                        _a.sent();
                        image2 = new Image_1.Image();
                        image2.name = "Image #2";
                        return [4 /*yield*/, connection.manager.save(image2)];
                    case 2:
                        _a.sent();
                        image3 = new Image_1.Image();
                        image3.name = "Image #3";
                        return [4 /*yield*/, connection.manager.save(image3)];
                    case 3:
                        _a.sent();
                        image4 = new Image_1.Image();
                        image4.name = "Image #4";
                        return [4 /*yield*/, connection.manager.save(image4)];
                    case 4:
                        _a.sent();
                        image5 = new Image_1.Image();
                        image5.name = "Image #5";
                        return [4 /*yield*/, connection.manager.save(image5)];
                    case 5:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        category1.images = [image1, image2, image3];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 6:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.name = "airplanes";
                        category2.images = [image4, image5];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 7:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 2;
                        category3.name = "Boeing";
                        category3.images = [image5];
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 8:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        post1.categories = [category1];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 9:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.title = "About Boeing";
                        post2.categories = [category2, category3];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories")
                                .leftJoinAndSelect("post.categories", "category")
                                .loadRelationIdAndMap("category.imageIds", "category.images")
                                .getMany()];
                    case 11:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categoryIds.length).to.be.equal(1);
                        chai_1.expect(loadedPosts[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPosts[0].categories).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categories[0].imageIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[0].categories[0].imageIds.length).to.be.equal(3);
                        chai_1.expect(loadedPosts[0].categories[0].imageIds[0]).to.be.equal(1);
                        chai_1.expect(loadedPosts[0].categories[0].imageIds[1]).to.be.equal(2);
                        chai_1.expect(loadedPosts[0].categories[0].imageIds[2]).to.be.equal(3);
                        chai_1.expect(loadedPosts[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categoryIds.length).to.be.equal(2);
                        chai_1.expect(loadedPosts[1].categoryIds[0]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedPosts[1].categoryIds[1]).to.be.eql({ id: 3, code: 2 });
                        chai_1.expect(loadedPosts[1].categories).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categories.length).to.be.equal(2);
                        chai_1.expect(loadedPosts[1].categories[0].imageIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categories[0].imageIds.length).to.be.equal(2);
                        chai_1.expect(loadedPosts[1].categories[0].imageIds[0]).to.be.equal(4);
                        chai_1.expect(loadedPosts[1].categories[0].imageIds[1]).to.be.equal(5);
                        chai_1.expect(loadedPosts[1].categories[1].imageIds).to.not.be.empty;
                        chai_1.expect(loadedPosts[1].categories[1].imageIds.length).to.be.equal(1);
                        chai_1.expect(loadedPosts[1].categories[1].imageIds[0]).to.be.equal(5);
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.categoryIds", "post.categories")
                                .leftJoinAndSelect("post.categories", "category")
                                .loadRelationIdAndMap("category.imageIds", "category.images")
                                .where("post.id = :id", { id: 1 })
                                .andWhere("post.authorId = :authorId", { authorId: 1 })
                                .getOne()];
                    case 12:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedPost.categories).to.not.be.empty;
                        chai_1.expect(loadedPost.categories[0].imageIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categories[0].imageIds.length).to.be.equal(3);
                        chai_1.expect(loadedPost.categories[0].imageIds[0]).to.be.equal(1);
                        chai_1.expect(loadedPost.categories[0].imageIds[1]).to.be.equal(2);
                        chai_1.expect(loadedPost.categories[0].imageIds[2]).to.be.equal(3);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("inverse side", function () {
        it("should load ids when both entities have multiple primary keys", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var post1, post2, post3, post4, category1, category2, loadedCategories, loadedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 2;
                        post2.title = "About Audi";
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 2:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.id = 3;
                        post3.authorId = 1;
                        post3.title = "About Boeing";
                        return [4 /*yield*/, connection.manager.save(post3)];
                    case 3:
                        _a.sent();
                        post4 = new Post_1.Post();
                        post4.id = 4;
                        post4.authorId = 2;
                        post4.title = "About Airbus";
                        return [4 /*yield*/, connection.manager.save(post4)];
                    case 4:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        category1.posts = [post1, post2];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 5:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.name = "airplanes";
                        category2.posts = [post3, post4];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .getMany()];
                    case 7:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedCategories[0].postIds[1]).to.be.eql({ id: 2, authorId: 2 });
                        chai_1.expect(loadedCategories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[1].postIds[0]).to.be.eql({ id: 3, authorId: 1 });
                        chai_1.expect(loadedCategories[1].postIds[1]).to.be.eql({ id: 4, authorId: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .where("category.id = :id", { id: 1 })
                                .andWhere("category.code = :code", { code: 1 })
                                .getOne()];
                    case 8:
                        loadedCategory = _a.sent();
                        chai_1.expect(loadedCategory.postIds).to.not.be.empty;
                        chai_1.expect(loadedCategory.postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedCategory.postIds[1]).to.be.eql({ id: 2, authorId: 2 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when only one entity have multiple primary key", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var category1, category2, category3, category4, image1, image2, loadedImages, loadedImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "category #1";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 1:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.name = "category #2";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 2:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 2;
                        category3.name = "category #3";
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 3:
                        _a.sent();
                        category4 = new Category_1.Category();
                        category4.id = 4;
                        category4.code = 2;
                        category4.name = "category #4";
                        return [4 /*yield*/, connection.manager.save(category4)];
                    case 4:
                        _a.sent();
                        image1 = new Image_1.Image();
                        image1.name = "Image #1";
                        image1.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(image1)];
                    case 5:
                        _a.sent();
                        image2 = new Image_1.Image();
                        image2.name = "Image #2";
                        image2.categories = [category3, category4];
                        return [4 /*yield*/, connection.manager.save(image2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Image_1.Image, "image")
                                .loadRelationIdAndMap("image.categoryIds", "image.categories")
                                .getMany()];
                    case 7:
                        loadedImages = _a.sent();
                        chai_1.expect(loadedImages[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImages[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedImages[0].categoryIds[1]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedImages[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImages[1].categoryIds[0]).to.be.eql({ id: 3, code: 2 });
                        chai_1.expect(loadedImages[1].categoryIds[1]).to.be.eql({ id: 4, code: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Image_1.Image, "image")
                                .loadRelationIdAndMap("image.categoryIds", "image.categories")
                                .where("image.id = :id", { id: 1 })
                                .getOne()];
                    case 8:
                        loadedImage = _a.sent();
                        chai_1.expect(loadedImage.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImage.categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedImage.categoryIds[1]).to.be.eql({ id: 2, code: 1 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when both entities have multiple primary keys and additional condition used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var post1, post2, post3, post4, category1, category2, loadedCategories, loadedCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.isRemoved = true;
                        post2.title = "About Audi";
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 2:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.id = 3;
                        post3.authorId = 1;
                        post3.title = "About Boeing";
                        return [4 /*yield*/, connection.manager.save(post3)];
                    case 3:
                        _a.sent();
                        post4 = new Post_1.Post();
                        post4.id = 4;
                        post4.authorId = 2;
                        post4.isRemoved = true;
                        post4.title = "About Airbus";
                        return [4 /*yield*/, connection.manager.save(post4)];
                    case 4:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        category1.posts = [post1, post2];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 5:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.name = "airplanes";
                        category2.posts = [post3, post4];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts", "post", function (qb) { return qb.andWhere("post.id = :id AND post.authorId = :authorId", { id: 1, authorId: 1 }); })
                                .getMany()];
                    case 7:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedCategories[1].postIds).to.be.empty;
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts", "post", function (qb) { return qb.andWhere("post.authorId = :authorId", { authorId: 1 }); })
                                .getMany()];
                    case 8:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedCategories[0].postIds[1]).to.be.eql({ id: 2, authorId: 1 });
                        chai_1.expect(loadedCategories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[1].postIds[0]).to.be.eql({ id: 3, authorId: 1 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts", "post", function (qb) { return qb.andWhere("post.isRemoved = :isRemoved", { isRemoved: true }); })
                                .getMany()];
                    case 9:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].postIds[0]).to.be.eql({ id: 2, authorId: 1 });
                        chai_1.expect(loadedCategories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[1].postIds[0]).to.be.eql({ id: 4, authorId: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts", "post", function (qb) { return qb.andWhere("post.isRemoved = :isRemoved", { isRemoved: true }); })
                                .where("category.id = :id", { id: 1 })
                                .andWhere("category.code = :code", { code: 1 })
                                .getOne()];
                    case 10:
                        loadedCategory = _a.sent();
                        chai_1.expect(loadedCategory.postIds).to.not.be.empty;
                        chai_1.expect(loadedCategory.postIds[0]).to.be.eql({ id: 2, authorId: 1 });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should load ids when loadRelationIdAndMap used on nested relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var post1, post2, post3, post4, category1, category2, category3, image1, image2, loadedImages, loadedImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.authorId = 1;
                        post1.title = "About BMW";
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.authorId = 1;
                        post2.title = "About Audi";
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 2:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.id = 3;
                        post3.authorId = 1;
                        post3.title = "About Boeing";
                        return [4 /*yield*/, connection.manager.save(post3)];
                    case 3:
                        _a.sent();
                        post4 = new Post_1.Post();
                        post4.id = 4;
                        post4.authorId = 2;
                        post4.title = "About Airbus";
                        return [4 /*yield*/, connection.manager.save(post4)];
                    case 4:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.code = 1;
                        category1.name = "cars";
                        category1.posts = [post1, post2];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 5:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.code = 1;
                        category2.name = "BMW";
                        category2.posts = [post1];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 6:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.code = 2;
                        category3.name = "airplanes";
                        category3.posts = [post3, post4];
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 7:
                        _a.sent();
                        image1 = new Image_1.Image();
                        image1.name = "Image #1";
                        image1.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(image1)];
                    case 8:
                        _a.sent();
                        image2 = new Image_1.Image();
                        image2.name = "Image #2";
                        image2.categories = [category3];
                        return [4 /*yield*/, connection.manager.save(image2)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Image_1.Image, "image")
                                .loadRelationIdAndMap("image.categoryIds", "image.categories")
                                .leftJoinAndSelect("image.categories", "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .orderBy("category.id")
                                .getMany()];
                    case 10:
                        loadedImages = _a.sent();
                        chai_1.expect(loadedImages[0].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImages[0].categoryIds.length).to.be.equal(2);
                        chai_1.expect(loadedImages[0].categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedImages[0].categoryIds[1]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedImages[0].categories).to.not.be.empty;
                        chai_1.expect(loadedImages[0].categories.length).to.be.equal(2);
                        chai_1.expect(loadedImages[0].categories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedImages[0].categories[0].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedImages[0].categories[0].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedImages[0].categories[0].postIds[1]).to.be.eql({ id: 2, authorId: 1 });
                        chai_1.expect(loadedImages[0].categories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedImages[0].categories[1].postIds.length).to.be.equal(1);
                        chai_1.expect(loadedImages[0].categories[1].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedImages[1].categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImages[1].categoryIds.length).to.be.equal(1);
                        chai_1.expect(loadedImages[1].categoryIds[0]).to.be.eql({ id: 3, code: 2 });
                        chai_1.expect(loadedImages[1].categories).to.not.be.empty;
                        chai_1.expect(loadedImages[1].categories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedImages[1].categories[0].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedImages[1].categories[0].postIds[0]).to.be.eql({ id: 3, authorId: 1 });
                        chai_1.expect(loadedImages[1].categories[0].postIds[1]).to.be.eql({ id: 4, authorId: 2 });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Image_1.Image, "image")
                                .loadRelationIdAndMap("image.categoryIds", "image.categories")
                                .leftJoinAndSelect("image.categories", "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .orderBy("category.id")
                                .where("image.id = :id", { id: 1 })
                                .getOne()];
                    case 11:
                        loadedImage = _a.sent();
                        chai_1.expect(loadedImage.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedImage.categoryIds.length).to.be.equal(2);
                        chai_1.expect(loadedImage.categoryIds[0]).to.be.eql({ id: 1, code: 1 });
                        chai_1.expect(loadedImage.categoryIds[1]).to.be.eql({ id: 2, code: 1 });
                        chai_1.expect(loadedImage.categories).to.not.be.empty;
                        chai_1.expect(loadedImage.categories.length).to.be.equal(2);
                        chai_1.expect(loadedImage.categories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedImage.categories[0].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedImage.categories[0].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        chai_1.expect(loadedImage.categories[0].postIds[1]).to.be.eql({ id: 2, authorId: 1 });
                        chai_1.expect(loadedImage.categories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedImage.categories[1].postIds.length).to.be.equal(1);
                        chai_1.expect(loadedImage.categories[1].postIds[0]).to.be.eql({ id: 1, authorId: 1 });
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=multiple-pk.js.map