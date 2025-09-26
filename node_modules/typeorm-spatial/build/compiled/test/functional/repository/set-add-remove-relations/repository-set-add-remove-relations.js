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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var test_utils_1 = require("../../../utils/test-utils");
// todo: fix this test later
describe.skip("repository > set/add/remove relation methods", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    var _this = this;
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
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("add elements to many-to-many from owner side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory1, newCategory2, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory1 = categoryRepository.create();
                    newCategory1.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory1)];
                case 1:
                    _a.sent();
                    newCategory2 = categoryRepository.create();
                    newCategory2.name = "Kids";
                    return [4 /*yield*/, categoryRepository.save(newCategory2)];
                case 2:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "Super post";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    manyCategories: "post.manyCategories"
                                }
                            }
                        })];
                case 4:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.manyCategories).not.to.be.empty;
                    chai_1.expect(loadedPost.manyCategories[0]).not.to.be.empty;
                    chai_1.expect(loadedPost.manyCategories[1]).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("add elements to many-to-many from inverse side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newPost1, newPost2, newCategory, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newPost1 = postRepository.create();
                    newPost1.title = "post #1";
                    return [4 /*yield*/, postRepository.save(newPost1)];
                case 1:
                    _a.sent();
                    newPost2 = postRepository.create();
                    newPost2.title = "post #2";
                    return [4 /*yield*/, postRepository.save(newPost2)];
                case 2:
                    _a.sent();
                    newCategory = categoryRepository.create();
                    newCategory.name = "Kids";
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findOne(1, {
                            join: {
                                alias: "category",
                                leftJoinAndSelect: { manyPosts: "category.manyPosts" }
                            }
                        })];
                case 4:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    chai_1.expect(loadedCategory.manyPosts).not.to.be.empty;
                    chai_1.expect(loadedCategory.manyPosts[0]).not.to.be.empty;
                    chai_1.expect(loadedCategory.manyPosts[1]).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("remove elements to many-to-many from owner side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory1, newCategory2, newCategory3, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory1 = categoryRepository.create();
                    newCategory1.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory1)];
                case 1:
                    _a.sent();
                    newCategory2 = categoryRepository.create();
                    newCategory2.name = "Kids";
                    return [4 /*yield*/, categoryRepository.save(newCategory2)];
                case 2:
                    _a.sent();
                    newCategory3 = categoryRepository.create();
                    newCategory3.name = "Adults";
                    return [4 /*yield*/, categoryRepository.save(newCategory3)];
                case 3:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "Super post";
                    newPost.manyCategories = [newCategory1, newCategory2, newCategory3];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: { manyCategories: "post.manyCategories" }
                            }
                        })];
                case 5:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.manyCategories).not.to.be.empty;
                    loadedPost.manyCategories.length.should.be.equal(1);
                    loadedPost.manyCategories[0].name.should.be.equal("Kids");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("remove elements to many-to-many from inverse side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newPost1, newPost2, newPost3, newCategory, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newPost1 = postRepository.create();
                    newPost1.title = "post #1";
                    return [4 /*yield*/, postRepository.save(newPost1)];
                case 1:
                    _a.sent();
                    newPost2 = postRepository.create();
                    newPost2.title = "post #2";
                    return [4 /*yield*/, postRepository.save(newPost2)];
                case 2:
                    _a.sent();
                    newPost3 = postRepository.create();
                    newPost3.title = "post #3";
                    return [4 /*yield*/, postRepository.save(newPost3)];
                case 3:
                    _a.sent();
                    newCategory = categoryRepository.create();
                    newCategory.name = "SuperCategory";
                    newCategory.manyPosts = [newPost1, newPost2, newPost3];
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findOne(1, {
                            join: {
                                alias: "category",
                                leftJoinAndSelect: { manyPosts: "category.manyPosts" }
                            }
                        })];
                case 5:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    chai_1.expect(loadedCategory.manyPosts).not.to.be.empty;
                    loadedCategory.manyPosts.length.should.be.equal(1);
                    loadedCategory.manyPosts[0].title.should.be.equal("post #2");
                    return [2 /*return*/];
            }
        });
    }); })); });
    // todo: fix this test later
    it("set element to one-to-many relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory1, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory1 = categoryRepository.create();
                    newCategory1.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory1)];
                case 1:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "Super post";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: { categories: "post.categories" }
                            }
                        })];
                case 3:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).not.to.be.empty;
                    chai_1.expect(loadedPost.categories[0]).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("set element to many-to-one relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newPost, newCategory, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newPost = postRepository.create();
                    newPost.title = "post #1";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 1:
                    _a.sent();
                    newCategory = categoryRepository.create();
                    newCategory.name = "Kids";
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findOne(1, {
                            join: {
                                alias: "category",
                                leftJoinAndSelect: { post: "category.post" }
                            }
                        })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    chai_1.expect(loadedCategory.post).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("set element to NULL in one-to-many relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory1, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory1 = categoryRepository.create();
                    newCategory1.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory1)];
                case 1:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "Super post";
                    newPost.categories = [newCategory1];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: { categories: "post.categories" }
                            }
                        })];
                case 3:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("set element to NULL in many-to-one relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newPost, newCategory, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newPost = postRepository.create();
                    newPost.title = "post #1";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 1:
                    _a.sent();
                    newCategory = categoryRepository.create();
                    newCategory.name = "Kids";
                    newCategory.post = newPost;
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findOne(1, {
                            join: {
                                alias: "category",
                                leftJoinAndSelect: { post: "category.post" }
                            }
                        })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    chai_1.expect(loadedCategory.post).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=repository-set-add-remove-relations.js.map