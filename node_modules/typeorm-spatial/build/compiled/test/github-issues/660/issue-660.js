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
var User_1 = require("./entity/User");
var SqlServerDriver_1 = require("../../../src/driver/sqlserver/SqlServerDriver");
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var chai_1 = require("chai");
var ReturningStatementNotSupportedError_1 = require("../../../src/error/ReturningStatementNotSupportedError");
describe("github issues > #660 Specifying a RETURNING or OUTPUT clause with QueryBuilder", function () {
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
    it("should create an INSERT statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, sql;
        return __generator(this, function (_a) {
            user = new User_1.User();
            user.name = "Tim Merrison";
            sql = "";
            try {
                sql = connection.createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values(user)
                    .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "inserted.*")
                    .disableEscaping()
                    .getSql();
            }
            catch (err) {
                chai_1.expect(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
            }
            if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                chai_1.expect(sql).to.equal("INSERT INTO user(name) OUTPUT inserted.* VALUES (@0)");
            }
            else if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                chai_1.expect(sql).to.equal("INSERT INTO user(name) VALUES ($1) RETURNING *");
            }
            return [2 /*return*/];
        });
    }); })); });
    it("should perform insert with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, returning;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Tim Merrison";
                    if (!(connection.driver instanceof SqlServerDriver_1.SqlServerDriver || connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .insert()
                            .into(User_1.User)
                            .values(user)
                            .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "inserted.*")
                            .execute()];
                case 1:
                    returning = _a.sent();
                    returning.raw.should.be.eql([
                        { id: 1, name: user.name }
                    ]);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); })); });
    it("should create an UPDATE statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, sql;
        return __generator(this, function (_a) {
            user = new User_1.User();
            user.name = "Tim Merrison";
            try {
                sql = connection.createQueryBuilder()
                    .update(User_1.User)
                    .set({ name: "Joe Bloggs" })
                    .where("name = :name", { name: user.name })
                    .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "inserted.*")
                    .disableEscaping()
                    .getSql();
                if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                    chai_1.expect(sql).to.equal("UPDATE user SET name = @0 OUTPUT inserted.* WHERE name = @1");
                }
                else if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                    chai_1.expect(sql).to.equal("UPDATE user SET name = $1 WHERE name = $2 RETURNING *");
                }
            }
            catch (err) {
                chai_1.expect(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
            }
            return [2 /*return*/];
        });
    }); })); });
    it("should perform update with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, returning;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Tim Merrison";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    if (!(connection.driver instanceof SqlServerDriver_1.SqlServerDriver || connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 3];
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(User_1.User)
                            .set({ name: "Joe Bloggs" })
                            .where("name = :name", { name: user.name })
                            .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "inserted.*")
                            .execute()];
                case 2:
                    returning = _a.sent();
                    returning.raw.should.be.eql([
                        { id: 1, name: "Joe Bloggs" }
                    ]);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); })); });
    it("should create a DELETE statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, sql;
        return __generator(this, function (_a) {
            try {
                user = new User_1.User();
                user.name = "Tim Merrison";
                sql = connection.createQueryBuilder()
                    .delete()
                    .from(User_1.User)
                    .where("name = :name", { name: user.name })
                    .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "deleted.*")
                    .disableEscaping()
                    .getSql();
                if (connection.driver instanceof SqlServerDriver_1.SqlServerDriver) {
                    chai_1.expect(sql).to.equal("DELETE FROM user OUTPUT deleted.* WHERE name = @0");
                }
                else if (connection.driver instanceof PostgresDriver_1.PostgresDriver) {
                    chai_1.expect(sql).to.equal("DELETE FROM user WHERE name = $1 RETURNING *");
                }
            }
            catch (err) {
                chai_1.expect(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
            }
            return [2 /*return*/];
        });
    }); })); });
    it("should perform delete with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, returning;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Tim Merrison";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    if (!(connection.driver instanceof SqlServerDriver_1.SqlServerDriver || connection.driver instanceof PostgresDriver_1.PostgresDriver)) return [3 /*break*/, 3];
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .delete()
                            .from(User_1.User)
                            .where("name = :name", { name: user.name })
                            .returning(connection.driver instanceof PostgresDriver_1.PostgresDriver ? "*" : "deleted.*")
                            .execute()];
                case 2:
                    returning = _a.sent();
                    returning.raw.should.be.eql([
                        { id: 1, name: user.name }
                    ]);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-660.js.map