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
var test_utils_1 = require("../../../../utils/test-utils");
var Category_1 = require("./entity/Category");
var Post_1 = require("./entity/Post");
var Image_1 = require("./entity/Image");
describe("query builder > load-relation-count-and-map > many-to-many", function () {
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
    it("should load relation count on owner side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, category3, category4, category5, post1, post2, loadedPosts, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "BMW";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    category3 = new Category_1.Category();
                    category3.name = "Germany";
                    return [4 /*yield*/, connection.manager.save(category3)];
                case 3:
                    _a.sent();
                    category4 = new Category_1.Category();
                    category4.name = "airplanes";
                    return [4 /*yield*/, connection.manager.save(category4)];
                case 4:
                    _a.sent();
                    category5 = new Category_1.Category();
                    category5.name = "Boeing";
                    return [4 /*yield*/, connection.manager.save(category5)];
                case 5:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1, category2, category3];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 6:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Boeing";
                    post2.categories = [category4, category5];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .getMany()];
                case 8:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPosts[1].categoryCount).to.be.equal(2);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .where("post.id = :id", { id: 1 })
                            .getOne()];
                case 9:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost.categoryCount).to.be.equal(3);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on owner side with limitation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, category3, category4, category5, post1, post2, post3, post4, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "BMW";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    category3 = new Category_1.Category();
                    category3.name = "Germany";
                    return [4 /*yield*/, connection.manager.save(category3)];
                case 3:
                    _a.sent();
                    category4 = new Category_1.Category();
                    category4.name = "airplanes";
                    return [4 /*yield*/, connection.manager.save(category4)];
                case 4:
                    _a.sent();
                    category5 = new Category_1.Category();
                    category5.name = "Boeing";
                    return [4 /*yield*/, connection.manager.save(category5)];
                case 5:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1, category2, category3];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 6:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Boeing";
                    post2.categories = [category4, category5];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 7:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "about Audi";
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 8:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "about Airbus";
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .orderBy("post.id")
                            .offset(0)
                            .limit(2)
                            .getMany()];
                case 10:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPosts[1].categoryCount).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on owner side with additional conditions", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var image1, image2, image3, category1, category2, category3, category4, category5, post1, post2, loadedPosts, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image1 = new Image_1.Image();
                    image1.isRemoved = true;
                    image1.name = "image #1";
                    return [4 /*yield*/, connection.manager.save(image1)];
                case 1:
                    _a.sent();
                    image2 = new Image_1.Image();
                    image2.name = "image #2";
                    return [4 /*yield*/, connection.manager.save(image2)];
                case 2:
                    _a.sent();
                    image3 = new Image_1.Image();
                    image3.name = "image #3";
                    return [4 /*yield*/, connection.manager.save(image3)];
                case 3:
                    _a.sent();
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    category1.isRemoved = true;
                    category1.images = [image1, image2];
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 4:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "BMW";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 5:
                    _a.sent();
                    category3 = new Category_1.Category();
                    category3.name = "Germany";
                    return [4 /*yield*/, connection.manager.save(category3)];
                case 6:
                    _a.sent();
                    category4 = new Category_1.Category();
                    category4.name = "airplanes";
                    category4.images = [image3];
                    return [4 /*yield*/, connection.manager.save(category4)];
                case 7:
                    _a.sent();
                    category5 = new Category_1.Category();
                    category5.name = "Boeing";
                    return [4 /*yield*/, connection.manager.save(category5)];
                case 8:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1, category2, category3];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 9:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Boeing";
                    post2.categories = [category4, category5];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .leftJoinAndSelect("post.categories", "categories")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .loadRelationCountAndMap("post.removedCategoryCount", "post.categories", "rc", function (qb) { return qb.andWhere("rc.isRemoved = :isRemoved", { isRemoved: true }); })
                            .loadRelationCountAndMap("categories.imageCount", "categories.images", "ic")
                            .loadRelationCountAndMap("categories.removedImageCount", "categories.images", "removedImages", function (qb) { return qb.andWhere("removedImages.isRemoved = :isRemoved", { isRemoved: true }); })
                            .addOrderBy("post.id, categories.id")
                            .getMany()];
                case 11:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPosts[0].removedCategoryCount).to.be.equal(1);
                    chai_1.expect(loadedPosts[0].categories[0].imageCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[0].categories[0].removedImageCount).to.be.equal(1);
                    chai_1.expect(loadedPosts[0].categories[1].imageCount).to.be.equal(0);
                    chai_1.expect(loadedPosts[0].categories[2].imageCount).to.be.equal(0);
                    chai_1.expect(loadedPosts[1].categoryCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[1].categories[0].imageCount).to.be.equal(1);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .leftJoinAndSelect("post.categories", "categories")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .loadRelationCountAndMap("post.removedCategoryCount", "post.categories", "rc", function (qb) { return qb.andWhere("rc.isRemoved = :isRemoved", { isRemoved: true }); })
                            .loadRelationCountAndMap("categories.imageCount", "categories.images", "ic")
                            .loadRelationCountAndMap("categories.removedImageCount", "categories.images", "removedImages", function (qb) { return qb.andWhere("removedImages.isRemoved = :isRemoved", { isRemoved: true }); })
                            .where("post.id = :id", { id: 1 })
                            .addOrderBy("post.id, categories.id")
                            .getOne()];
                case 12:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost.categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPost.removedCategoryCount).to.be.equal(1);
                    chai_1.expect(loadedPost.categories[0].imageCount).to.be.equal(2);
                    chai_1.expect(loadedPost.categories[0].removedImageCount).to.be.equal(1);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on both sides of relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, category3, post1, post2, loadedPosts, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "BMW";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    category3 = new Category_1.Category();
                    category3.name = "Germany";
                    return [4 /*yield*/, connection.manager.save(category3)];
                case 3:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1, category2, category3];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 4:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Audi";
                    post2.categories = [category1, category3];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .leftJoinAndSelect("post.categories", "categories")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .loadRelationCountAndMap("categories.postCount", "categories.posts")
                            .addOrderBy("post.id, categories.id")
                            .getMany()];
                case 6:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPosts[0].categories[0].postCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[0].categories[1].postCount).to.be.equal(1);
                    chai_1.expect(loadedPosts[0].categories[2].postCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[1].categoryCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[1].categories[0].postCount).to.be.equal(2);
                    chai_1.expect(loadedPosts[1].categories[1].postCount).to.be.equal(2);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .leftJoinAndSelect("post.categories", "categories")
                            .loadRelationCountAndMap("post.categoryCount", "post.categories")
                            .loadRelationCountAndMap("categories.postCount", "categories.posts")
                            .where("post.id = :id", { id: 1 })
                            .addOrderBy("post.id, categories.id")
                            .getOne()];
                case 7:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost.categoryCount).to.be.equal(3);
                    chai_1.expect(loadedPost.categories[0].postCount).to.be.equal(2);
                    chai_1.expect(loadedPost.categories[1].postCount).to.be.equal(1);
                    chai_1.expect(loadedPost.categories[2].postCount).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on inverse side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, post1, post2, post3, post4, post5, loadedCategories, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "airplanes";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 3:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Audi";
                    post2.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 4:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "about Mercedes";
                    post3.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 5:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "about Boeing";
                    post4.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 6:
                    _a.sent();
                    post5 = new Post_1.Post();
                    post5.title = "about Airbus";
                    post5.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post5)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Category_1.Category, "category")
                            .loadRelationCountAndMap("category.postCount", "category.posts")
                            .getMany()];
                case 8:
                    loadedCategories = _a.sent();
                    chai_1.expect(loadedCategories[0].postCount).to.be.equal(3);
                    chai_1.expect(loadedCategories[1].postCount).to.be.equal(2);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Category_1.Category, "category")
                            .loadRelationCountAndMap("category.postCount", "category.posts")
                            .where("category.id = :id", { id: 1 })
                            .getOne()];
                case 9:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory.postCount).to.be.equal(3);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on inverse side with limitation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, category3, category4, post1, post2, post3, post4, post5, loadedCategories;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "airplanes";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    category3 = new Category_1.Category();
                    category3.name = "BMW";
                    return [4 /*yield*/, connection.manager.save(category3)];
                case 3:
                    _a.sent();
                    category4 = new Category_1.Category();
                    category4.name = "Boeing";
                    return [4 /*yield*/, connection.manager.save(category4)];
                case 4:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 5:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Audi";
                    post2.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 6:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "about Mercedes";
                    post3.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 7:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "about Boeing";
                    post4.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 8:
                    _a.sent();
                    post5 = new Post_1.Post();
                    post5.title = "about Airbus";
                    post5.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post5)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Category_1.Category, "category")
                            .loadRelationCountAndMap("category.postCount", "category.posts")
                            .orderBy("category.id")
                            .offset(0)
                            .limit(2)
                            .getMany()];
                case 10:
                    loadedCategories = _a.sent();
                    chai_1.expect(loadedCategories[0].postCount).to.be.equal(3);
                    chai_1.expect(loadedCategories[1].postCount).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should load relation count on inverse side with additional conditions", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, post1, post2, post3, post4, post5, loadedCategories, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "airplanes";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "about BMW";
                    post1.isRemoved = true;
                    post1.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 3:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "about Audi";
                    post2.isRemoved = true;
                    post2.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 4:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "about Mercedes";
                    post3.categories = [category1];
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 5:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "about Boeing";
                    post4.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 6:
                    _a.sent();
                    post5 = new Post_1.Post();
                    post5.title = "about Airbus";
                    post5.categories = [category2];
                    return [4 /*yield*/, connection.manager.save(post5)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Category_1.Category, "category")
                            .loadRelationCountAndMap("category.postCount", "category.posts")
                            .loadRelationCountAndMap("category.removedPostCount", "category.posts", "removedPosts", function (qb) { return qb.andWhere("removedPosts.isRemoved = :isRemoved", { isRemoved: true }); })
                            .getMany()];
                case 8:
                    loadedCategories = _a.sent();
                    chai_1.expect(loadedCategories[0].postCount).to.be.equal(3);
                    chai_1.expect(loadedCategories[0].removedPostCount).to.be.equal(2);
                    chai_1.expect(loadedCategories[1].postCount).to.be.equal(2);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Category_1.Category, "category")
                            .loadRelationCountAndMap("category.postCount", "category.posts")
                            .loadRelationCountAndMap("category.removedPostCount", "category.posts", "removedPosts", function (qb) { return qb.andWhere("removedPosts.isRemoved = :isRemoved", { isRemoved: true }); })
                            .where("category.id = :id", { id: 1 })
                            .getOne()];
                case 9:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory.postCount).to.be.equal(3);
                    chai_1.expect(loadedCategory.removedPostCount).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=load-relation-count-and-map-many-to-many.js.map