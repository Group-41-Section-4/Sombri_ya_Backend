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
var Counters_1 = require("./entity/Counters");
describe("decorators > embedded", function () {
    var connections;
    beforeEach(function () { return test_utils_1.createTestingConnections({
        entities: [Post_1.Post, Counters_1.Counters]
    }).then(function (all) { return connections = all; }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    afterEach(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("basic functionality", function () {
        var _this = this;
        it("should persist and load entities with embeddeds properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, post, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        post = new Post_1.Post();
                        post.title = "Hello post";
                        post.text = "This is text about the post";
                        post.counters = new Counters_1.Counters();
                        post.counters.comments = 5;
                        post.counters.favorites = 2;
                        post.counters.likes = 1;
                        return [4 /*yield*/, postRepository.save(post)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOne(1)];
                    case 2:
                        loadedPost = (_a.sent());
                        loadedPost.id.should.be.equal(1);
                        loadedPost.title.should.be.equal("Hello post");
                        loadedPost.text.should.be.equal("This is text about the post");
                        loadedPost.counters.should.be.eql({
                            comments: 5,
                            favorites: 2,
                            likes: 1
                        });
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should be used with prop", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, post1, post2, sortedPosts1, sortedPosts2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        post1 = new Post_1.Post();
                        post1.title = "Hello post #1";
                        post1.text = "This is text about the post";
                        post1.counters = new Counters_1.Counters();
                        post1.counters.comments = 5;
                        post1.counters.favorites = 2;
                        post1.counters.likes = 1;
                        return [4 /*yield*/, postRepository.save(post1)];
                    case 1:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.title = "Hello post #2";
                        post2.text = "This is text about the post";
                        post2.counters = new Counters_1.Counters();
                        post2.counters.comments = 6;
                        post2.counters.favorites = 1;
                        post2.counters.likes = 2;
                        return [4 /*yield*/, postRepository.save(post2)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .orderBy("post.counters.comments", "DESC")
                                .getMany()];
                    case 3:
                        sortedPosts1 = _a.sent();
                        sortedPosts1.should.be.eql([{
                                id: 2,
                                title: "Hello post #2",
                                text: "This is text about the post",
                                counters: {
                                    comments: 6,
                                    favorites: 1,
                                    likes: 2
                                }
                            }, {
                                id: 1,
                                title: "Hello post #1",
                                text: "This is text about the post",
                                counters: {
                                    comments: 5,
                                    favorites: 2,
                                    likes: 1
                                }
                            }]);
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .orderBy("post.counters.favorites", "DESC")
                                .getMany()];
                    case 4:
                        sortedPosts2 = _a.sent();
                        sortedPosts2.should.be.eql([{
                                id: 1,
                                title: "Hello post #1",
                                text: "This is text about the post",
                                counters: {
                                    comments: 5,
                                    favorites: 2,
                                    likes: 1
                                }
                            }, {
                                id: 2,
                                title: "Hello post #2",
                                text: "This is text about the post",
                                counters: {
                                    comments: 6,
                                    favorites: 1,
                                    likes: 2
                                }
                            }]);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=query-builder-embedded.js.map