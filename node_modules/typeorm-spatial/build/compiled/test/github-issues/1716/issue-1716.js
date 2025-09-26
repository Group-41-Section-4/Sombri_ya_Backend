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
var pgEntity_1 = require("./entity/pgEntity");
var mysqlEntity_1 = require("./entity/mysqlEntity");
var mariadbEntity_1 = require("./entity/mariadbEntity");
var mssqlEntity_1 = require("./entity/mssqlEntity");
var toISOString = function (input) { return new Date(input).toISOString(); };
var convertPropsToISOStrings = function (obj, props) {
    props.map(function (prop) {
        obj[prop] = toISOString(obj[prop]);
    });
};
var isDriverEnabled = function (driver) {
    var ormConfigConnectionOptionsArray = test_utils_1.getTypeOrmConfig();
    var config = ormConfigConnectionOptionsArray.find(function (options) { return options.name === driver; });
    return config && !config.skip;
};
describe("github issues > #1716 send timestamp to database without converting it into UTC", function () {
    describe("postgres", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var connections;
        return __generator(this, function (_a) {
            if (!isDriverEnabled("postgres")) {
                return [2 /*return*/];
            }
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                                entities: [pgEntity_1.PgEntity],
                                schemaCreate: true,
                                dropSchema: true,
                                enabledDrivers: [
                                    "postgres"
                                ]
                            })];
                        case 1:
                            connections = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
            after(function () { return test_utils_1.closeTestingConnections(connections); });
            it("should persist dates and times correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                var manager, result1, result2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            manager = connections[0].manager;
                            return [4 /*yield*/, manager.save(pgEntity_1.PgEntity, {
                                    id: 1,
                                    fieldTime: "14:00:00+05",
                                    fieldTimeWithTZ: "14:00:00+05",
                                    fieldTimeWithoutTZ: "14:00:00+05",
                                    fieldTimestamp: "2018-03-07 14:00:00+05",
                                    fieldTimestampWithoutTZ: "2018-03-07 14:00:00+05",
                                    fieldTimestampWithTZ: "2018-03-07 14:00:00+05",
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(pgEntity_1.PgEntity, 1)];
                        case 2:
                            result1 = _a.sent();
                            convertPropsToISOStrings(result1, ["fieldTimestamp", "fieldTimestampWithoutTZ", "fieldTimestampWithTZ"]);
                            chai_1.expect(result1).to.deep.equal({
                                id: 1,
                                fieldTime: "14:00:00",
                                fieldTimeWithTZ: "14:00:00+05",
                                fieldTimeWithoutTZ: "14:00:00",
                                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                                fieldTimestampWithoutTZ: toISOString("2018-03-07 14:00:00+05"),
                                fieldTimestampWithTZ: toISOString("2018-03-07 14:00:00+05"),
                            });
                            return [4 /*yield*/, manager.save(pgEntity_1.PgEntity, {
                                    id: 2,
                                    fieldTime: "17:00:00",
                                    fieldTimeWithTZ: "17:00:00",
                                    fieldTimeWithoutTZ: "17:00:00",
                                    fieldTimestamp: "2018-03-07 17:00:00",
                                    fieldTimestampWithoutTZ: "2018-03-07 17:00:00",
                                    fieldTimestampWithTZ: "2018-03-07 17:00:00",
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(pgEntity_1.PgEntity, 2)];
                        case 4:
                            result2 = _a.sent();
                            convertPropsToISOStrings(result2, ["fieldTimestamp", "fieldTimestampWithoutTZ", "fieldTimestampWithTZ"]);
                            chai_1.expect(result2).to.deep.equal({
                                id: 2,
                                fieldTime: "17:00:00",
                                fieldTimeWithTZ: "17:00:00+00",
                                fieldTimeWithoutTZ: "17:00:00",
                                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                                fieldTimestampWithoutTZ: toISOString("2018-03-07 17:00:00"),
                                fieldTimestampWithTZ: toISOString("2018-03-07 17:00:00"),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("mysql", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var connections;
        return __generator(this, function (_a) {
            if (!isDriverEnabled("mysql")) {
                return [2 /*return*/];
            }
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                                entities: [mysqlEntity_1.MysqlEntity],
                                schemaCreate: true,
                                dropSchema: true,
                                enabledDrivers: [
                                    "mysql"
                                ]
                            })];
                        case 1:
                            connections = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
            after(function () { return test_utils_1.closeTestingConnections(connections); });
            it("should persist dates and times correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                var manager, result1, result2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            manager = connections[0].manager;
                            return [4 /*yield*/, manager.save(mysqlEntity_1.MysqlEntity, {
                                    id: 1,
                                    fieldTime: "14:00:00",
                                    fieldTimestamp: "2018-03-07 14:00:00+05",
                                    fieldDatetime: "2018-03-07 14:00:00+05",
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mysqlEntity_1.MysqlEntity, 1)];
                        case 2:
                            result1 = _a.sent();
                            convertPropsToISOStrings(result1, ["fieldTimestamp", "fieldDatetime"]);
                            chai_1.expect(result1).to.deep.equal({
                                id: 1,
                                fieldTime: "14:00:00",
                                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
                            });
                            return [4 /*yield*/, manager.save(mysqlEntity_1.MysqlEntity, {
                                    id: 2,
                                    fieldTime: "17:00:00",
                                    fieldTimestamp: "2018-03-07 17:00:00",
                                    fieldDatetime: "2018-03-07 17:00:00",
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mysqlEntity_1.MysqlEntity, 2)];
                        case 4:
                            result2 = _a.sent();
                            convertPropsToISOStrings(result2, ["fieldTimestamp", "fieldDatetime"]);
                            chai_1.expect(result2).to.deep.equal({
                                id: 2,
                                fieldTime: "17:00:00",
                                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                                fieldDatetime: toISOString("2018-03-07 17:00:00"),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("mariadb", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var connections;
        return __generator(this, function (_a) {
            if (!isDriverEnabled("mariadb")) {
                return [2 /*return*/];
            }
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                                entities: [mariadbEntity_1.MariadbEntity],
                                schemaCreate: true,
                                dropSchema: true,
                                enabledDrivers: [
                                    "mariadb"
                                ]
                            })];
                        case 1:
                            connections = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
            after(function () { return test_utils_1.closeTestingConnections(connections); });
            it("should persist dates and times correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                var manager, result1, result2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            manager = connections[0].manager;
                            return [4 /*yield*/, manager.save(mariadbEntity_1.MariadbEntity, {
                                    id: 1,
                                    fieldTime: "14:00:00",
                                    fieldTimestamp: "2018-03-07 14:00:00+05",
                                    fieldDatetime: "2018-03-07 14:00:00+05",
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mariadbEntity_1.MariadbEntity, 1)];
                        case 2:
                            result1 = _a.sent();
                            convertPropsToISOStrings(result1, ["fieldTimestamp", "fieldDatetime"]);
                            chai_1.expect(result1).to.deep.equal({
                                id: 1,
                                fieldTime: "14:00:00",
                                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
                            });
                            return [4 /*yield*/, manager.save(mariadbEntity_1.MariadbEntity, {
                                    id: 2,
                                    fieldTime: "17:00:00",
                                    fieldTimestamp: "2018-03-07 17:00:00",
                                    fieldDatetime: "2018-03-07 17:00:00",
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mariadbEntity_1.MariadbEntity, 2)];
                        case 4:
                            result2 = _a.sent();
                            convertPropsToISOStrings(result2, ["fieldTimestamp", "fieldDatetime"]);
                            chai_1.expect(result2).to.deep.equal({
                                id: 2,
                                fieldTime: "17:00:00",
                                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                                fieldDatetime: toISOString("2018-03-07 17:00:00"),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("mssql", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var connections;
        return __generator(this, function (_a) {
            if (!isDriverEnabled("mssql")) {
                return [2 /*return*/];
            }
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                                entities: [mssqlEntity_1.MssqlEntity],
                                schemaCreate: true,
                                dropSchema: true,
                                enabledDrivers: [
                                    "mssql"
                                ]
                            })];
                        case 1:
                            connections = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
            after(function () { return test_utils_1.closeTestingConnections(connections); });
            it("should persist dates and times correctly", function () { return __awaiter(_this, void 0, void 0, function () {
                var manager, result1, result2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            manager = connections[0].manager;
                            return [4 /*yield*/, manager.save(mssqlEntity_1.MssqlEntity, {
                                    id: 1,
                                    fieldTime: "14:00:00",
                                    fieldDatetime: "2018-03-07 14:00:00+05",
                                    fieldDatetime2: "2018-03-07 14:00:00+05",
                                    fieldDatetimeoffset: "2018-03-07 14:00:00+05",
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mssqlEntity_1.MssqlEntity, 1)];
                        case 2:
                            result1 = _a.sent();
                            convertPropsToISOStrings(result1, ["fieldDatetime", "fieldDatetime2", "fieldDatetimeoffset"]);
                            chai_1.expect(result1).to.deep.equal({
                                id: 1,
                                fieldTime: "14:00:00",
                                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
                                fieldDatetime2: toISOString("2018-03-07 14:00:00+05"),
                                fieldDatetimeoffset: toISOString("2018-03-07 14:00:00+05"),
                            });
                            return [4 /*yield*/, manager.save(mssqlEntity_1.MssqlEntity, {
                                    id: 2,
                                    fieldTime: "17:00:00",
                                    fieldDatetime: "2018-03-07 17:00:00",
                                    fieldDatetime2: "2018-03-07 17:00:00",
                                    fieldDatetimeoffset: "2018-03-07 17:00:00",
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, manager.findOne(mssqlEntity_1.MssqlEntity, 2)];
                        case 4:
                            result2 = _a.sent();
                            convertPropsToISOStrings(result2, ["fieldDatetime", "fieldDatetime2", "fieldDatetimeoffset"]);
                            chai_1.expect(result2).to.deep.equal({
                                id: 2,
                                fieldTime: "17:00:00",
                                fieldDatetime: toISOString("2018-03-07 17:00:00"),
                                fieldDatetime2: toISOString("2018-03-07 17:00:00"),
                                fieldDatetimeoffset: toISOString("2018-03-07 17:00:00"),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=issue-1716.js.map