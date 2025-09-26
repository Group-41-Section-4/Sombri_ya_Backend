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
describe("query runner > drop column", function () {
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
    it("should correctly drop column and revert drop", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, table, idColumn, nameColumn, versionColumn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    table = _a.sent();
                    idColumn = table.findColumnByName("id");
                    nameColumn = table.findColumnByName("name");
                    versionColumn = table.findColumnByName("version");
                    idColumn.should.be.exist;
                    nameColumn.should.be.exist;
                    versionColumn.should.be.exist;
                    // In Sqlite 'dropColumns' method is more optimal than 'dropColumn', because it recreate table just once,
                    // without all removed columns. In other drivers it's no difference between these methods, because 'dropColumns'
                    // calls 'dropColumn' method for each removed column.
                    return [4 /*yield*/, queryRunner.dropColumns(table, [idColumn, nameColumn, versionColumn])];
                case 2:
                    // In Sqlite 'dropColumns' method is more optimal than 'dropColumn', because it recreate table just once,
                    // without all removed columns. In other drivers it's no difference between these methods, because 'dropColumns'
                    // calls 'dropColumn' method for each removed column.
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 3:
                    table = _a.sent();
                    chai_1.expect(table.findColumnByName("id")).to.be.undefined;
                    chai_1.expect(table.findColumnByName("name")).to.be.undefined;
                    chai_1.expect(table.findColumnByName("version")).to.be.undefined;
                    return [4 /*yield*/, queryRunner.executeMemoryDownSql()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 5:
                    table = _a.sent();
                    table.findColumnByName("id").should.be.exist;
                    table.findColumnByName("name").should.be.exist;
                    table.findColumnByName("version").should.be.exist;
                    return [4 /*yield*/, queryRunner.release()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=drop-column.js.map