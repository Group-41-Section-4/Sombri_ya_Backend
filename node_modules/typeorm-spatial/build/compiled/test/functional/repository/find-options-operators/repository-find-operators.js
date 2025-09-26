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
var test_utils_1 = require("../../../utils/test-utils");
var src_1 = require("../../../../src");
var Post_1 = require("./entity/Post");
var PostgresDriver_1 = require("../../../../src/driver/postgres/PostgresDriver");
var Raw_1 = require("../../../../src/find-options/operator/Raw");
describe("repository > find options > operators", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("not", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not("About #1")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("lessThan", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.LessThan(10)
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(lessThan)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.LessThan(10))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("moreThan", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.MoreThan(10)
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(moreThan)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.MoreThan(10))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("equal", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Equal("About #2")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(equal)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Equal("About #2"))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("like", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Like("%out #%")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(like)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Like("%out #1"))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("between", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(1, 10)
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(10, 13)
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(1, 20)
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(between)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(1, 10))
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(10, 13))
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(1, 20))
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("in", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.In(["About #2", "About #3"])
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(in)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.In(["About #1", "About #3"]))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("any", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Any(["About #2", "About #3"])
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(any)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Any(["About #2", "About #3"]))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("isNull", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = null;
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.IsNull()
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: null }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(isNull)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = null;
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.IsNull())
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("raw", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: Raw_1.Raw("12")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("raw (function)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: Raw_1.Raw(function (columnAlias) { return "1 + " + columnAlias + " = 4"; })
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=repository-find-operators.js.map