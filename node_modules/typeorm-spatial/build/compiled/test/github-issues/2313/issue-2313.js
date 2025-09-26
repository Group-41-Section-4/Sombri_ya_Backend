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
var PromiseUtils_1 = require("../../../src/util/PromiseUtils");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
var chai_1 = require("chai");
var EntityNotFoundError_1 = require("../../../src/error/EntityNotFoundError");
describe("github issues > #2313 - BaseEntity has no findOneOrFail() method", function () {
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
    it("should find the appropriate record when one exists", function () { return PromiseUtils_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Post_1.Post.useConnection(connection); // change connection each time because of AR specifics
                    post1 = new Post_1.Post();
                    post1.data = 123;
                    return [4 /*yield*/, post1.save()];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.data = 456;
                    return [4 /*yield*/, post2.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Post_1.Post.findOneOrFail(1)];
                case 3:
                    result1 = _a.sent();
                    result1.data.should.be.eql(123);
                    return [4 /*yield*/, Post_1.Post.findOneOrFail(2)];
                case 4:
                    result2 = _a.sent();
                    result2.data.should.be.eql(456);
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should throw no matching record exists", function () { return PromiseUtils_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Post_1.Post.useConnection(connection); // change connection each time because of AR specifics
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Post_1.Post.findOneOrFail(100)];
                case 2:
                    _a.sent();
                    chai_1.expect.fail();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    e_1.should.be.instanceOf(EntityNotFoundError_1.EntityNotFoundError);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }); });
});
//# sourceMappingURL=issue-2313.js.map