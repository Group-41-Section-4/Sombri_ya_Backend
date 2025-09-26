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
describe("persistence > one-to-many", function () {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    var _this = this;
    var connections;
    before(function () {
        return test_utils_1.createTestingConnections({
            entities: [Post_1.Post, Category_1.Category],
        }).then(function (all) { return connections = all; });
    });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should add exist element to exist object with empty one-to-many relation and save it", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory = categoryRepository.create();
                    newCategory.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 1:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "All about animals";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 2:
                    _a.sent();
                    newPost.categories = [newCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, { relations: ["categories"] })];
                case 4:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).not.to.be.empty;
                    chai_1.expect(loadedPost.categories[0]).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should add exist element to new object with empty one-to-many relation and save it", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory = categoryRepository.create();
                    newCategory.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 1:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "All about animals";
                    newPost.categories = [newCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, { relations: ["categories"] })];
                case 3:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).not.to.be.empty;
                    chai_1.expect(loadedPost.categories[0]).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should remove exist element from one-to-many relation and save it", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, firstNewCategory, secondNewCategory, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    firstNewCategory = categoryRepository.create();
                    firstNewCategory.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(firstNewCategory)];
                case 1:
                    _a.sent();
                    secondNewCategory = categoryRepository.create();
                    secondNewCategory.name = "Insects";
                    return [4 /*yield*/, categoryRepository.save(secondNewCategory)];
                case 2:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "All about animals";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 3:
                    _a.sent();
                    newPost.categories = [firstNewCategory, secondNewCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 4:
                    _a.sent();
                    newPost.categories = [firstNewCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                innerJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 6:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).not.to.be.empty;
                    chai_1.expect(loadedPost.categories[0]).not.to.be.empty;
                    chai_1.expect(loadedPost.categories[1]).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should remove all elements from one-to-many relation and save it", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, firstNewCategory, secondNewCategory, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    firstNewCategory = categoryRepository.create();
                    firstNewCategory.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(firstNewCategory)];
                case 1:
                    _a.sent();
                    secondNewCategory = categoryRepository.create();
                    secondNewCategory.name = "Insects";
                    return [4 /*yield*/, categoryRepository.save(secondNewCategory)];
                case 2:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "All about animals";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 3:
                    _a.sent();
                    newPost.categories = [firstNewCategory, secondNewCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 4:
                    _a.sent();
                    newPost.categories = [];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 6:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("set relation to null (elements exist there) from one-to-many relation and save it", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, firstNewCategory, secondNewCategory, newPost, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    firstNewCategory = categoryRepository.create();
                    firstNewCategory.name = "Animals";
                    return [4 /*yield*/, categoryRepository.save(firstNewCategory)];
                case 1:
                    _a.sent();
                    secondNewCategory = categoryRepository.create();
                    secondNewCategory.name = "Insects";
                    return [4 /*yield*/, categoryRepository.save(secondNewCategory)];
                case 2:
                    _a.sent();
                    newPost = postRepository.create();
                    newPost.title = "All about animals";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 3:
                    _a.sent();
                    newPost.categories = [firstNewCategory, secondNewCategory];
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 4:
                    _a.sent();
                    newPost.categories = null;
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 6:
                    loadedPost = (_a.sent());
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=persistence-one-to-many.js.map