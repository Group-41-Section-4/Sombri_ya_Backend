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
var Post_1 = require("./entity/Post");
var Counters_1 = require("./entity/Counters");
var chai_1 = require("chai");
var test_utils_1 = require("../../../utils/test-utils");
var Subcounters_1 = require("./entity/Subcounters");
var User_1 = require("./entity/User");
describe("embedded > embedded-one-to-one", function () {
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
        it("should insert, load, update and remove entities with embeddeds when embedded entity having OneToOne relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var user1, user2, user3, postRepository, post1, post2, loadedPosts, loadedPost, loadedPost2, loadedPosts2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user1 = new User_1.User();
                        user1.name = "Alice";
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(user1)];
                    case 1:
                        _a.sent();
                        user2 = new User_1.User();
                        user2.name = "Bob";
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(user2)];
                    case 2:
                        _a.sent();
                        user3 = new User_1.User();
                        user3.name = "Clara";
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(user3)];
                    case 3:
                        _a.sent();
                        postRepository = connection.getRepository(Post_1.Post);
                        post1 = new Post_1.Post();
                        post1.title = "About cars";
                        post1.counters = new Counters_1.Counters();
                        post1.counters.code = 1;
                        post1.counters.comments = 1;
                        post1.counters.favorites = 2;
                        post1.counters.likes = 3;
                        post1.counters.likedUser = user1;
                        post1.counters.subcounters = new Subcounters_1.Subcounters();
                        post1.counters.subcounters.version = 1;
                        post1.counters.subcounters.watches = 5;
                        return [4 /*yield*/, postRepository.save(post1)];
                    case 4:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.title = "About airplanes";
                        post2.counters = new Counters_1.Counters();
                        post2.counters.code = 2;
                        post2.counters.comments = 2;
                        post2.counters.favorites = 3;
                        post2.counters.likes = 4;
                        post2.counters.likedUser = user2;
                        post2.counters.subcounters = new Subcounters_1.Subcounters();
                        post2.counters.subcounters.version = 1;
                        post2.counters.subcounters.watches = 10;
                        return [4 /*yield*/, postRepository.save(post2)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .leftJoinAndSelect("post.counters.likedUser", "likedUser")
                                .orderBy("post.id")
                                .getMany()];
                    case 6:
                        loadedPosts = _a.sent();
                        chai_1.expect(loadedPosts[0].should.be.eql({
                            id: 1,
                            title: "About cars",
                            counters: {
                                code: 1,
                                comments: 1,
                                favorites: 2,
                                likes: 3,
                                likedUser: { id: 1, name: "Alice" },
                                subcounters: {
                                    version: 1,
                                    watches: 5
                                }
                            }
                        }));
                        chai_1.expect(loadedPosts[1].should.be.eql({
                            id: 2,
                            title: "About airplanes",
                            counters: {
                                code: 2,
                                comments: 2,
                                favorites: 3,
                                likes: 4,
                                likedUser: { id: 2, name: "Bob" },
                                subcounters: {
                                    version: 1,
                                    watches: 10
                                }
                            }
                        }));
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .leftJoinAndSelect("post.counters.likedUser", "likedUser")
                                .where("post.id = :id", { id: 1 })
                                .getOne()];
                    case 7:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost.should.be.eql({
                            id: 1,
                            title: "About cars",
                            counters: {
                                code: 1,
                                comments: 1,
                                favorites: 2,
                                likes: 3,
                                likedUser: { id: 1, name: "Alice" },
                                subcounters: {
                                    version: 1,
                                    watches: 5
                                }
                            }
                        }));
                        loadedPost.counters.favorites += 1;
                        loadedPost.counters.subcounters.watches += 1;
                        loadedPost.counters.likedUser = user3;
                        return [4 /*yield*/, postRepository.save(loadedPost)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(Post_1.Post, "post")
                                .leftJoinAndSelect("post.counters.likedUser", "likedUser")
                                .where("post.id = :id", { id: 1 })
                                .getOne()];
                    case 9:
                        loadedPost2 = _a.sent();
                        chai_1.expect(loadedPost2.should.be.eql({
                            id: 1,
                            title: "About cars",
                            counters: {
                                code: 1,
                                comments: 1,
                                favorites: 3,
                                likes: 3,
                                likedUser: { id: 3, name: "Clara" },
                                subcounters: {
                                    version: 1,
                                    watches: 6
                                }
                            }
                        }));
                        return [4 /*yield*/, postRepository.remove(loadedPost2)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, postRepository.find()];
                    case 11:
                        loadedPosts2 = (_a.sent());
                        chai_1.expect(loadedPosts2.length).to.be.equal(1);
                        chai_1.expect(loadedPosts2[0].title).to.be.equal("About airplanes");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    // uncomment this section once inverse side persistment of one-to-one relation will be finished
    describe.skip("inverse side", function () {
        it("should insert, load, update and remove entities with embeddeds when embedded entity having OneToOne relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var post1, post2, post3, user1, user2, loadedUsers, loadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post1 = new Post_1.Post();
                        post1.title = "About cars";
                        post1.counters = new Counters_1.Counters();
                        post1.counters.code = 1;
                        post1.counters.comments = 1;
                        post1.counters.favorites = 2;
                        post1.counters.likes = 3;
                        post1.counters.subcounters = new Subcounters_1.Subcounters();
                        post1.counters.subcounters.version = 1;
                        post1.counters.subcounters.watches = 5;
                        return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.title = "About airplanes";
                        post2.counters = new Counters_1.Counters();
                        post2.counters.code = 2;
                        post2.counters.comments = 2;
                        post2.counters.favorites = 3;
                        post2.counters.likes = 4;
                        post2.counters.subcounters = new Subcounters_1.Subcounters();
                        post2.counters.subcounters.version = 1;
                        post2.counters.subcounters.watches = 10;
                        return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post2)];
                    case 2:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.title = "About horses";
                        post3.counters = new Counters_1.Counters();
                        post3.counters.code = 3;
                        post3.counters.comments = 4;
                        post3.counters.favorites = 5;
                        post3.counters.likes = 6;
                        post3.counters.subcounters = new Subcounters_1.Subcounters();
                        post3.counters.subcounters.version = 1;
                        post3.counters.subcounters.watches = 12;
                        return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post3)];
                    case 3:
                        _a.sent();
                        user1 = new User_1.User();
                        user1.name = "Alice";
                        user1.likedPost = post1;
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(user1)];
                    case 4:
                        _a.sent();
                        user2 = new User_1.User();
                        user2.name = "Bob";
                        user2.likedPost = post2;
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(user2)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(User_1.User, "user")
                                .leftJoinAndSelect("user.likedPost", "likedPost")
                                .orderBy("user.id")
                                .getMany()];
                    case 6:
                        loadedUsers = _a.sent();
                        chai_1.expect(loadedUsers[0].should.be.eql({
                            id: 1,
                            name: "Alice",
                            likedPost: {
                                id: 1,
                                title: "About cars",
                                counters: {
                                    code: 1,
                                    comments: 1,
                                    favorites: 2,
                                    likes: 3,
                                    subcounters: {
                                        version: 1,
                                        watches: 5
                                    }
                                }
                            }
                        }));
                        chai_1.expect(loadedUsers[1].should.be.eql({
                            id: 2,
                            name: "Bob",
                            likedPost: {
                                id: 2,
                                title: "About airplanes",
                                counters: {
                                    code: 2,
                                    comments: 2,
                                    favorites: 3,
                                    likes: 4,
                                    subcounters: {
                                        version: 1,
                                        watches: 10
                                    }
                                }
                            }
                        }));
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(User_1.User, "user")
                                .leftJoinAndSelect("user.likedPost", "likedPost")
                                .where("user.id = :id", { id: 1 })
                                .getOne()];
                    case 7:
                        loadedUser = _a.sent();
                        chai_1.expect(loadedUser.should.be.eql({
                            id: 1,
                            name: "Alice",
                            likedPost: {
                                id: 1,
                                title: "About cars",
                                counters: {
                                    code: 1,
                                    comments: 1,
                                    favorites: 2,
                                    likes: 3,
                                    subcounters: {
                                        version: 1,
                                        watches: 5
                                    }
                                }
                            }
                        }));
                        loadedUser.name = "Anna";
                        loadedUser.likedPost = post3;
                        return [4 /*yield*/, connection.getRepository(User_1.User).save(loadedUser)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder(User_1.User, "user")
                                .leftJoinAndSelect("user.likedPost", "likedPost")
                                .where("user.id = :id", { id: 1 })
                                .getOne()];
                    case 9:
                        loadedUser = _a.sent();
                        console.log(loadedUser);
                        chai_1.expect(loadedUser.should.be.eql({
                            id: 1,
                            name: "Anna",
                            likedPost: {
                                id: 3,
                                title: "About horses",
                                counters: {
                                    code: 3,
                                    comments: 4,
                                    favorites: 5,
                                    likes: 6,
                                    subcounters: {
                                        version: 1,
                                        watches: 12
                                    }
                                }
                            }
                        }));
                        return [4 /*yield*/, connection.getRepository(User_1.User).remove(loadedUser)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, connection.getRepository(User_1.User).find()];
                    case 11:
                        loadedUsers = (_a.sent());
                        chai_1.expect(loadedUsers.length).to.be.equal(1);
                        chai_1.expect(loadedUsers[0].name).to.be.equal("Bob");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=embedded-one-to-one.js.map