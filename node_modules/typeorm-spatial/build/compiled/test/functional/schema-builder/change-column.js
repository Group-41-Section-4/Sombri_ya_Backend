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
var src_1 = require("../../../src");
var AbstractSqliteDriver_1 = require("../../../src/driver/sqlite-abstract/AbstractSqliteDriver");
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var SqlServerDriver_1 = require("../../../src/driver/sqlserver/SqlServerDriver");
var Post_1 = require("./entity/Post");
var PostVersion_1 = require("./entity/PostVersion");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
var OracleDriver_1 = require("../../../src/driver/oracle/OracleDriver");
describe("schema builder > change column", function () {
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
    it("should correctly change column name", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, nameColumn, queryRunner, postTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    nameColumn = postMetadata.findColumnWithPropertyName("name");
                    nameColumn.propertyName = "title";
                    nameColumn.build(connection);
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 2:
                    postTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    chai_1.expect(postTable.findColumnByName("name")).to.be.undefined;
                    postTable.findColumnByName("title").should.be.exist;
                    // revert changes
                    nameColumn.propertyName = "name";
                    nameColumn.build(connection);
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change column length", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, nameColumn, textColumn, queryRunner, postTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    nameColumn = postMetadata.findColumnWithPropertyName("name");
                    textColumn = postMetadata.findColumnWithPropertyName("text");
                    nameColumn.length = "500";
                    textColumn.length = "300";
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 2:
                    postTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    postTable.findColumnByName("name").length.should.be.equal("500");
                    postTable.findColumnByName("text").length.should.be.equal("300");
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        postTable.indices.length.should.be.equal(2);
                    }
                    else {
                        postTable.uniques.length.should.be.equal(2);
                    }
                    // revert changes
                    nameColumn.length = "255";
                    textColumn.length = "255";
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change column type", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, versionColumn, postVersionMetadata, postVersionColumn, queryRunner, postVersionTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    versionColumn = postMetadata.findColumnWithPropertyName("version");
                    versionColumn.type = "int";
                    postVersionMetadata = connection.getMetadata(PostVersion_1.PostVersion);
                    postVersionColumn = postVersionMetadata.findColumnWithPropertyName("post");
                    postVersionColumn.type = "int";
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post_version")];
                case 2:
                    postVersionTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    postVersionTable.foreignKeys.length.should.be.equal(1);
                    // revert changes
                    versionColumn.type = "varchar";
                    postVersionColumn.type = "varchar";
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly make column primary and generated", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, idColumn, versionColumn, queryRunner, postTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    idColumn = postMetadata.findColumnWithPropertyName("id");
                    versionColumn = postMetadata.findColumnWithPropertyName("version");
                    idColumn.isGenerated = true;
                    idColumn.generationStrategy = "increment";
                    // SQLite does not support AUTOINCREMENT with composite primary keys
                    // Oracle does not support both unique and primary attributes on such column
                    if (!(connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver) && !(connection.driver instanceof OracleDriver_1.OracleDriver))
                        versionColumn.isPrimary = true;
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 2:
                    postTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    postTable.findColumnByName("id").isGenerated.should.be.true;
                    postTable.findColumnByName("id").generationStrategy.should.be.equal("increment");
                    // SQLite does not support AUTOINCREMENT with composite primary keys
                    if (!(connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver) && !(connection.driver instanceof OracleDriver_1.OracleDriver))
                        postTable.findColumnByName("version").isPrimary.should.be.true;
                    // revert changes
                    idColumn.isGenerated = false;
                    idColumn.generationStrategy = undefined;
                    versionColumn.isPrimary = false;
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change column `isGenerated` property when column is on foreign key", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var teacherMetadata, idColumn, queryRunner, teacherTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teacherMetadata = connection.getMetadata("teacher");
                    idColumn = teacherMetadata.findColumnWithPropertyName("id");
                    idColumn.isGenerated = false;
                    idColumn.generationStrategy = undefined;
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("teacher")];
                case 2:
                    teacherTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    teacherTable.findColumnByName("id").isGenerated.should.be.false;
                    chai_1.expect(teacherTable.findColumnByName("id").generationStrategy).to.be.undefined;
                    // revert changes
                    idColumn.isGenerated = true;
                    idColumn.generationStrategy = "increment";
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change non-generated column on to uuid-generated column", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, postMetadata, idColumn, postTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 2];
                    return [4 /*yield*/, queryRunner.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    idColumn = postMetadata.findColumnWithPropertyName("id");
                    idColumn.isGenerated = true;
                    idColumn.generationStrategy = "uuid";
                    // depending on driver, we must change column and referenced column types
                    if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                        idColumn.type = "uuid";
                    }
                    else if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                        idColumn.type = "uniqueidentifier";
                    }
                    else {
                        idColumn.type = "varchar";
                    }
                    return [4 /*yield*/, connection.synchronize()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 4:
                    postTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 5:
                    _a.sent();
                    if (connection.driver instanceof PostgresDriver_1.PostgresDriver || connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                        postTable.findColumnByName("id").isGenerated.should.be.true;
                        postTable.findColumnByName("id").generationStrategy.should.be.equal("uuid");
                    }
                    else {
                        // other driver does not natively supports uuid type
                        postTable.findColumnByName("id").isGenerated.should.be.false;
                        chai_1.expect(postTable.findColumnByName("id").generationStrategy).to.be.undefined;
                    }
                    // revert changes
                    idColumn.isGenerated = false;
                    idColumn.generationStrategy = undefined;
                    idColumn.type = "int";
                    postMetadata.generatedColumns.splice(postMetadata.generatedColumns.indexOf(idColumn), 1);
                    postMetadata.hasUUIDGeneratedColumns = false;
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change generated column generation strategy", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var teacherMetadata, studentMetadata, idColumn, teacherColumn, queryRunner, teacherTable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teacherMetadata = connection.getMetadata("teacher");
                    studentMetadata = connection.getMetadata("student");
                    idColumn = teacherMetadata.findColumnWithPropertyName("id");
                    teacherColumn = studentMetadata.findColumnWithPropertyName("teacher");
                    idColumn.generationStrategy = "uuid";
                    // depending on driver, we must change column and referenced column types
                    if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                        idColumn.type = "uuid";
                        teacherColumn.type = "uuid";
                    }
                    else if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                        idColumn.type = "uniqueidentifier";
                        teacherColumn.type = "uniqueidentifier";
                    }
                    else {
                        idColumn.type = "varchar";
                        teacherColumn.type = "varchar";
                    }
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("teacher")];
                case 2:
                    teacherTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    if (connection.driver instanceof PostgresDriver_1.PostgresDriver || connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                        teacherTable.findColumnByName("id").isGenerated.should.be.true;
                        teacherTable.findColumnByName("id").generationStrategy.should.be.equal("uuid");
                    }
                    else {
                        // other driver does not natively supports uuid type
                        teacherTable.findColumnByName("id").isGenerated.should.be.false;
                        chai_1.expect(teacherTable.findColumnByName("id").generationStrategy).to.be.undefined;
                    }
                    // revert changes
                    idColumn.isGenerated = true;
                    idColumn.generationStrategy = "increment";
                    idColumn.type = "int";
                    teacherColumn.type = "int";
                    return [2 /*return*/];
            }
        });
    }); }); });
});
//# sourceMappingURL=change-column.js.map