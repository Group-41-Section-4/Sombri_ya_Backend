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
var MysqlDriver_1 = require("../../../../src/driver/mysql/MysqlDriver");
var SqlServerDriver_1 = require("../../../../src/driver/sqlserver/SqlServerDriver");
var LimitOnUpdateNotSupportedError_1 = require("../../../../src/error/LimitOnUpdateNotSupportedError");
var Photo_1 = require("./entity/Photo");
describe("query builder > update", function () {
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
    it("should perform updation correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, loadedUser1, loadedUser2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Alex Messer";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({ name: "Dima Zotov" })
                            .where("name = :name", { name: "Alex Messer" })
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Dima Zotov" })];
                case 3:
                    loadedUser1 = _a.sent();
                    chai_1.expect(loadedUser1).to.exist;
                    loadedUser1.name.should.be.equal("Dima Zotov");
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("myUser")
                            .update()
                            .set({ name: "Muhammad Mirzoev" })
                            .where("name = :name", { name: "Dima Zotov" })
                            .execute()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Muhammad Mirzoev" })];
                case 5:
                    loadedUser2 = _a.sent();
                    chai_1.expect(loadedUser2).to.exist;
                    loadedUser2.name.should.be.equal("Muhammad Mirzoev");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to use sql functions", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, loadedUser1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Alex Messer";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({ name: function () { return connection.driver instanceof SqlServerDriver_1.SqlServerDriver ? "SUBSTRING('Dima Zotov', 1, 4)" : "SUBSTR('Dima Zotov', 1, 4)"; } })
                            .where("name = :name", { name: function () { return connection.driver instanceof SqlServerDriver_1.SqlServerDriver ? "SUBSTRING('Alex Messer Dimovich', 1, 11)" : "SUBSTR('Alex Messer Dimovich', 1, 11)"; } })
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Dima" })];
                case 3:
                    loadedUser1 = _a.sent();
                    chai_1.expect(loadedUser1).to.exist;
                    loadedUser1.name.should.be.equal("Dima");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update and escape properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, qb, loadedUser1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Dima";
                    user.likesCount = 1;
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    qb = connection.createQueryBuilder();
                    return [4 /*yield*/, qb
                            .update(User_1.User)
                            .set({ likesCount: function () { return qb.escape("likesCount") + " + 1"; } })
                            // .set({ likesCount: 2 })
                            .where("likesCount = 1")
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ likesCount: 2 })];
                case 3:
                    loadedUser1 = _a.sent();
                    chai_1.expect(loadedUser1).to.exist;
                    loadedUser1.name.should.be.equal("Dima");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update properties inside embeds as well", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedPhoto1, loadedPhoto2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // save few photos
                return [4 /*yield*/, connection.manager.save(Photo_1.Photo, {
                        url: "1.jpg",
                        counters: {
                            likes: 2,
                            favorites: 1,
                            comments: 1,
                        }
                    })];
                case 1:
                    // save few photos
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(Photo_1.Photo, {
                            url: "2.jpg",
                            counters: {
                                likes: 0,
                                favorites: 1,
                                comments: 1,
                            }
                        })];
                case 2:
                    _a.sent();
                    // update photo now
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo)
                            .createQueryBuilder("photo")
                            .update()
                            .set({
                            counters: {
                                likes: 3
                            }
                        })
                            .where({
                            counters: {
                                likes: 2
                            }
                        })
                            .execute()];
                case 3:
                    // update photo now
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "1.jpg" })];
                case 4:
                    loadedPhoto1 = _a.sent();
                    chai_1.expect(loadedPhoto1).to.exist;
                    loadedPhoto1.should.be.eql({
                        id: 1,
                        url: "1.jpg",
                        counters: {
                            likes: 3,
                            favorites: 1,
                            comments: 1,
                        }
                    });
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "2.jpg" })];
                case 5:
                    loadedPhoto2 = _a.sent();
                    chai_1.expect(loadedPhoto2).to.exist;
                    loadedPhoto2.should.be.eql({
                        id: 2,
                        url: "2.jpg",
                        counters: {
                            likes: 0,
                            favorites: 1,
                            comments: 1,
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should perform update with limit correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, limitNum, nameToFind, loadedUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.name = "Alex Messer";
                    user2 = new User_1.User();
                    user2.name = "Muhammad Mirzoev";
                    user3 = new User_1.User();
                    user3.name = "Brad Porter";
                    return [4 /*yield*/, connection.manager.save([user1, user2, user3])];
                case 1:
                    _a.sent();
                    limitNum = 2;
                    nameToFind = "Dima Zotov";
                    if (!(connection.driver instanceof MysqlDriver_1.MysqlDriver)) return [3 /*break*/, 4];
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({ name: nameToFind })
                            .limit(limitNum)
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).find({ name: nameToFind })];
                case 3:
                    loadedUsers = _a.sent();
                    chai_1.expect(loadedUsers).to.exist;
                    loadedUsers.length.should.be.equal(limitNum);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, connection.createQueryBuilder()
                        .update(User_1.User)
                        .set({ name: nameToFind })
                        .limit(limitNum)
                        .execute().should.be.rejectedWith(LimitOnUpdateNotSupportedError_1.LimitOnUpdateNotSupportedError)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-update.js.map