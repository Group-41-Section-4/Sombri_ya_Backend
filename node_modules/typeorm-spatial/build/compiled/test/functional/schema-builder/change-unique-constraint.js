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
var src_1 = require("../../../src");
var Teacher_1 = require("./entity/Teacher");
var UniqueMetadata_1 = require("../../../src/metadata/UniqueMetadata");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
var Post_1 = require("./entity/Post");
var AbstractSqliteDriver_1 = require("../../../src/driver/sqlite-abstract/AbstractSqliteDriver");
var IndexMetadata_1 = require("../../../src/metadata/IndexMetadata");
describe("schema builder > change unique constraint", function () {
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
    it("should correctly add new unique constraint", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var teacherMetadata, nameColumn, uniqueIndexMetadata, uniqueMetadata, queryRunner, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teacherMetadata = connection.getMetadata(Teacher_1.Teacher);
                    nameColumn = teacherMetadata.findColumnWithPropertyName("name");
                    uniqueIndexMetadata = undefined;
                    uniqueMetadata = undefined;
                    // Mysql stores unique constraints as unique indices.
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        uniqueIndexMetadata = new IndexMetadata_1.IndexMetadata({
                            entityMetadata: teacherMetadata,
                            columns: [nameColumn],
                            args: {
                                target: Teacher_1.Teacher,
                                unique: true,
                                synchronize: true
                            }
                        });
                        uniqueIndexMetadata.build(connection.namingStrategy);
                        teacherMetadata.indices.push(uniqueIndexMetadata);
                    }
                    else {
                        uniqueMetadata = new UniqueMetadata_1.UniqueMetadata({
                            entityMetadata: teacherMetadata,
                            columns: [nameColumn],
                            args: {
                                target: Teacher_1.Teacher
                            }
                        });
                        uniqueMetadata.build(connection.namingStrategy);
                        teacherMetadata.uniques.push(uniqueMetadata);
                    }
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("teacher")];
                case 2:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        table.indices.length.should.be.equal(1);
                        table.indices[0].isUnique.should.be.true;
                        // revert changes
                        teacherMetadata.indices.splice(teacherMetadata.indices.indexOf(uniqueIndexMetadata), 1);
                    }
                    else {
                        table.uniques.length.should.be.equal(1);
                        // revert changes
                        teacherMetadata.uniques.splice(teacherMetadata.uniques.indexOf(uniqueMetadata), 1);
                    }
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly change unique constraint", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, uniqueIndexMetadata, uniqueMetadata, queryRunner, table, tableIndex, uniqueIndexMetadata, tableUnique, uniqueMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Sqlite does not store unique constraint name
                    if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                        return [2 /*return*/];
                    postMetadata = connection.getMetadata(Post_1.Post);
                    // Mysql stores unique constraints as unique indices.
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        uniqueIndexMetadata = postMetadata.indices.find(function (i) { return i.columns.length === 2 && i.isUnique === true; });
                        uniqueIndexMetadata.name = "changed_unique";
                    }
                    else {
                        uniqueMetadata = postMetadata.uniques.find(function (uq) { return uq.columns.length === 2; });
                        uniqueMetadata.name = "changed_unique";
                    }
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 2:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        tableIndex = table.indices.find(function (index) { return index.columnNames.length === 2 && index.isUnique === true; });
                        tableIndex.name.should.be.equal("changed_unique");
                        uniqueIndexMetadata = postMetadata.indices.find(function (i) { return i.name === "changed_unique"; });
                        uniqueIndexMetadata.name = connection.namingStrategy.indexName(table, uniqueIndexMetadata.columns.map(function (c) { return c.databaseName; }));
                    }
                    else {
                        tableUnique = table.uniques.find(function (unique) { return unique.columnNames.length === 2; });
                        tableUnique.name.should.be.equal("changed_unique");
                        uniqueMetadata = postMetadata.uniques.find(function (i) { return i.name === "changed_unique"; });
                        uniqueMetadata.name = connection.namingStrategy.uniqueConstraintName(table, uniqueMetadata.columns.map(function (c) { return c.databaseName; }));
                    }
                    return [2 /*return*/];
            }
        });
    }); }); });
    it("should correctly drop removed unique constraint", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postMetadata, index, unique, queryRunner, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postMetadata = connection.getMetadata(Post_1.Post);
                    // Mysql stores unique constraints as unique indices.
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        index = postMetadata.indices.find(function (i) { return i.columns.length === 2 && i.isUnique === true; });
                        postMetadata.indices.splice(postMetadata.indices.indexOf(index), 1);
                    }
                    else {
                        unique = postMetadata.uniques.find(function (u) { return u.columns.length === 2; });
                        postMetadata.uniques.splice(postMetadata.uniques.indexOf(unique), 1);
                    }
                    return [4 /*yield*/, connection.synchronize()];
                case 1:
                    _a.sent();
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 2:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                        table.indices.length.should.be.equal(1);
                    }
                    else {
                        table.uniques.length.should.be.equal(1);
                    }
                    return [2 /*return*/];
            }
        });
    }); }); });
});
//# sourceMappingURL=change-unique-constraint.js.map