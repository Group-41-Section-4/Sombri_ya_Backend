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
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var SqlServerDriver_1 = require("../../../src/driver/sqlserver/SqlServerDriver");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
var ForeignKeyMetadata_1 = require("../../../src/metadata/ForeignKeyMetadata");
describe("schema builder > custom-db-and-schema-sync", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mysql", "mssql", "postgres"],
                        dropSchema: true,
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should correctly sync tables with custom schema and database", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, photoMetadata, albumMetadata, albumTable, photoTable, columns, referencedColumns, fkMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    photoMetadata = connection.getMetadata("photo");
                    albumMetadata = connection.getMetadata("album");
                    // create tables
                    photoMetadata.synchronize = true;
                    albumMetadata.synchronize = true;
                    if (!(connection.driver instanceof SqlServerDriver_1.SqlServerDriver)) return [3 /*break*/, 4];
                    photoMetadata.database = "secondDB";
                    photoMetadata.schema = "photo-schema";
                    photoMetadata.tablePath = "secondDB.photo-schema.photo";
                    photoMetadata.schemaPath = "secondDB.photo-schema";
                    albumMetadata.database = "secondDB";
                    albumMetadata.schema = "album-schema";
                    albumMetadata.tablePath = "secondDB.album-schema.album";
                    albumMetadata.schemaPath = "secondDB.album-schema";
                    return [4 /*yield*/, queryRunner.createDatabase(photoMetadata.database, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.createSchema(photoMetadata.schemaPath, true)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.createSchema(albumMetadata.schemaPath, true)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 4:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 7];
                    photoMetadata.schema = "photo-schema";
                    photoMetadata.tablePath = "photo-schema.photo";
                    photoMetadata.schemaPath = "photo-schema";
                    albumMetadata.schema = "album-schema";
                    albumMetadata.tablePath = "album-schema.album";
                    albumMetadata.schemaPath = "album-schema";
                    return [4 /*yield*/, queryRunner.createSchema(photoMetadata.schemaPath, true)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.createSchema(albumMetadata.schemaPath, true)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    if (!(connection.driver instanceof MysqlDriver_1.MysqlDriver)) return [3 /*break*/, 9];
                    photoMetadata.database = "secondDB";
                    photoMetadata.tablePath = "secondDB.photo";
                    albumMetadata.database = "secondDB";
                    albumMetadata.tablePath = "secondDB.album";
                    return [4 /*yield*/, queryRunner.createDatabase(photoMetadata.database, true)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, connection.synchronize()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(albumMetadata.tablePath)];
                case 11:
                    albumTable = _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(photoMetadata.tablePath)];
                case 12:
                    photoTable = _a.sent();
                    albumTable.should.be.exist;
                    photoTable.should.be.exist;
                    columns = photoMetadata.columns.filter(function (column) { return column.propertyName === "albumId"; });
                    referencedColumns = albumMetadata.columns.filter(function (column) { return column.propertyName === "id"; });
                    fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
                        entityMetadata: photoMetadata,
                        referencedEntityMetadata: albumMetadata,
                        columns: columns,
                        referencedColumns: referencedColumns,
                        namingStrategy: connection.namingStrategy
                    });
                    photoMetadata.foreignKeys.push(fkMetadata);
                    return [4 /*yield*/, connection.synchronize()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(photoMetadata.tablePath)];
                case 14:
                    photoTable = _a.sent();
                    photoTable.foreignKeys.length.should.be.equal(1);
                    // drop foreign key
                    photoMetadata.foreignKeys = [];
                    return [4 /*yield*/, connection.synchronize()];
                case 15:
                    _a.sent();
                    // drop tables manually, because they will not synchronize automatically
                    return [4 /*yield*/, queryRunner.dropTable(photoMetadata.tablePath, true, false)];
                case 16:
                    // drop tables manually, because they will not synchronize automatically
                    _a.sent();
                    return [4 /*yield*/, queryRunner.dropTable(albumMetadata.tablePath, true, false)];
                case 17:
                    _a.sent();
                    // drop created database
                    return [4 /*yield*/, queryRunner.dropDatabase("secondDB", true)];
                case 18:
                    // drop created database
                    _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 19:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=custom-db-and-schema-sync.js.map