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
var SqlServerDriver_1 = require("../../../src/driver/sqlserver/SqlServerDriver");
var Table_1 = require("../../../src/schema-builder/table/Table");
var AbstractSqliteDriver_1 = require("../../../src/driver/sqlite-abstract/AbstractSqliteDriver");
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
describe("query runner > rename table", function () {
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
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should correctly rename table and revert rename", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.renameTable(table, "question")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("question")];
                case 3:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.renameTable("question", "user")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("user")];
                case 5:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.executeMemoryDownSql()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 7:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.release()];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should correctly rename table with all constraints depend to that table and revert rename", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, table, newUniqueConstraintName, tableUnique;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.renameTable(table, "renamedPost")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("renamedPost")];
                case 3:
                    table = _a.sent();
                    table.should.be.exist;
                    // should successfully drop pk if pk constraint was correctly renamed.
                    return [4 /*yield*/, queryRunner.dropPrimaryKey(table)];
                case 4:
                    // should successfully drop pk if pk constraint was correctly renamed.
                    _a.sent();
                    // MySql does not support unique constraints
                    if (!(connection.driver instanceof MysqlDriver_1.MysqlDriver)) {
                        newUniqueConstraintName = connection.namingStrategy.uniqueConstraintName(table, ["text", "tag"]);
                        tableUnique = table.uniques.find(function (unique) {
                            return !!unique.columnNames.find(function (columnName) { return columnName === "tag"; });
                        });
                        tableUnique.name.should.be.equal(newUniqueConstraintName);
                    }
                    return [4 /*yield*/, queryRunner.executeMemoryDownSql()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 6:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.release()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should correctly rename table with custom schema and database and all its dependencies and revert rename", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, table, questionTableName, renamedQuestionTableName, categoryTableName, renamedCategoryTableName, newIndexName, newForeignKeyName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    questionTableName = "question";
                    renamedQuestionTableName = "renamedQuestion";
                    categoryTableName = "category";
                    renamedCategoryTableName = "renamedCategory";
                    if (!(connection.driver instanceof SqlServerDriver_1.SqlServerDriver)) return [3 /*break*/, 3];
                    questionTableName = "testDB.testSchema.question";
                    renamedQuestionTableName = "testDB.testSchema.renamedQuestion";
                    categoryTableName = "testDB.testSchema.category";
                    renamedCategoryTableName = "testDB.testSchema.renamedCategory";
                    return [4 /*yield*/, queryRunner.createDatabase("testDB", true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.createSchema("testDB.testSchema", true)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 5];
                    questionTableName = "testSchema.question";
                    renamedQuestionTableName = "testSchema.renamedQuestion";
                    categoryTableName = "testSchema.category";
                    renamedCategoryTableName = "testSchema.renamedCategory";
                    return [4 /*yield*/, queryRunner.createSchema("testSchema", true)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    if (!(connection.driver instanceof MysqlDriver_1.MysqlDriver)) return [3 /*break*/, 7];
                    questionTableName = "testDB.question";
                    renamedQuestionTableName = "testDB.renamedQuestion";
                    categoryTableName = "testDB.category";
                    renamedCategoryTableName = "testDB.renamedCategory";
                    return [4 /*yield*/, queryRunner.createDatabase("testDB", true)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, queryRunner.createTable(new Table_1.Table({
                        name: questionTableName,
                        columns: [
                            {
                                name: "id",
                                type: connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver ? "integer" : "int",
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: "increment"
                            },
                            {
                                name: "name",
                                type: "varchar",
                            }
                        ],
                        indices: [{ columnNames: ["name"] }]
                    }), true)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.createTable(new Table_1.Table({
                            name: categoryTableName,
                            columns: [
                                {
                                    name: "id",
                                    type: connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver ? "integer" : "int",
                                    isPrimary: true,
                                    isGenerated: true,
                                    generationStrategy: "increment"
                                },
                                {
                                    name: "questionId",
                                    type: "int",
                                    isUnique: true
                                }
                            ],
                            foreignKeys: [
                                {
                                    columnNames: ["questionId"],
                                    referencedTableName: questionTableName,
                                    referencedColumnNames: ["id"]
                                }
                            ]
                        }), true)];
                case 9:
                    _a.sent();
                    // clear sqls in memory to avoid removing tables when down queries executed.
                    queryRunner.clearSqlMemory();
                    return [4 /*yield*/, queryRunner.renameTable(questionTableName, "renamedQuestion")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(renamedQuestionTableName)];
                case 11:
                    table = _a.sent();
                    newIndexName = connection.namingStrategy.indexName(table, ["name"]);
                    table.indices[0].name.should.be.equal(newIndexName);
                    return [4 /*yield*/, queryRunner.renameTable(categoryTableName, "renamedCategory")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(renamedCategoryTableName)];
                case 13:
                    table = _a.sent();
                    newForeignKeyName = connection.namingStrategy.foreignKeyName(table, ["questionId"]);
                    table.foreignKeys[0].name.should.be.equal(newForeignKeyName);
                    return [4 /*yield*/, queryRunner.executeMemoryDownSql()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable(questionTableName)];
                case 15:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.getTable(categoryTableName)];
                case 16:
                    table = _a.sent();
                    table.should.be.exist;
                    return [4 /*yield*/, queryRunner.release()];
                case 17:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=rename-table.js.map