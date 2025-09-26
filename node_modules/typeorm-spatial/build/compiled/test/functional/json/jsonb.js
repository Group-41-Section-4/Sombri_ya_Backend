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
var Record_1 = require("./entity/Record");
var test_utils_1 = require("../../utils/test-utils");
describe("jsonb type", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Record_1.Record],
                        enabledDrivers: ["postgres"] // because only postgres supports jsonb type
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    // beforeEach(() => reloadTestingDatabases(connections));
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should make correct schema with Postgres' jsonb type", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, schema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.synchronize(true)];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("record")];
                case 2:
                    schema = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    chai_1.expect(schema).not.to.be.empty;
                    chai_1.expect(schema.columns.find(function (tableColumn) { return tableColumn.name === "config" && tableColumn.type === "json"; })).to.be.not.empty;
                    chai_1.expect(schema.columns.find(function (tableColumn) { return tableColumn.name === "data" && tableColumn.type === "jsonb"; })).to.be.not.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist jsonb correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var recordRepo, record, persistedRecord, foundRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.synchronize(true)];
                case 1:
                    _a.sent();
                    recordRepo = connection.getRepository(Record_1.Record);
                    record = new Record_1.Record();
                    record.data = { foo: "bar" };
                    return [4 /*yield*/, recordRepo.save(record)];
                case 2:
                    persistedRecord = _a.sent();
                    return [4 /*yield*/, recordRepo.findOne(persistedRecord.id)];
                case 3:
                    foundRecord = _a.sent();
                    chai_1.expect(foundRecord).to.be.not.undefined;
                    chai_1.expect(foundRecord.data.foo).to.eq("bar");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist jsonb string correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var recordRepo, record, persistedRecord, foundRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recordRepo = connection.getRepository(Record_1.Record);
                    record = new Record_1.Record();
                    record.data = "foo";
                    return [4 /*yield*/, recordRepo.save(record)];
                case 1:
                    persistedRecord = _a.sent();
                    return [4 /*yield*/, recordRepo.findOne(persistedRecord.id)];
                case 2:
                    foundRecord = _a.sent();
                    chai_1.expect(foundRecord).to.be.not.undefined;
                    chai_1.expect(foundRecord.data).to.be.a("string");
                    chai_1.expect(foundRecord.data).to.eq("foo");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist jsonb array correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var recordRepo, record, persistedRecord, foundRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recordRepo = connection.getRepository(Record_1.Record);
                    record = new Record_1.Record();
                    record.data = [1, "2", { a: 3 }];
                    return [4 /*yield*/, recordRepo.save(record)];
                case 1:
                    persistedRecord = _a.sent();
                    return [4 /*yield*/, recordRepo.findOne(persistedRecord.id)];
                case 2:
                    foundRecord = _a.sent();
                    chai_1.expect(foundRecord).to.be.not.undefined;
                    chai_1.expect(foundRecord.data).to.deep.include.members([1, "2", { a: 3 }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=jsonb.js.map