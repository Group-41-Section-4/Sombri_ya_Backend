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
var test_utils_1 = require("../../utils/test-utils");
var User_1 = require("./entity/User");
var Profile_1 = require("./entity/Profile");
var Information_1 = require("./entity/Information");
var chai_1 = require("chai");
describe("github issues > #1042 EntityMetadata.createPropertyPath does not work properly with objects inside entities (date, json, etc.)", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should update object columns fine, at the same time embedded should work properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, loadedUser, updatedDate, loadedUser2, loadedUser3, loadedUser4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Timber Saw aka Lumberjack";
                    user.registeredAt = new Date();
                    user.profile = new Profile_1.Profile();
                    user.profile.firstName = "Timber";
                    user.profile.lastName = "Saw";
                    user.profile.age = 25;
                    user.information = new Information_1.Information();
                    user.information.maritalStatus = "married";
                    user.information.gender = "male";
                    user.information.address = "Dostoevsky Street";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1)];
                case 2:
                    loadedUser = _a.sent();
                    chai_1.expect(loadedUser).not.to.be.empty;
                    loadedUser.should.be.eql({
                        id: 1,
                        name: "Timber Saw aka Lumberjack",
                        registeredAt: user.registeredAt,
                        profile: {
                            firstName: "Timber",
                            lastName: "Saw",
                            age: 25
                        },
                        information: {
                            maritalStatus: "married",
                            gender: "male",
                            address: "Dostoevsky Street",
                        }
                    });
                    updatedDate = new Date();
                    updatedDate.setFullYear(2016, 1, 1);
                    // update some of the user's properties (registration date)
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({
                            registeredAt: updatedDate
                        })
                            .where({
                            id: 1
                        })
                            .execute()];
                case 3:
                    // update some of the user's properties (registration date)
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1)];
                case 4:
                    loadedUser2 = _a.sent();
                    chai_1.expect(loadedUser2).not.to.be.empty;
                    loadedUser2.should.be.eql({
                        id: 1,
                        name: "Timber Saw aka Lumberjack",
                        registeredAt: updatedDate,
                        profile: {
                            firstName: "Timber",
                            lastName: "Saw",
                            age: 25
                        },
                        information: {
                            maritalStatus: "married",
                            gender: "male",
                            address: "Dostoevsky Street",
                        }
                    });
                    // update some of the user's properties (json object)
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({
                            profile: {
                                firstName: "Lumber",
                                lastName: "Jack",
                                age: 26
                            }
                        })
                            .where({
                            id: 1
                        })
                            .execute()];
                case 5:
                    // update some of the user's properties (json object)
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1)];
                case 6:
                    loadedUser3 = _a.sent();
                    chai_1.expect(loadedUser3).not.to.be.empty;
                    loadedUser3.should.be.eql({
                        id: 1,
                        name: "Timber Saw aka Lumberjack",
                        registeredAt: updatedDate,
                        profile: {
                            firstName: "Lumber",
                            lastName: "Jack",
                            age: 26
                        },
                        information: {
                            maritalStatus: "married",
                            gender: "male",
                            address: "Dostoevsky Street",
                        }
                    });
                    // update some of the user's properties (embedded object)
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({
                            information: {
                                maritalStatus: "divorced",
                                gender: "male",
                                address: "Chehov Street",
                            }
                        })
                            .where({
                            id: 1
                        })
                            .execute()];
                case 7:
                    // update some of the user's properties (embedded object)
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1)];
                case 8:
                    loadedUser4 = _a.sent();
                    chai_1.expect(loadedUser4).not.to.be.empty;
                    loadedUser4.should.be.eql({
                        id: 1,
                        name: "Timber Saw aka Lumberjack",
                        registeredAt: updatedDate,
                        profile: {
                            firstName: "Lumber",
                            lastName: "Jack",
                            age: 26
                        },
                        information: {
                            maritalStatus: "divorced",
                            gender: "male",
                            address: "Chehov Street",
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1042.js.map