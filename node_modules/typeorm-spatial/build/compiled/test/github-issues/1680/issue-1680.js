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
var chai_1 = require("chai");
describe("github issues > #1680 Delete & Update applies to all entities in table if criteria is undefined or empty", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchema: true,
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("Delete & Update should throw an error when supplied with an empty criteria", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var userA, userB, userC, problematicCriterias, _loop_1, _i, problematicCriterias_1, criteria, _loop_2, _a, problematicCriterias_2, criteria;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userA = new User_1.User();
                    userA.name = "User A";
                    userB = new User_1.User();
                    userB.name = "User B";
                    userC = new User_1.User();
                    userC.name = "User C";
                    return [4 /*yield*/, connection.manager.save([userA, userB, userC])];
                case 1:
                    _b.sent();
                    problematicCriterias = [null, undefined, [], ""];
                    _loop_1 = function (criteria) {
                        var error;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    error = null;
                                    return [4 /*yield*/, connection.manager.delete(User_1.User, criteria).catch(function (err) { return error = err; })];
                                case 1:
                                    _a.sent();
                                    chai_1.expect(error).to.be.instanceof(Error);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, problematicCriterias_1 = problematicCriterias;
                    _b.label = 2;
                case 2:
                    if (!(_i < problematicCriterias_1.length)) return [3 /*break*/, 5];
                    criteria = problematicCriterias_1[_i];
                    return [5 /*yield**/, _loop_1(criteria)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    _loop_2 = function (criteria) {
                        var error;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    error = null;
                                    return [4 /*yield*/, connection.manager.update(User_1.User, criteria, {
                                            name: "Override Name"
                                        }).catch(function (err) { return error = err; })];
                                case 1:
                                    _a.sent();
                                    chai_1.expect(error).to.be.instanceof(Error);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, problematicCriterias_2 = problematicCriterias;
                    _b.label = 6;
                case 6:
                    if (!(_a < problematicCriterias_2.length)) return [3 /*break*/, 9];
                    criteria = problematicCriterias_2[_a];
                    return [5 /*yield**/, _loop_2(criteria)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9: 
                // Ensure normal deleting works
                return [4 /*yield*/, connection.manager.delete(User_1.User, 3)];
                case 10:
                    // Ensure normal deleting works
                    _b.sent();
                    // Ensure normal updating works
                    return [4 /*yield*/, connection.manager.update(User_1.User, 2, { name: "User B Updated" })];
                case 11:
                    // Ensure normal updating works
                    _b.sent();
                    // All users should still exist except for User C
                    return [4 /*yield*/, connection.manager.find(User_1.User).should.eventually.eql([{
                                id: 1,
                                name: "User A"
                            }, {
                                id: 2,
                                name: "User B Updated"
                            }])];
                case 12:
                    // All users should still exist except for User C
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1680.js.map