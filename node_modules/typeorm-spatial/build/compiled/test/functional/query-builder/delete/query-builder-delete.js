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
var Photo_1 = require("./entity/Photo");
describe("query builder > delete", function () {
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
    it("should perform deletion correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, loadedUser1, user2, loadedUser2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.name = "Alex Messer";
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .delete()
                            .from(User_1.User)
                            .where("name = :name", { name: "Alex Messer" })
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Dima Zotov" })];
                case 3:
                    loadedUser1 = _a.sent();
                    chai_1.expect(loadedUser1).to.not.exist;
                    user2 = new User_1.User();
                    user2.name = "Alex Messer";
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .createQueryBuilder("myUser")
                            .delete()
                            .where("name = :name", { name: "Dima Zotov" })
                            .execute()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).findOne({ name: "Dima Zotov" })];
                case 6:
                    loadedUser2 = _a.sent();
                    chai_1.expect(loadedUser2).to.not.exist;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to delete entities by embed criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedPhoto1, loadedPhoto2, loadedPhoto3, loadedPhoto4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // save few photos
                return [4 /*yield*/, connection.manager.save(Photo_1.Photo, { url: "1.jpg" })];
                case 1:
                    // save few photos
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(Photo_1.Photo, {
                            url: "2.jpg",
                            counters: {
                                likes: 2,
                                favorites: 1,
                                comments: 1,
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(Photo_1.Photo, { url: "3.jpg" })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ counters: { likes: 2 } })];
                case 4:
                    loadedPhoto1 = _a.sent();
                    chai_1.expect(loadedPhoto1).to.exist;
                    loadedPhoto1.should.be.eql({
                        id: 2,
                        url: "2.jpg",
                        counters: {
                            likes: 2,
                            favorites: 1,
                            comments: 1,
                        }
                    });
                    // delete photo now
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo)
                            .createQueryBuilder("photo")
                            .delete()
                            .where({
                            counters: {
                                likes: 2
                            }
                        })
                            .execute()];
                case 5:
                    // delete photo now
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "1.jpg" })];
                case 6:
                    loadedPhoto2 = _a.sent();
                    chai_1.expect(loadedPhoto2).to.exist;
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "2.jpg" })];
                case 7:
                    loadedPhoto3 = _a.sent();
                    chai_1.expect(loadedPhoto3).not.to.exist;
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({ url: "3.jpg" })];
                case 8:
                    loadedPhoto4 = _a.sent();
                    chai_1.expect(loadedPhoto4).to.exist;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-delete.js.map