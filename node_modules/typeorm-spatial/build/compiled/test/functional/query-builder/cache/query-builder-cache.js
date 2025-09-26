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
describe("query builder > cache", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        cache: true,
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should cache results properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, users1, user4, users2, users3, users4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.firstName = "Timber";
                    user1.lastName = "Saw";
                    user1.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.firstName = "Alex";
                    user2.lastName = "Messer";
                    user2.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.firstName = "Umed";
                    user3.lastName = "Pleerock";
                    user3.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getMany()];
                case 4:
                    users1 = _a.sent();
                    chai_1.expect(users1.length).to.be.equal(1);
                    user4 = new User_1.User();
                    user4.firstName = "Bakhrom";
                    user4.lastName = "Brochik";
                    user4.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user4)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .getMany()];
                case 6:
                    users2 = _a.sent();
                    chai_1.expect(users2.length).to.be.equal(2);
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getMany()];
                case 7:
                    users3 = _a.sent();
                    chai_1.expect(users3.length).to.be.equal(1);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 8:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getMany()];
                case 9:
                    users4 = _a.sent();
                    chai_1.expect(users4.length).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should cache results with pagination enabled properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, users1, user4, users2, users3, users4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.firstName = "Timber";
                    user1.lastName = "Saw";
                    user1.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.firstName = "Alex";
                    user2.lastName = "Messer";
                    user2.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.firstName = "Umed";
                    user3.lastName = "Pleerock";
                    user3.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .orderBy("user.id")
                            .cache(true)
                            .getMany()];
                case 4:
                    users1 = _a.sent();
                    chai_1.expect(users1.length).to.be.equal(1);
                    user4 = new User_1.User();
                    user4.firstName = "Bakhrom";
                    user4.lastName = "Bro";
                    user4.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user4)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .orderBy("user.id")
                            .getMany()];
                case 6:
                    users2 = _a.sent();
                    chai_1.expect(users2.length).to.be.equal(2);
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .cache(true)
                            .orderBy("user.id")
                            .getMany()];
                case 7:
                    users3 = _a.sent();
                    chai_1.expect(users3.length).to.be.equal(1);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 8:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .cache(true)
                            .orderBy("user.id")
                            .getMany()];
                case 9:
                    users4 = _a.sent();
                    chai_1.expect(users4.length).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should cache results with custom id and duration supplied", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, users1, user4, users2, users3, users4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.firstName = "Timber";
                    user1.lastName = "Saw";
                    user1.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.firstName = "Alex";
                    user2.lastName = "Messer";
                    user2.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.firstName = "Umed";
                    user3.lastName = "Pleerock";
                    user3.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .cache("user_admins", 2000)
                            .orderBy("user.id")
                            .getMany()];
                case 4:
                    users1 = _a.sent();
                    chai_1.expect(users1.length).to.be.equal(1);
                    user4 = new User_1.User();
                    user4.firstName = "Bakhrom";
                    user4.lastName = "Bro";
                    user4.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user4)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .orderBy("user.id")
                            .getMany()];
                case 6:
                    users2 = _a.sent();
                    chai_1.expect(users2.length).to.be.equal(2);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 7:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .orderBy("user.id")
                            .cache("user_admins", 2000)
                            .getMany()];
                case 8:
                    users3 = _a.sent();
                    chai_1.expect(users3.length).to.be.equal(1);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 9:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: false })
                            .skip(1)
                            .take(5)
                            .orderBy("user.id")
                            .cache("user_admins", 2000)
                            .getMany()];
                case 10:
                    users4 = _a.sent();
                    chai_1.expect(users4.length).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should cache results with custom id and duration supplied", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, users1, user4, users2, users3, users4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.firstName = "Timber";
                    user1.lastName = "Saw";
                    user1.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.firstName = "Alex";
                    user2.lastName = "Messer";
                    user2.isAdmin = false;
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.firstName = "Umed";
                    user3.lastName = "Pleerock";
                    user3.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getCount()];
                case 4:
                    users1 = _a.sent();
                    chai_1.expect(users1).to.be.equal(1);
                    user4 = new User_1.User();
                    user4.firstName = "Bakhrom";
                    user4.lastName = "Brochik";
                    user4.isAdmin = true;
                    return [4 /*yield*/, connection.manager.save(user4)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .getCount()];
                case 6:
                    users2 = _a.sent();
                    chai_1.expect(users2).to.be.equal(2);
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getCount()];
                case 7:
                    users3 = _a.sent();
                    chai_1.expect(users3).to.be.equal(1);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 8:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(User_1.User, "user")
                            .where("user.isAdmin = :isAdmin", { isAdmin: true })
                            .cache(true)
                            .getCount()];
                case 9:
                    users4 = _a.sent();
                    chai_1.expect(users4).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-cache.js.map