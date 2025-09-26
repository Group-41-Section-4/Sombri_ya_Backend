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
var Post_1 = require("./entity/Post");
var Counters_1 = require("./entity/Counters");
var test_utils_1 = require("../../../utils/test-utils");
var Subcounters_1 = require("../embedded-many-to-one-case2/entity/Subcounters");
describe("embedded > embedded-with-special-columns", function () {
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
    it("should insert, load, update and remove entities with embeddeds when embeds contains special columns (e.g. CreateDateColumn, UpdateDateColumn, VersionColumn", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts, loadedPost, prevUpdateDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About cars";
                    post1.counters = new Counters_1.Counters();
                    post1.counters.comments = 1;
                    post1.counters.favorites = 2;
                    post1.counters.likes = 3;
                    post1.counters.subcounters = new Subcounters_1.Subcounters();
                    post1.counters.subcounters.watches = 5;
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About airplanes";
                    post2.counters = new Counters_1.Counters();
                    post2.counters.comments = 2;
                    post2.counters.favorites = 3;
                    post2.counters.likes = 4;
                    post2.counters.subcounters = new Subcounters_1.Subcounters();
                    post2.counters.subcounters.watches = 10;
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .orderBy("post.id")
                            .getMany()];
                case 3:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].counters.createdDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPosts[0].counters.updatedDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPosts[0].counters.subcounters.version.should.be.equal(1));
                    chai_1.expect(loadedPosts[1].counters.createdDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPosts[1].counters.updatedDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPosts[1].counters.subcounters.version.should.be.equal(1));
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .orderBy("post.id")
                            .where("post.id = :id", { id: 1 })
                            .getOne()];
                case 4:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost.counters.createdDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPost.counters.updatedDate.should.be.instanceof(Date));
                    chai_1.expect(loadedPost.counters.subcounters.version.should.be.equal(1));
                    prevUpdateDate = loadedPost.counters.updatedDate;
                    loadedPost.title = "About cars #2";
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).save(loadedPost)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .where("post.id = :id", { id: 1 })
                            .getOne()];
                case 7:
                    loadedPost = _a.sent();
                    chai_1.expect((loadedPost.counters.updatedDate.valueOf()).should.be.greaterThan(prevUpdateDate.valueOf()));
                    chai_1.expect(loadedPost.counters.subcounters.version.should.be.equal(2));
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=embedded-with-special-columns.js.map