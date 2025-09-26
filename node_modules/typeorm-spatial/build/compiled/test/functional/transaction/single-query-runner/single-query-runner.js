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
var Post_1 = require("./entity/Post");
var chai_1 = require("chai");
var PostRepository_1 = require("./repository/PostRepository");
describe("transaction > single query runner", function () {
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
    it("should execute all operations in the method in a transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                    var originalQueryRunner;
                    return __generator(this, function (_a) {
                        originalQueryRunner = transactionalEntityManager.queryRunner;
                        chai_1.expect(originalQueryRunner).to.exist;
                        chai_1.expect(transactionalEntityManager.getRepository(Post_1.Post).queryRunner).to.exist;
                        transactionalEntityManager.getRepository(Post_1.Post).queryRunner.should.be.equal(originalQueryRunner);
                        transactionalEntityManager.getRepository(Post_1.Post).manager.should.be.equal(transactionalEntityManager);
                        transactionalEntityManager.getCustomRepository(PostRepository_1.PostRepository).getManager().should.be.equal(transactionalEntityManager);
                        return [2 /*return*/];
                    });
                }); })];
        });
    }); })); });
    it("should execute all operations in the method in a transaction (#804)", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var entityManager, loadedPost1, loadedPost2, loadedPost3, loadedPost4, loadedPost5, loadedPost6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entityManager = connection.createQueryRunner().manager;
                    entityManager.should.not.be.equal(connection.manager);
                    entityManager.queryRunner.should.be.equal(entityManager.queryRunner);
                    return [4 /*yield*/, entityManager.save(new Post_1.Post(undefined, "Hello World"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, entityManager.queryRunner.startTransaction()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 3:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1).to.be.eql({ id: 1, title: "Hello World" });
                    return [4 /*yield*/, entityManager.remove(loadedPost1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 5:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2).to.be.undefined;
                    return [4 /*yield*/, entityManager.queryRunner.rollbackTransaction()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 7:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3).to.be.eql({ id: 1, title: "Hello World" });
                    return [4 /*yield*/, entityManager.queryRunner.startTransaction()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 9:
                    loadedPost4 = _a.sent();
                    chai_1.expect(loadedPost4).to.be.eql({ id: 1, title: "Hello World" });
                    return [4 /*yield*/, entityManager.query("DELETE FROM " + connection.driver.escape("post"))];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 11:
                    loadedPost5 = _a.sent();
                    chai_1.expect(loadedPost5).to.be.undefined;
                    return [4 /*yield*/, entityManager.queryRunner.rollbackTransaction()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Hello World" })];
                case 13:
                    loadedPost6 = _a.sent();
                    chai_1.expect(loadedPost6).to.be.eql({ id: 1, title: "Hello World" });
                    return [4 /*yield*/, entityManager.queryRunner.release()];
                case 14:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=single-query-runner.js.map