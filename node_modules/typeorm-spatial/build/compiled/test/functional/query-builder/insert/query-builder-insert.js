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
var User_1 = require("./entity/User");
var SqlServerDriver_1 = require("../../../../src/driver/sqlserver/SqlServerDriver");
var Photo_1 = require("./entity/Photo");
var AbstractSqliteDriver_1 = require("../../../../src/driver/sqlite-abstract/AbstractSqliteDriver");
var OracleDriver_1 = require("../../../../src/driver/oracle/OracleDriver");
describe("query builder > insert", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        dropSchema: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should perform insertion correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Alex Messer";
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .insert()
                            .into(User_1.User)
                            .values(user)
                            .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .insert()
                            .into(User_1.User)
                            .values({
                            name: "Dima Zotov"
                        })
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("user")
                            .insert()
                            .values({ name: "Muhammad Mirzoev" })
                            .execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).find()];
                case 4:
                    users = _a.sent();
                    users.should.be.eql([
                        { id: 1, name: "Alex Messer" },
                        { id: 2, name: "Dima Zotov" },
                        { id: 3, name: "Muhammad Mirzoev" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should perform bulk insertion correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // it is skipped for Oracle because it does not support bulk insertion
                    if (connection.driver instanceof OracleDriver_1.OracleDriver)
                        return [2 /*return*/];
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .insert()
                            .into(User_1.User)
                            .values([
                            { name: "Umed Khudoiberdiev" },
                            { name: "Bakhrom Baubekov" },
                            { name: "Bakhodur Kandikov" },
                        ])
                            .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).find()];
                case 2:
                    users = _a.sent();
                    users.should.be.eql([
                        { id: 1, name: "Umed Khudoiberdiev" },
                        { id: 2, name: "Bakhrom Baubekov" },
                        { id: 3, name: "Bakhodur Kandikov" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to use sql functions", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedUser1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.createQueryBuilder()
                        .insert()
                        .into(User_1.User)
                        .values({
                        name: function () { return connection.driver instanceof SqlServerDriver_1.SqlServerDriver ? "SUBSTRING('Dima Zotov', 1, 4)" : "SUBSTR('Dima Zotov', 1, 4)"; }
                    })
                        .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Dima" })];
                case 2:
                    loadedUser1 = _a.sent();
                    chai_1.expect(loadedUser1).to.exist;
                    loadedUser1.name.should.be.equal("Dima");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to insert entities with different properties set even inside embeds", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedPhoto1, loadedPhoto2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // this test is skipped for sqlite based drivers because it does not support DEFAULT values in insertions,
                    // also it is skipped for Oracle because it does not support bulk insertion
                    if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver || connection.driver instanceof OracleDriver_1.OracleDriver)
                        return [2 /*return*/];
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .insert()
                            .into(Photo_1.Photo)
                            .values([{
                                url: "1.jpg",
                                counters: {
                                    likes: 1,
                                    favorites: 1,
                                    comments: 1,
                                }
                            }, {
                                url: "2.jpg"
                            }])
                            .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "1.jpg" })];
                case 2:
                    loadedPhoto1 = _a.sent();
                    chai_1.expect(loadedPhoto1).to.exist;
                    loadedPhoto1.should.be.eql({
                        id: 1,
                        url: "1.jpg",
                        counters: {
                            likes: 1,
                            favorites: 1,
                            comments: 1,
                        }
                    });
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "2.jpg" })];
                case 3:
                    loadedPhoto2 = _a.sent();
                    chai_1.expect(loadedPhoto2).to.exist;
                    loadedPhoto2.should.be.eql({
                        id: 2,
                        url: "2.jpg",
                        counters: {
                            likes: 1,
                            favorites: null,
                            comments: 0,
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-insert.js.map