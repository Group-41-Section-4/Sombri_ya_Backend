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
var User_1 = require("./entity/User");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
describe("query builder > sub-query", function () {
    // -------------------------------------------------------------------------
    // Prepare
    // -------------------------------------------------------------------------
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
    // Reusable functions
    // -------------------------------------------------------------------------
    function prepare(connection) {
        return __awaiter(this, void 0, void 0, function () {
            var user1, user2, user3, category1, category2, post1, post2, post3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user1 = new User_1.User();
                        user1.name = "Alex Messer";
                        user1.registered = true;
                        return [4 /*yield*/, connection.manager.save(user1)];
                    case 1:
                        _a.sent();
                        user2 = new User_1.User();
                        user2.name = "Dima Zotov";
                        user2.registered = true;
                        return [4 /*yield*/, connection.manager.save(user2)];
                    case 2:
                        _a.sent();
                        user3 = new User_1.User();
                        user3.name = "Umed Khudoiberdiev";
                        user3.registered = false;
                        return [4 /*yield*/, connection.manager.save(user3)];
                    case 3:
                        _a.sent();
                        category1 = new Category_1.Category();
                        category1.name = "Alex Messer";
                        return [4 /*yield*/, connection.manager.save(category1)];
                    case 4:
                        _a.sent();
                        category2 = new Category_1.Category();
                        category2.name = "Dima Zotov";
                        return [4 /*yield*/, connection.manager.save(category2)];
                    case 5:
                        _a.sent();
                        post1 = new Post_1.Post();
                        post1.title = "Alex Messer";
                        post1.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 6:
                        _a.sent();
                        post2 = new Post_1.Post();
                        post2.title = "Dima Zotov";
                        post2.categories = [category1, category2];
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 7:
                        _a.sent();
                        post3 = new Post_1.Post();
                        post3.title = "Umed Khudoiberdiev";
                        return [4 /*yield*/, connection.manager.save(post3)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should execute sub query in where string using subQuery method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var qb, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).createQueryBuilder("post")];
                case 2:
                    qb = _a.sent();
                    return [4 /*yield*/, qb
                            .where("post.title IN " + qb.subQuery().select("usr.name").from(User_1.User, "usr").where("usr.registered = :registered").getQuery())
                            .setParameter("registered", true)
                            .orderBy("post.id")
                            .getMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in where function using subQuery method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .where(function (qb) {
                            var subQuery = qb.subQuery()
                                .select("usr.name")
                                .from(User_1.User, "usr")
                                .where("usr.registered = :registered")
                                .getQuery();
                            return "post.title IN " + subQuery;
                        })
                            .setParameter("registered", true)
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in where function using subQuery method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .where(function (qb) {
                            var subQuery = qb.subQuery()
                                .select("usr.name")
                                .from(User_1.User, "usr")
                                .where("usr.registered = :registered")
                                .getQuery();
                            return "post.title IN " + subQuery;
                        })
                            .setParameter("registered", true)
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query using different query builder", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var userQb, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("usr")
                            .select("usr.name")
                            .where("usr.registered = :registered", { registered: true })];
                case 2:
                    userQb = _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .where("post.title IN (" + userQb.getQuery() + ")")
                            .setParameters(userQb.getParameters())
                            .orderBy("post.id")
                            .getMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in from expression (using different query builder)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var userQb, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("usr")
                            .select("usr.name", "name")
                            .where("usr.registered = :registered", { registered: true })];
                case 2:
                    userQb = _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select(connection.driver.escape("usr") + "." + connection.driver.escape("name"), "name")
                            .from("(" + userQb.getQuery() + ")", "usr")
                            .setParameters(userQb.getParameters())
                            .getRawMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { name: "Alex Messer" },
                        { name: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in from expression (using from's query builder)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var userQb, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("usr")
                            .select("usr.name", "name")
                            .where("usr.registered = :registered", { registered: true })];
                case 2:
                    userQb = _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select(connection.driver.escape("usr") + "." + connection.driver.escape("name"), "name")
                            .from(function (subQuery) {
                            return subQuery
                                .select("usr.name", "name")
                                .from(User_1.User, "usr")
                                .where("usr.registered = :registered", { registered: true });
                        }, "usr")
                            .setParameters(userQb.getParameters())
                            .getRawMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { name: "Alex Messer" },
                        { name: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in from expression (using from's query builder)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var userQb, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("usr")
                            .select("usr.name", "name")
                            .where("usr.registered = :registered", { registered: true })];
                case 2:
                    userQb = _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select(connection.driver.escape("usr") + "." + connection.driver.escape("name"), "name")
                            .from(function (subQuery) {
                            return subQuery
                                .select("usr.name", "name")
                                .from(User_1.User, "usr")
                                .where("usr.registered = :registered", { registered: true });
                        }, "usr")
                            .setParameters(userQb.getParameters())
                            .getRawMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { name: "Alex Messer" },
                        { name: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in from expression as second from expression", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select("post")
                            .from(Post_1.Post, "post")
                            .addFrom(function (subQuery) {
                            return subQuery
                                .select("usr.name", "name")
                                .from(User_1.User, "usr")
                                .where("usr.registered = :registered", { registered: true });
                        }, "usr")
                            .where(connection.driver.escape("post") + "." + connection.driver.escape("title") + " = " + connection.driver.escape("usr") + "." + connection.driver.escape("name"))
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in selects", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var subQuery, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    subQuery = connection
                        .createQueryBuilder()
                        .select("usr.name", "name")
                        .from(User_1.User, "usr")
                        .limit(1)
                        .orderBy("usr.name")
                        .getQuery();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select("post.id", "id")
                            .addSelect("(" + subQuery + ")", "name")
                            .from(Post_1.Post, "post")
                            .orderBy("post.id")
                            .getRawMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, name: "Alex Messer" },
                        { id: 2, name: "Alex Messer" },
                        { id: 3, name: "Alex Messer" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in selects (using provided sub query builder)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .select("post.id", "id")
                            .addSelect(function (subQuery) {
                            return subQuery
                                .select("usr.name", "name")
                                .from(User_1.User, "usr")
                                .orderBy("usr.name")
                                .limit(1);
                        }, "name")
                            .from(Post_1.Post, "post")
                            .orderBy("post.id")
                            .getRawMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, name: "Alex Messer" },
                        { id: 2, name: "Alex Messer" },
                        { id: 3, name: "Alex Messer" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in joins (using provided sub query builder)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var subQuery, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    subQuery = connection
                        .createQueryBuilder()
                        .select("usr.name", "name")
                        .from(User_1.User, "usr")
                        .getQuery();
                    return [4 /*yield*/, connection
                            .getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .innerJoin("post.categories", "category", connection.driver.escape("category") + "." + connection.driver.escape("name") + " IN (" + subQuery + ")")
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in joins with subquery factory (as selection)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var joinConditionSubQuery, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    joinConditionSubQuery = connection
                        .createQueryBuilder()
                        .select("usr.name", "name")
                        .from(User_1.User, "usr")
                        .getQuery();
                    return [4 /*yield*/, connection
                            .getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .innerJoin(function (subQuery) {
                            return subQuery.select().from("category", "category");
                        }, "category", connection.driver.escape("category") + "." + connection.driver.escape("name") + " IN (" + joinConditionSubQuery + ")")
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                        { id: 3, title: "Umed Khudoiberdiev" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute sub query in joins as string (as selection)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var joinConditionSubQuery, joinSubQuery, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepare(connection)];
                case 1:
                    _a.sent();
                    joinConditionSubQuery = connection
                        .createQueryBuilder()
                        .select("usr.name", "name")
                        .from(User_1.User, "usr")
                        .getQuery();
                    joinSubQuery = connection
                        .createQueryBuilder()
                        .select()
                        .from("category", "category")
                        .getQuery();
                    return [4 /*yield*/, connection
                            .getRepository(Post_1.Post)
                            .createQueryBuilder("post")
                            .innerJoin("(" + joinSubQuery + ")", "category", connection.driver.escape("category") + "." + connection.driver.escape("name") + " IN (" + joinConditionSubQuery + ")")
                            .orderBy("post.id")
                            .getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Alex Messer" },
                        { id: 2, title: "Dima Zotov" },
                        { id: 3, title: "Umed Khudoiberdiev" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-subquery.js.map