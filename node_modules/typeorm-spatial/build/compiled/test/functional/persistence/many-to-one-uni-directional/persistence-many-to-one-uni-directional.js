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
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var chai_1 = require("chai");
describe("persistence > many-to-one uni-directional relation", function () {
    var _this = this;
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should save a category with a post attached", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    loadedCategory.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should save a category and a new post by cascades", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 2:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    loadedCategory.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update exist post by cascades when category is saved", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory1, loadedCategory2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    post.title = "Updated post";
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    // save once again, just for fun
                    return [4 /*yield*/, connection.manager.save(category)];
                case 3:
                    // save once again, just for fun
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 4:
                    loadedCategory1 = _a.sent();
                    chai_1.expect(loadedCategory1).not.to.be.empty;
                    loadedCategory1.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Updated post" } });
                    // update post from loaded category
                    loadedCategory1.post.title = "Again Updated post";
                    return [4 /*yield*/, connection.manager.save(loadedCategory1)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 6:
                    loadedCategory2 = _a.sent();
                    chai_1.expect(loadedCategory2).not.to.be.empty;
                    loadedCategory2.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Again Updated post" } });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should NOT remove exist post by cascades when category is saved without a post (post is set to undefined)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory1, loadedCategory2, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 3:
                    loadedCategory1 = _a.sent();
                    chai_1.expect(loadedCategory1).not.to.be.empty;
                    loadedCategory1.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    // remove post from loaded category
                    loadedCategory1.post = undefined;
                    return [4 /*yield*/, connection.manager.save(loadedCategory1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 5:
                    loadedCategory2 = _a.sent();
                    chai_1.expect(loadedCategory2).not.to.be.empty;
                    loadedCategory2.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1)];
                case 6:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql({ id: 1, title: "Hello Post" });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should unset exist post when its set to null", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory1, loadedCategory2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 3:
                    loadedCategory1 = _a.sent();
                    chai_1.expect(loadedCategory1).not.to.be.empty;
                    loadedCategory1.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    // remove post from loaded category
                    loadedCategory1.post = null;
                    return [4 /*yield*/, connection.manager.save(loadedCategory1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 5:
                    loadedCategory2 = _a.sent();
                    chai_1.expect(loadedCategory2).not.to.be.empty;
                    loadedCategory2.should.be.eql({ id: 1, name: "Hello Category", post: null });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should set category's post to NULL when post is removed from the database (database ON DELETE)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedCategory1, loadedCategory2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = post;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 3:
                    loadedCategory1 = _a.sent();
                    chai_1.expect(loadedCategory1).not.to.be.empty;
                    loadedCategory1.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post" } });
                    // remove post from loaded category
                    return [4 /*yield*/, connection.manager.remove(post)];
                case 4:
                    // remove post from loaded category
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 5:
                    loadedCategory2 = _a.sent();
                    chai_1.expect(loadedCategory2).not.to.be.empty;
                    loadedCategory2.should.be.eql({ id: 1, name: "Hello Category", post: null });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should work when relation id is directly set into relation (without related object)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, category, loadedCategory1, loadedCategory2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post("Hello Post #1");
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post("Hello Post #2");
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    category = new Category_1.Category("Hello Category");
                    category.post = 1;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 4:
                    loadedCategory1 = _a.sent();
                    chai_1.expect(loadedCategory1).not.to.be.empty;
                    loadedCategory1.should.be.eql({ id: 1, name: "Hello Category", post: { id: 1, title: "Hello Post #1" } });
                    // now update a category with another post
                    category.post = 2;
                    return [4 /*yield*/, connection.manager.save(category)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1, { relations: ["post"] })];
                case 6:
                    loadedCategory2 = _a.sent();
                    chai_1.expect(loadedCategory2).not.to.be.empty;
                    loadedCategory2.should.be.eql({ id: 1, name: "Hello Category", post: { id: 2, title: "Hello Post #2" } });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=persistence-many-to-one-uni-directional.js.map