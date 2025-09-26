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
var Flight_1 = require("./entity/Flight");
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var chai_1 = require("chai");
describe.skip("github issues > #838 Time zones for timestamp columns are incorrectly fetched and persisted in PostgreSQL", function () {
    var connections;
    var postgresConnection;
    var testDateString = "1989-08-16T10:00:00+03:00";
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: [
                            "postgres"
                        ]
                    })];
                case 1:
                    connections = _a.sent();
                    postgresConnection = connections.find(function (connection) { return connection.driver instanceof PostgresDriver_1.PostgresDriver; });
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should return date & time stored in PostgreSQL database correctly", function () { return __awaiter(_this, void 0, void 0, function () {
        var flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await postgresConnection.query(`INSERT INTO "flight" ("id", "date") VALUES (1, '1989-08-16 14:00:00.000000 +03:00');`);
                // const results = await postgresConnection.query(`SELECT date FROM "flight" WHERE id = 1`);
                // console.log(results);
                return [4 /*yield*/, postgresConnection.query("INSERT INTO \"flight\" (\"id\", \"date\") VALUES (1, '" + testDateString + "');")];
                case 1:
                    // await postgresConnection.query(`INSERT INTO "flight" ("id", "date") VALUES (1, '1989-08-16 14:00:00.000000 +03:00');`);
                    // const results = await postgresConnection.query(`SELECT date FROM "flight" WHERE id = 1`);
                    // console.log(results);
                    _a.sent();
                    return [4 /*yield*/, postgresConnection.manager.findOne(Flight_1.Flight, 1)];
                case 2:
                    flight = _a.sent();
                    chai_1.expect(flight.date.toISOString()).to.equal(new Date(testDateString).toISOString());
                    return [2 /*return*/];
            }
        });
    }); });
    it("should persist date & time to the PostgreSQL database correctly", function () { return __awaiter(_this, void 0, void 0, function () {
        var testDate, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testDate = new Date(testDateString);
                    return [4 /*yield*/, postgresConnection.manager.save(new Flight_1.Flight(1, testDate))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postgresConnection.query("SELECT \"date\" FROM \"flight\" WHERE id = 1")];
                case 2:
                    results = _a.sent();
                    chai_1.expect(results[0].date.toISOString()).to.equal(testDate.toISOString());
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=issue-838.js.map