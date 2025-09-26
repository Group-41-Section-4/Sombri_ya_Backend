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
var test_utils_1 = require("../../../utils/test-utils");
var SimplePost_1 = require("./entity/SimplePost");
var SimpleCounters_1 = require("./entity/SimpleCounters");
var Information_1 = require("./entity/Information");
var Post_1 = require("./entity/Post");
describe("columns > embedded columns", function () {
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
    it("should insert / update / remove entity with embedded correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post, loadedPost, loadedUpdatedPost, removedPost, removedUpdatedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(SimplePost_1.SimplePost);
                    post = new SimplePost_1.SimplePost();
                    post.title = "Post";
                    post.text = "Everything about post";
                    post.counters = new SimpleCounters_1.SimpleCounters();
                    post.counters.likes = 5;
                    post.counters.comments = 1;
                    post.counters.favorites = 10;
                    post.counters.information = new Information_1.Information();
                    post.counters.information.description = "Hello post";
                    return [4 /*yield*/, postRepository.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Post" })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.not.empty;
                    chai_1.expect(loadedPost.counters).to.be.not.empty;
                    chai_1.expect(loadedPost.counters.information).to.be.not.empty;
                    loadedPost.should.be.instanceOf(SimplePost_1.SimplePost);
                    loadedPost.title.should.be.equal("Post");
                    loadedPost.text.should.be.equal("Everything about post");
                    loadedPost.counters.should.be.instanceOf(SimpleCounters_1.SimpleCounters);
                    loadedPost.counters.likes.should.be.equal(5);
                    loadedPost.counters.comments.should.be.equal(1);
                    loadedPost.counters.favorites.should.be.equal(10);
                    loadedPost.counters.information.should.be.instanceOf(Information_1.Information);
                    loadedPost.counters.information.description.should.be.equal("Hello post");
                    post.title = "Updated post";
                    post.counters.comments = 2;
                    post.counters.information.description = "Hello updated post";
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Updated post" })];
                case 4:
                    loadedUpdatedPost = _a.sent();
                    chai_1.expect(loadedUpdatedPost).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.counters).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.counters.information).to.be.not.empty;
                    loadedUpdatedPost.should.be.instanceOf(SimplePost_1.SimplePost);
                    loadedUpdatedPost.title.should.be.equal("Updated post");
                    loadedUpdatedPost.text.should.be.equal("Everything about post");
                    loadedUpdatedPost.counters.should.be.instanceOf(SimpleCounters_1.SimpleCounters);
                    loadedUpdatedPost.counters.likes.should.be.equal(5);
                    loadedUpdatedPost.counters.comments.should.be.equal(2);
                    loadedUpdatedPost.counters.favorites.should.be.equal(10);
                    loadedUpdatedPost.counters.information.should.be.instanceOf(Information_1.Information);
                    loadedUpdatedPost.counters.information.description.should.be.equal("Hello updated post");
                    return [4 /*yield*/, postRepository.remove(post)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Post" })];
                case 6:
                    removedPost = _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Updated post" })];
                case 7:
                    removedUpdatedPost = _a.sent();
                    chai_1.expect(removedPost).to.be.empty;
                    chai_1.expect(removedUpdatedPost).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should properly generate column names", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, columns, databaseColumns;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            columns = postRepository.metadata.columns;
            databaseColumns = columns.map(function (c) { return c.databaseName; });
            chai_1.expect(databaseColumns).to.have.members([
                "id",
                "title",
                "text",
                "countersLikes",
                "countersComments",
                "countersFavorites",
                "countersInfoDescr",
                "countersTestDataDescr",
                "testCountersLikes",
                "testCountersComments",
                "testCountersFavorites",
                "testCountersInfoDescr",
                "testCountersTestDataDescr",
            ]);
            return [2 /*return*/];
        });
    }); })); });
});
//# sourceMappingURL=columns-embedded-columns.js.map