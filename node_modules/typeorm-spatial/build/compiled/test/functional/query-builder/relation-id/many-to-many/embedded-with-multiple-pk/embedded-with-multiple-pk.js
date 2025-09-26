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
var Counters_1 = require("./entity/Counters");
var User_1 = require("./entity/User");
var Subcounters_1 = require("./entity/Subcounters");
describe("query builder > relation-id > many-to-many > embedded-with-multiple-pk", function () {
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
        it("should load ids when loadRelationIdAndMap used on embedded table and each table have primary key", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var user1, user2, user3, category1, category2, category3, category4, post1, post2, loadedPosts, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user1 = new User_1.User();
                        user1.id = 1;
                        user1.name = "Alice";
                        return [4 /*yield*/, connection.manager.save(user1)];
                    case 1:
                        _a.sent();
                        user2 = new User_1.User();
                        user2.id = 2;
                        user2.name = "Bob";
                        return [4 /*yield*/, connection.manager.save(user2)];
                    case 2:
                        _a.sent();
                        user3 = new User_1.User();
                        user3.id = 3;
                        user3.name = "Clara";
                        return [4 /*yield*/, connection.manager.save(user3)];
                    case 3:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.name = "cars";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 4:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.name = "BMW";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 5:
                        _a.sent();
                        category3 = new Category_1.Category();
                        category3.id = 3;
                        category3.name = "airplanes";
                        return [4 /*yield*/, connection.manager.save(category3)];
                    case 6:
                        _a.sent();
                        category4 = new Category_1.Category();
                        category4.id = 4;
                        category4.name = "Boeing";
                        return [4 /*yield*/, connection.manager.save(category4)];
                    case 7:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.title = "About BMW";
                        post1.counters = new Counters_1.Counters();
                        post1.counters.code = 111;
                        post1.counters.likes = 1;
                        post1.counters.comments = 2;
                        post1.counters.favorites = 3;
                        post1.counters.categories = [category1, category2];
                        post1.counters.subcntrs = new Subcounters_1.Subcounters();
                        post1.counters.subcntrs.version = 1;
                        post1.counters.subcntrs.watches = 2;
                        post1.counters.subcntrs.watchedUsers = [user1, user2];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 8:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.title = "About Boeing";
                        post2.counters = new Counters_1.Counters();
                        post2.counters.code = 222;
                        post2.counters.likes = 3;
                        post2.counters.comments = 4;
                        post2.counters.favorites = 5;
                        post2.counters.categories = [category3, category4];
                        post2.counters.subcntrs = new Subcounters_1.Subcounters();
                        post2.counters.subcntrs.version = 1;
                        post2.counters.subcntrs.watches = 1;
                        post2.counters.subcntrs.watchedUsers = [user3];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.counters.categoryIds", "post.counters.categories")
                                .loadRelationIdAndMap("post.counters.subcntrs.watchedUserIds", "post.counters.subcntrs.watchedUsers")
                                .orderBy("post.id")
                                .getMany()];
                    case 10:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].should.be.eql({
                            id: 1,
                            title: "About BMW",
                            counters: {
                                code: 111,
                                likes: 1,
                                comments: 2,
                                favorites: 3,
                                categoryIds: [
                                    { id: 1, name: "cars" },
                                    { id: 2, name: "BMW" }
                                ],
                                subcntrs: {
                                    version: 1,
                                    watches: 2,
                                    watchedUserIds: [
                                        { id: 1, name: "Alice" },
                                        { id: 2, name: "Bob" }
                                    ]
                                }
                            }
                        }));
                        chai_1.expect(loadedPosts[1].should.be.eql({
                            id: 2,
                            title: "About Boeing",
                            counters: {
                                code: 222,
                                likes: 3,
                                comments: 4,
                                favorites: 5,
                                categoryIds: [
                                    { id: 3, name: "airplanes" },
                                    { id: 4, name: "Boeing" }
                                ],
                                subcntrs: {
                                    version: 1,
                                    watches: 1,
                                    watchedUserIds: [
                                        { id: 3, name: "Clara" }
                                    ]
                                }
                            }
                        }));
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .loadRelationIdAndMap("post.counters.categoryIds", "post.counters.categories")
                                .loadRelationIdAndMap("post.counters.subcntrs.watchedUserIds", "post.counters.subcntrs.watchedUsers")
                                .where("post.id = :id", { id: 1 })
                                .andWhere("post.counters.code = :code", { code: 111 })
                                .andWhere("post.counters.subcntrs.version = :version", { version: 1 })
                                .getOne()];
                    case 11:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.should.be.eql({
                            id: 1,
                            title: "About BMW",
                            counters: {
                                code: 111,
                                likes: 1,
                                comments: 2,
                                favorites: 3,
                                categoryIds: [
                                    { id: 1, name: "cars" },
                                    { id: 2, name: "BMW" }
                                ],
                                subcntrs: {
                                    version: 1,
                                    watches: 2,
                                    watchedUserIds: [
                                        { id: 1, name: "Alice" },
                                        { id: 2, name: "Bob" }
                                    ]
                                }
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("inverse side", function () {
        it("should load ids when loadRelationIdAndMap used on embedded table and each table have primary key", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var post1, post2, post3, post4, category1, category2, user1, user2, loadedCategories, loadedCategory, loadedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post1 = new Post_1.Post();
                        post1.id = 1;
                        post1.title = "About BMW";
                        post1.counters = new Counters_1.Counters();
                        post1.counters.code = 111;
                        post1.counters.likes = 1;
                        post1.counters.comments = 2;
                        post1.counters.favorites = 3;
                        post1.counters.subcntrs = new Subcounters_1.Subcounters();
                        post1.counters.subcntrs.version = 1;
                        post1.counters.subcntrs.watches = 2;
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.id = 2;
                        post2.title = "About Audi";
                        post2.counters = new Counters_1.Counters();
                        post2.counters.code = 222;
                        post2.counters.likes = 3;
                        post2.counters.comments = 4;
                        post2.counters.favorites = 5;
                        post2.counters.subcntrs = new Subcounters_1.Subcounters();
                        post2.counters.subcntrs.version = 1;
                        post2.counters.subcntrs.watches = 5;
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 2:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.id = 3;
                        post3.title = "About Boeing";
                        post3.counters = new Counters_1.Counters();
                        post3.counters.code = 333;
                        post3.counters.likes = 6;
                        post3.counters.comments = 7;
                        post3.counters.favorites = 8;
                        post3.counters.subcntrs = new Subcounters_1.Subcounters();
                        post3.counters.subcntrs.version = 2;
                        post3.counters.subcntrs.watches = 10;
                        return [4 /*yield*/, connection.manager.save(post3)];
                    case 3:
                        _a.sent();
                        post4 = new Post_1.Post();
                        post4.id = 4;
                        post4.title = "About Airbus";
                        post4.counters = new Counters_1.Counters();
                        post4.counters.code = 444;
                        post4.counters.likes = 9;
                        post4.counters.comments = 10;
                        post4.counters.favorites = 11;
                        post4.counters.subcntrs = new Subcounters_1.Subcounters();
                        post4.counters.subcntrs.version = 3;
                        post4.counters.subcntrs.watches = 10;
                        return [4 /*yield*/, connection.manager.save(post4)];
                    case 4:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.id = 1;
                        category1.name = "cars";
                        category1.posts = [post1, post2];
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 5:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.id = 2;
                        category2.name = "airplanes";
                        category2.posts = [post3, post4];
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 6:
                        _a.sent();
                        user1 = new User_1.User();
                        user1.id = 1;
                        user1.name = "Alice";
                        user1.posts = [post1, post2];
                        return [4 /*yield*/, connection.manager.save(user1)];
                    case 7:
                        _a.sent();
                        user2 = new User_1.User();
                        user2.id = 2;
                        user2.name = "Bob";
                        user2.posts = [post3, post4];
                        return [4 /*yield*/, connection.manager.save(user2)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .orderBy("category.id")
                                .getMany()];
                    case 9:
                        loadedCategories = _a.sent();
                        chai_1.expect(loadedCategories[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[0].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedCategories[0].postIds[0]).to.be.eql({ id: 1, counters: { code: 111, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedCategories[0].postIds[1]).to.be.eql({ id: 2, counters: { code: 222, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedCategories[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedCategories[1].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedCategories[1].postIds[0]).to.be.eql({ id: 3, counters: { code: 333, subcntrs: { version: 2 } } });
                        chai_1.expect(loadedCategories[1].postIds[1]).to.be.eql({ id: 4, counters: { code: 444, subcntrs: { version: 3 } } });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Category_1.Category, "category")
                                .loadRelationIdAndMap("category.postIds", "category.posts")
                                .where("category.id = :id", { id: 1 })
                                .andWhere("category.name = :name", { name: "cars" })
                                .getOne()];
                    case 10:
                        loadedCategory = _a.sent();
                        chai_1.expect(loadedCategory.postIds).to.not.be.empty;
                        chai_1.expect(loadedCategory.postIds.length).to.be.equal(2);
                        chai_1.expect(loadedCategory.postIds[0]).to.be.eql({ id: 1, counters: { code: 111, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedCategory.postIds[1]).to.be.eql({ id: 2, counters: { code: 222, subcntrs: { version: 1 } } });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(User_1.User, "user")
                                .loadRelationIdAndMap("user.postIds", "user.posts")
                                .orderBy("user.id")
                                .getMany()];
                    case 11:
                        loadedUsers = _a.sent();
                        chai_1.expect(loadedUsers[0].postIds).to.not.be.empty;
                        chai_1.expect(loadedUsers[0].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedUsers[0].postIds[0]).to.be.eql({ id: 1, counters: { code: 111, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedUsers[0].postIds[1]).to.be.eql({ id: 2, counters: { code: 222, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedUsers[1].postIds).to.not.be.empty;
                        chai_1.expect(loadedUsers[1].postIds.length).to.be.equal(2);
                        chai_1.expect(loadedUsers[1].postIds[0]).to.be.eql({ id: 3, counters: { code: 333, subcntrs: { version: 2 } } });
                        chai_1.expect(loadedUsers[1].postIds[1]).to.be.eql({ id: 4, counters: { code: 444, subcntrs: { version: 3 } } });
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(User_1.User, "user")
                                .loadRelationIdAndMap("user.postIds", "user.posts")
                                .where("user.id = :id", { id: 1 })
                                .andWhere("user.name = :name", { name: "Alice" })
                                .getOne()];
                    case 12:
                        loadedUser = _a.sent();
                        chai_1.expect(loadedUser.postIds).to.not.be.empty;
                        chai_1.expect(loadedUser.postIds.length).to.be.equal(2);
                        chai_1.expect(loadedUser.postIds[0]).to.be.eql({ id: 1, counters: { code: 111, subcntrs: { version: 1 } } });
                        chai_1.expect(loadedUser.postIds[1]).to.be.eql({ id: 2, counters: { code: 222, subcntrs: { version: 1 } } });
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=embedded-with-multiple-pk.js.map