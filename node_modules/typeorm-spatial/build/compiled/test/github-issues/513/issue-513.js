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
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var DateUtils_1 = require("../../../src/util/DateUtils");
describe("github issues > #513 Incorrect time/datetime types for SQLite", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["sqlite"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should create datetime column type for datetime in sqlite", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var dbColumns, columnType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.query("PRAGMA table_info(Post)")];
                case 1:
                    dbColumns = _a.sent();
                    chai_1.expect(dbColumns).not.to.be.null;
                    chai_1.expect(dbColumns).not.to.be.empty;
                    columnType = "";
                    dbColumns.map(function (dbColumn) {
                        if (dbColumn["name"] === "dateTimeColumn") {
                            columnType = dbColumn["type"];
                        }
                    });
                    // Expect "datetime" type to translate to SQLite affinity type "DATETIME"
                    columnType.should.equal("datetime");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist correct type in datetime column in sqlite", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var now, post, storedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    post = new Post_1.Post();
                    post.id = 1;
                    post.dateTimeColumn = now;
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, post.id)];
                case 2:
                    storedPost = _a.sent();
                    chai_1.expect(storedPost).to.not.be.null;
                    storedPost.dateTimeColumn.toDateString().should.equal(now.toDateString());
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should create datetime column type for time in sqlite", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var dbColumns, columnType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.query("PRAGMA table_info(Post)")];
                case 1:
                    dbColumns = _a.sent();
                    chai_1.expect(dbColumns).not.to.be.null;
                    chai_1.expect(dbColumns).not.to.be.empty;
                    columnType = "";
                    dbColumns.map(function (dbColumn) {
                        if (dbColumn["name"] === "timeColumn") {
                            columnType = dbColumn["type"];
                        }
                    });
                    // Expect "time" type to translate to SQLite type "TEXT"
                    columnType.should.equal("time");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist correct type in datetime column in sqlite", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var now, post, storedPost, expectedTimeString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    post = new Post_1.Post();
                    post.id = 2;
                    post.timeColumn = now; // Should maybe use Date type?
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, post.id)];
                case 2:
                    storedPost = _a.sent();
                    chai_1.expect(storedPost).to.not.be.null;
                    expectedTimeString = DateUtils_1.DateUtils.mixedTimeToString(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
                    storedPost.timeColumn.toString().should.equal(expectedTimeString);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-513.js.map