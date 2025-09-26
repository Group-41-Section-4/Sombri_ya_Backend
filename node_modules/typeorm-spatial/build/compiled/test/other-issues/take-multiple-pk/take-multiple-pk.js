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
var test_utils_1 = require("../../utils/test-utils");
var Role_1 = require("./entity/Role");
var User_1 = require("./entity/User");
describe("other issues > using take with multiple primary keys", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1: return [2 /*return*/, (connections = _a.sent())];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should persist successfully and return persisted entity", function () {
        return Promise.all(connections.map(function (connection) {
            return __awaiter(this, void 0, void 0, function () {
                var promises, i, user, i_1, role, loadedUsers1, lefties;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promises = [];
                            for (i = 1; i <= 100; i++) {
                                user = new User_1.User();
                                user.id = i;
                                user.name = "User " + i;
                                user.handedness = i % 10 === 0 ? "left" : "right";
                                user.roles = [];
                                for (i_1 = 1; i_1 <= 5; i_1++) {
                                    role = new Role_1.Role();
                                    role.name = "role #" + i_1;
                                    user.roles.push(role);
                                }
                                promises.push(connection.manager.save(user));
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 1:
                            _a.sent();
                            chai_1.expect(true).to.be.true;
                            return [4 /*yield*/, connection.manager
                                    .createQueryBuilder(User_1.User, "user")
                                    .innerJoinAndSelect("user.roles", "roles")
                                    .take(10)
                                    .orderBy("user.id", "DESC")
                                    .getMany()];
                        case 2:
                            loadedUsers1 = _a.sent();
                            chai_1.expect(loadedUsers1).not.to.be.empty;
                            loadedUsers1.length.should.be.equal(10);
                            loadedUsers1[0].id.should.be.equal(100);
                            loadedUsers1[1].id.should.be.equal(99);
                            loadedUsers1[2].id.should.be.equal(98);
                            loadedUsers1[3].id.should.be.equal(97);
                            loadedUsers1[4].id.should.be.equal(96);
                            loadedUsers1[5].id.should.be.equal(95);
                            loadedUsers1[6].id.should.be.equal(94);
                            loadedUsers1[7].id.should.be.equal(93);
                            loadedUsers1[8].id.should.be.equal(92);
                            loadedUsers1[9].id.should.be.equal(91);
                            return [4 /*yield*/, connection.manager
                                    .createQueryBuilder(User_1.User, "user")
                                    .innerJoinAndSelect("user.roles", "roles")
                                    .where("user.handedness = :handedness", { handedness: "left" })
                                    .take(5)
                                    .orderBy("user.id", "DESC")
                                    .getMany()];
                        case 3:
                            lefties = _a.sent();
                            chai_1.expect(lefties).not.to.be.empty;
                            lefties.length.should.be.equal(5);
                            lefties[0].id.should.be.equal(100);
                            lefties[1].id.should.be.equal(90);
                            lefties[2].id.should.be.equal(80);
                            lefties[3].id.should.be.equal(70);
                            lefties[4].id.should.be.equal(60);
                            lefties[0].roles.length.should.be.equal(5);
                            return [2 /*return*/];
                    }
                });
            });
        }));
    });
});
//# sourceMappingURL=take-multiple-pk.js.map