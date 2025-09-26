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
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var EntityNotFoundError_1 = require("../../../../src/error/EntityNotFoundError");
var src_1 = require("../../../../src");
describe("repository > find methods", function () {
    var userSchema;
    try {
        var resourceDir = __dirname + "/../../../../../../test/functional/repository/find-methods/";
        userSchema = require(resourceDir + "schema/user.json");
    }
    catch (err) {
        var resourceDir = __dirname + "/";
        userSchema = require(resourceDir + "schema/user.json");
    }
    var UserEntity = new src_1.EntitySchema(userSchema);
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post, UserEntity],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("count", function () {
        var _this = this;
        it("should return a full count when no criteria given", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = "other";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _a.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.count({ order: { id: "ASC" } })];
                    case 2:
                        count = _a.sent();
                        count.should.be.equal(100);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return a count of posts that match given criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _a.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.count({
                                where: { categoryName: "odd" },
                                order: { id: "ASC" }
                            })];
                    case 2:
                        count = _a.sent();
                        count.should.be.equal(50);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return a count of posts that match given multiple criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            post.isNew = i > 90;
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _a.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.count({
                                where: { categoryName: "odd", isNew: true },
                                order: { id: "ASC" }
                            })];
                    case 2:
                        count = _a.sent();
                        count.should.be.equal(5);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return a count of posts that match given find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.isNew = i > 90;
                            post.title = post.isNew ? "new post #" + i : "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _a.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.count()];
                    case 2:
                        count = _a.sent();
                        count.should.be.equal(100);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return a count of posts that match both criteria and find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.isNew = i > 90;
                            post.title = post.isNew ? "new post #" + i : "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _a.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.count({
                                where: { categoryName: "even", isNew: true },
                                skip: 1,
                                take: 2,
                                order: { id: "ASC" }
                            })];
                    case 2:
                        count = _a.sent();
                        count.should.be.equal(5);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("find and findAndCount", function () {
        var _this = this;
        it("should return everything when no criteria given", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, loadedPosts, _a, loadedPosts2, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = "other";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _b.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.find({ order: { id: "ASC" } })];
                    case 2:
                        loadedPosts = _b.sent();
                        loadedPosts.should.be.instanceOf(Array);
                        loadedPosts.length.should.be.equal(100);
                        loadedPosts[0].id.should.be.equal(0);
                        loadedPosts[0].title.should.be.equal("post #0");
                        loadedPosts[99].id.should.be.equal(99);
                        loadedPosts[99].title.should.be.equal("post #99");
                        return [4 /*yield*/, postRepository.findAndCount({ order: { id: "ASC" } })];
                    case 3:
                        _a = _b.sent(), loadedPosts2 = _a[0], count = _a[1];
                        count.should.be.equal(100);
                        loadedPosts2.should.be.instanceOf(Array);
                        loadedPosts2.length.should.be.equal(100);
                        loadedPosts2[0].id.should.be.equal(0);
                        loadedPosts2[0].title.should.be.equal("post #0");
                        loadedPosts2[99].id.should.be.equal(99);
                        loadedPosts2[99].title.should.be.equal("post #99");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return posts that match given criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, loadedPosts, _a, loadedPosts2, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _b.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.find({
                                where: { categoryName: "odd" },
                                order: { id: "ASC" }
                            })];
                    case 2:
                        loadedPosts = _b.sent();
                        loadedPosts.should.be.instanceOf(Array);
                        loadedPosts.length.should.be.equal(50);
                        loadedPosts[0].id.should.be.equal(1);
                        loadedPosts[0].title.should.be.equal("post #1");
                        loadedPosts[49].id.should.be.equal(99);
                        loadedPosts[49].title.should.be.equal("post #99");
                        return [4 /*yield*/, postRepository.findAndCount({
                                where: { categoryName: "odd" },
                                order: { id: "ASC" }
                            })];
                    case 3:
                        _a = _b.sent(), loadedPosts2 = _a[0], count = _a[1];
                        count.should.be.equal(50);
                        loadedPosts2.should.be.instanceOf(Array);
                        loadedPosts2.length.should.be.equal(50);
                        loadedPosts2[0].id.should.be.equal(1);
                        loadedPosts2[0].title.should.be.equal("post #1");
                        loadedPosts2[49].id.should.be.equal(99);
                        loadedPosts2[49].title.should.be.equal("post #99");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return posts that match given multiple criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, loadedPosts, _a, loadedPosts2, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.title = "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            post.isNew = i > 90;
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _b.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.find({
                                where: { categoryName: "odd", isNew: true },
                                order: { id: "ASC" }
                            })];
                    case 2:
                        loadedPosts = _b.sent();
                        loadedPosts.should.be.instanceOf(Array);
                        loadedPosts.length.should.be.equal(5);
                        loadedPosts[0].id.should.be.equal(91);
                        loadedPosts[0].title.should.be.equal("post #91");
                        loadedPosts[4].id.should.be.equal(99);
                        loadedPosts[4].title.should.be.equal("post #99");
                        return [4 /*yield*/, postRepository.findAndCount({
                                where: { categoryName: "odd", isNew: true },
                                order: { id: "ASC" }
                            })];
                    case 3:
                        _a = _b.sent(), loadedPosts2 = _a[0], count = _a[1];
                        count.should.be.equal(5);
                        loadedPosts2.should.be.instanceOf(Array);
                        loadedPosts2.length.should.be.equal(5);
                        loadedPosts2[0].id.should.be.equal(91);
                        loadedPosts2[0].title.should.be.equal("post #91");
                        loadedPosts2[4].id.should.be.equal(99);
                        loadedPosts2[4].title.should.be.equal("post #99");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return posts that match given find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, loadedPosts, _a, loadedPosts2, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.isNew = i > 90;
                            post.title = post.isNew ? "new post #" + i : "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _b.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.createQueryBuilder("post")
                                .where("post.title LIKE :likeTitle AND post.categoryName = :categoryName")
                                .setParameters({
                                likeTitle: "new post #%",
                                categoryName: "even"
                            })
                                .orderBy("post.id", "ASC")
                                .getMany()];
                    case 2:
                        loadedPosts = _b.sent();
                        loadedPosts.should.be.instanceOf(Array);
                        loadedPosts.length.should.be.equal(5);
                        loadedPosts[0].id.should.be.equal(92);
                        loadedPosts[0].title.should.be.equal("new post #92");
                        loadedPosts[4].id.should.be.equal(100);
                        loadedPosts[4].title.should.be.equal("new post #100");
                        return [4 /*yield*/, postRepository.createQueryBuilder("post")
                                .where("post.title LIKE :likeTitle AND post.categoryName = :categoryName")
                                .setParameters({
                                likeTitle: "new post #%",
                                categoryName: "even"
                            })
                                .orderBy("post.id", "ASC")
                                .getManyAndCount()];
                    case 3:
                        _a = _b.sent(), loadedPosts2 = _a[0], count = _a[1];
                        count.should.be.equal(5);
                        loadedPosts2.should.be.instanceOf(Array);
                        loadedPosts2.length.should.be.equal(5);
                        loadedPosts2[0].id.should.be.equal(92);
                        loadedPosts2[0].title.should.be.equal("new post #92");
                        loadedPosts2[4].id.should.be.equal(100);
                        loadedPosts2[4].title.should.be.equal("new post #100");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return posts that match both criteria and find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, promises, i, post, savedPosts, loadedPosts, _a, loadedPosts2, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.id = i;
                            post.isNew = i > 90;
                            post.title = post.isNew ? "new post #" + i : "post #" + i;
                            post.categoryName = i % 2 === 0 ? "even" : "odd";
                            promises.push(postRepository.save(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedPosts = _b.sent();
                        savedPosts.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, postRepository.find({
                                where: {
                                    categoryName: "even",
                                    isNew: true
                                },
                                skip: 1,
                                take: 2,
                                order: {
                                    id: "ASC"
                                }
                            })];
                    case 2:
                        loadedPosts = _b.sent();
                        loadedPosts.should.be.instanceOf(Array);
                        loadedPosts.length.should.be.equal(2);
                        loadedPosts[0].id.should.be.equal(94);
                        loadedPosts[0].title.should.be.equal("new post #94");
                        loadedPosts[1].id.should.be.equal(96);
                        loadedPosts[1].title.should.be.equal("new post #96");
                        return [4 /*yield*/, postRepository.findAndCount({
                                where: {
                                    categoryName: "even",
                                    isNew: true
                                },
                                skip: 1,
                                take: 2,
                                order: {
                                    id: "ASC"
                                }
                            })];
                    case 3:
                        _a = _b.sent(), loadedPosts2 = _a[0], count = _a[1];
                        count.should.be.equal(5);
                        loadedPosts2.should.be.instanceOf(Array);
                        loadedPosts2.length.should.be.equal(2);
                        loadedPosts2[0].id.should.be.equal(94);
                        loadedPosts2[0].title.should.be.equal("new post #94");
                        loadedPosts2[1].id.should.be.equal(96);
                        loadedPosts2[1].title.should.be.equal("new post #96");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("findOne", function () {
        var _this = this;
        it("should return first when no criteria given", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOne({ order: { id: "ASC" } })];
                    case 2:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(0);
                        loadedUser.firstName.should.be.equal("name #0");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return when criteria given", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOne({ where: { firstName: "name #1" }, order: { id: "ASC" } })];
                    case 2:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(1);
                        loadedUser.firstName.should.be.equal("name #1");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return when find options given", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOne({
                                where: {
                                    firstName: "name #99",
                                    secondName: "Doe"
                                },
                                order: {
                                    id: "ASC"
                                }
                            })];
                    case 2:
                        loadedUser = _a.sent();
                        loadedUser.id.should.be.equal(99);
                        loadedUser.firstName.should.be.equal("name #99");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("findOne", function () {
        var _this = this;
        it("should return entity by a given id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOne(0)];
                    case 2:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(0);
                        loadedUser.firstName.should.be.equal("name #0");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOne(1)];
                    case 3:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(1);
                        loadedUser.firstName.should.be.equal("name #1");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOne(99)];
                    case 4:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(99);
                        loadedUser.firstName.should.be.equal("name #99");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return entity by a given id and find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOne(0, {
                                where: {
                                    secondName: "Doe"
                                }
                            })];
                    case 2:
                        loadedUser = _a.sent();
                        loadedUser.id.should.be.equal(0);
                        loadedUser.firstName.should.be.equal("name #0");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOne(1, {
                                where: {
                                    secondName: "Dorian"
                                }
                            })];
                    case 3:
                        loadedUser = _a.sent();
                        chai_1.expect(loadedUser).to.be.undefined;
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("findOneOrFail", function () {
        var _this = this;
        it("should return entity by a given id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOneOrFail(0)];
                    case 2:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(0);
                        loadedUser.firstName.should.be.equal("name #0");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOneOrFail(1)];
                    case 3:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(1);
                        loadedUser.firstName.should.be.equal("name #1");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOneOrFail(99)];
                    case 4:
                        loadedUser = (_a.sent());
                        loadedUser.id.should.be.equal(99);
                        loadedUser.firstName.should.be.equal("name #99");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should return entity by a given id and find options", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOneOrFail(0, {
                                where: {
                                    secondName: "Doe"
                                }
                            })];
                    case 2:
                        loadedUser = _a.sent();
                        loadedUser.id.should.be.equal(0);
                        loadedUser.firstName.should.be.equal("name #0");
                        loadedUser.secondName.should.be.equal("Doe");
                        return [4 /*yield*/, userRepository.findOneOrFail(1, {
                                where: {
                                    secondName: "Dorian"
                                }
                            }).should.eventually.be.rejectedWith(EntityNotFoundError_1.EntityNotFoundError)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should throw an error if nothing was found", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, promises, i, user, savedUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = connection.getRepository("User");
                        promises = [];
                        for (i = 0; i < 100; i++) {
                            user = {
                                id: i,
                                firstName: "name #" + i,
                                secondName: "Doe"
                            };
                            promises.push(userRepository.save(user));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        savedUsers = _a.sent();
                        savedUsers.length.should.be.equal(100); // check if they all are saved
                        return [4 /*yield*/, userRepository.findOneOrFail(100).should.eventually.be.rejectedWith(EntityNotFoundError_1.EntityNotFoundError)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=repostiory-find-methods.js.map