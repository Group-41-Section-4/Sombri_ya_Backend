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
var SpecificUser_1 = require("./entity/SpecificUser");
var chai_1 = require("chai");
describe("github issue > #1326 Wrong behavior w/ the same table names in different databases", function () {
    var connections = [];
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mysql"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should not confuse equivalent table names in different databases", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var i, user_1, i, user_2, user, specificUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= 10)) return [3 /*break*/, 4];
                    user_1 = new User_1.User();
                    user_1.name = "user #" + i;
                    return [4 /*yield*/, connection.manager.save(user_1)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    i = 1;
                    _a.label = 5;
                case 5:
                    if (!(i <= 10)) return [3 /*break*/, 8];
                    user_2 = new SpecificUser_1.SpecificUser();
                    user_2.name = "specific user #" + i;
                    return [4 /*yield*/, connection.manager.save(user_2)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, connection.manager.findOne(User_1.User, { name: "user #1" })];
                case 9:
                    user = _a.sent();
                    chai_1.expect(user).not.to.be.undefined;
                    user.should.be.eql({
                        id: 1,
                        name: "user #1"
                    });
                    return [4 /*yield*/, connection.manager.findOne(SpecificUser_1.SpecificUser, { name: "specific user #1" })];
                case 10:
                    specificUser = _a.sent();
                    chai_1.expect(specificUser).not.to.be.undefined;
                    specificUser.should.be.eql({
                        id: 1,
                        name: "specific user #1"
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1326.js.map