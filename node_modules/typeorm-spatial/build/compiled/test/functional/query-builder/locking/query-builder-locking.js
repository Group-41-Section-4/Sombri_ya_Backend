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
var test_utils_1 = require("../../../utils/test-utils");
var PostWithVersion_1 = require("./entity/PostWithVersion");
var chai_1 = require("chai");
var PostWithoutVersionAndUpdateDate_1 = require("./entity/PostWithoutVersionAndUpdateDate");
var PostWithUpdateDate_1 = require("./entity/PostWithUpdateDate");
var PostWithVersionAndUpdatedDate_1 = require("./entity/PostWithVersionAndUpdatedDate");
var OptimisticLockVersionMismatchError_1 = require("../../../../src/error/OptimisticLockVersionMismatchError");
var OptimisticLockCanNotBeUsedError_1 = require("../../../../src/error/OptimisticLockCanNotBeUsedError");
var NoVersionOrUpdateDateColumnError_1 = require("../../../../src/error/NoVersionOrUpdateDateColumnError");
var PessimisticLockTransactionRequiredError_1 = require("../../../../src/error/PessimisticLockTransactionRequiredError");
var MysqlDriver_1 = require("../../../../src/driver/mysql/MysqlDriver");
var PostgresDriver_1 = require("../../../../src/driver/postgres/PostgresDriver");
var SqlServerDriver_1 = require("../../../../src/driver/sqlserver/SqlServerDriver");
var AbstractSqliteDriver_1 = require("../../../../src/driver/sqlite-abstract/AbstractSqliteDriver");
var OracleDriver_1 = require("../../../../src/driver/oracle/OracleDriver");
var LockNotSupportedOnGivenDriverError_1 = require("../../../../src/error/LockNotSupportedOnGivenDriverError");
describe("query builder > locking", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should not attach pessimistic read lock statement on query if locking is not used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            sql = connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            chai_1.expect(sql.indexOf("LOCK IN SHARE MODE") === -1).to.be.true;
            chai_1.expect(sql.indexOf("FOR SHARE") === -1).to.be.true;
            chai_1.expect(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") === -1).to.be.true;
            return [2 /*return*/];
        });
    }); })); });
    it("should throw error if pessimistic lock used without transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            return [2 /*return*/, Promise.all([
                    connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_read")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError),
                    connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                        .setLock("pessimistic_write")
                        .where("post.id = :id", { id: 1 })
                        .getOne().should.be.rejectedWith(PessimisticLockTransactionRequiredError_1.PessimisticLockTransactionRequiredError)
                ])];
        });
    }); })); });
    it("should not throw error if pessimistic lock used with transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            return [2 /*return*/, connection.manager.transaction(function (entityManager) {
                    return Promise.all([
                        entityManager.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("pessimistic_read")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected,
                        entityManager.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("pessimistic_write")
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected
                    ]);
                })];
        });
    }); })); });
    it("should attach pessimistic read lock statement on query if locking enabled", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            sql = connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_read")
                .where("post.id = :id", { id: 1 })
                .getSql();
            if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                chai_1.expect(sql.indexOf("LOCK IN SHARE MODE") !== -1).to.be.true;
            }
            else if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                chai_1.expect(sql.indexOf("FOR SHARE") !== -1).to.be.true;
            }
            else if (connection.driver instanceof OracleDriver_1.OracleDriver) {
                chai_1.expect(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
            }
            else if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                chai_1.expect(sql.indexOf("WITH (HOLDLOCK, ROWLOCK)") !== -1).to.be.true;
            }
            return [2 /*return*/];
        });
    }); })); });
    it("should not attach pessimistic write lock statement on query if locking is not used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            sql = connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            chai_1.expect(sql.indexOf("FOR UPDATE") === -1).to.be.true;
            chai_1.expect(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") === -1).to.be.true;
            return [2 /*return*/];
        });
    }); })); });
    it("should attach pessimistic write lock statement on query if locking enabled", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/];
            sql = connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                .setLock("pessimistic_write")
                .where("post.id = :id", { id: 1 })
                .getSql();
            if (connection.driver instanceof MysqlDriver_1.MysqlDriver || connection.driver instanceof PostgresDriver_1.PostgresDriver || connection.driver instanceof OracleDriver_1.OracleDriver) {
                chai_1.expect(sql.indexOf("FOR UPDATE") !== -1).to.be.true;
            }
            else if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                chai_1.expect(sql.indexOf("WITH (UPDLOCK, ROWLOCK)") !== -1).to.be.true;
            }
            return [2 /*return*/];
        });
    }); })); });
    it("should throw error if optimistic lock used with getMany method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getMany().should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError)];
        });
    }); })); });
    it("should throw error if optimistic lock used with getCount method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getCount().should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError)];
        });
    }); })); });
    it("should throw error if optimistic lock used with getManyAndCount method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getManyAndCount().should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError)];
        });
    }); })); });
    it("should throw error if optimistic lock used with getRawMany method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .getRawMany().should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError)];
        });
    }); })); });
    it("should throw error if optimistic lock used with getRawOne method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getRawOne().should.be.rejectedWith(OptimisticLockCanNotBeUsedError_1.OptimisticLockCanNotBeUsedError)];
        });
    }); })); });
    it("should not throw error if optimistic lock used with getOne method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                    .setLock("optimistic", 1)
                    .where("post.id = :id", { id: 1 })
                    .getOne().should.not.be.rejected];
        });
    }); })); });
    it.skip("should throw error if entity does not have version and update date columns", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, connection.createQueryBuilder(PostWithoutVersionAndUpdateDate_1.PostWithoutVersionAndUpdateDate, "post")
                            .setLock("optimistic", 1)
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.be.rejectedWith(NoVersionOrUpdateDateColumnError_1.NoVersionOrUpdateDateColumnError)];
            }
        });
    }); })); });
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual version does not equal expected version", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostWithVersion_1.PostWithVersion();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("optimistic", 2)
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.be.rejectedWith(OptimisticLockVersionMismatchError_1.OptimisticLockVersionMismatchError)];
            }
        });
    }); })); });
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual version and expected versions are equal", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostWithVersion_1.PostWithVersion();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, connection.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                            .setLock("optimistic", 1)
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected];
            }
        });
    }); })); });
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should throw error if actual updated date does not equal expected updated date", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostWithUpdateDate_1.PostWithUpdateDate();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, connection.createQueryBuilder(PostWithUpdateDate_1.PostWithUpdateDate, "post")
                            .setLock("optimistic", new Date(2017, 1, 1))
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.be.rejectedWith(OptimisticLockVersionMismatchError_1.OptimisticLockVersionMismatchError)];
            }
        });
    }); })); });
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should not throw error if actual updated date and expected updated date are equal", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver)
                        return [2 /*return*/];
                    post = new PostWithUpdateDate_1.PostWithUpdateDate();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, connection.createQueryBuilder(PostWithUpdateDate_1.PostWithUpdateDate, "post")
                            .setLock("optimistic", post.updateDate)
                            .where("post.id = :id", { id: 1 })
                            .getOne().should.not.be.rejected];
            }
        });
    }); })); });
    // skipped because inserted milliseconds are not always equal to what we say it to insert, unskip when needed
    it.skip("should work if both version and update date columns applied", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate();
                    post.title = "New post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.all([
                            connection.createQueryBuilder(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate, "post")
                                .setLock("optimistic", post.updateDate)
                                .where("post.id = :id", { id: 1 })
                                .getOne().should.not.be.rejected,
                            connection.createQueryBuilder(PostWithVersionAndUpdatedDate_1.PostWithVersionAndUpdatedDate, "post")
                                .setLock("optimistic", 1)
                                .where("post.id = :id", { id: 1 })
                                .getOne().should.not.be.rejected
                        ])];
            }
        });
    }); })); });
    it("should throw error if pessimistic locking not supported by given driver", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver)
                return [2 /*return*/, connection.manager.transaction(function (entityManager) {
                        return Promise.all([
                            entityManager.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                                .setLock("pessimistic_read")
                                .where("post.id = :id", { id: 1 })
                                .getOne().should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError),
                            entityManager.createQueryBuilder(PostWithVersion_1.PostWithVersion, "post")
                                .setLock("pessimistic_write")
                                .where("post.id = :id", { id: 1 })
                                .getOne().should.be.rejectedWith(LockNotSupportedOnGivenDriverError_1.LockNotSupportedOnGivenDriverError)
                        ]);
                    })];
            return [2 /*return*/];
        });
    }); })); });
});
//# sourceMappingURL=query-builder-locking.js.map