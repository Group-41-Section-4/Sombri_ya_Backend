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
var test_utils_1 = require("../../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Counters_1 = require("./entity/Counters");
var chai_1 = require("chai");
describe("mongodb > array columns", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post, Counters_1.Counters],
                        enabledDrivers: ["mongodb"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should insert / update array columns correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post, loadedPost, loadedUpdatedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post = new Post_1.Post();
                    post.title = "Post";
                    post.names = ["umed", "dima", "bakhrom"];
                    post.numbers = [1, 0, 1];
                    post.booleans = [true, false, false];
                    post.counters = [
                        new Counters_1.Counters(1, "number #1"),
                        new Counters_1.Counters(2, "number #2"),
                        new Counters_1.Counters(3, "number #3"),
                    ];
                    post.other1 = [];
                    return [4 /*yield*/, postRepository.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Post" })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.not.empty;
                    chai_1.expect(loadedPost.names).to.be.not.empty;
                    chai_1.expect(loadedPost.numbers).to.be.not.empty;
                    chai_1.expect(loadedPost.booleans).to.be.not.empty;
                    chai_1.expect(loadedPost.counters).to.be.not.empty;
                    loadedPost.other1.length.should.be.equal(0);
                    chai_1.expect(loadedPost.other2).to.be.empty;
                    loadedPost.names[0].should.be.equal("umed");
                    loadedPost.names[1].should.be.equal("dima");
                    loadedPost.names[2].should.be.equal("bakhrom");
                    loadedPost.numbers[0].should.be.equal(1);
                    loadedPost.numbers[1].should.be.equal(0);
                    loadedPost.numbers[2].should.be.equal(1);
                    loadedPost.booleans[0].should.be.equal(true);
                    loadedPost.booleans[1].should.be.equal(false);
                    loadedPost.booleans[2].should.be.equal(false);
                    loadedPost.counters[0].should.be.instanceOf(Counters_1.Counters);
                    loadedPost.counters[1].should.be.instanceOf(Counters_1.Counters);
                    loadedPost.counters[2].should.be.instanceOf(Counters_1.Counters);
                    loadedPost.counters[0].likes.should.be.equal(1);
                    loadedPost.counters[1].likes.should.be.equal(2);
                    loadedPost.counters[2].likes.should.be.equal(3);
                    loadedPost.counters[0].text.should.be.equal("number #1");
                    loadedPost.counters[1].text.should.be.equal("number #2");
                    loadedPost.counters[2].text.should.be.equal("number #3");
                    // now update the post
                    post.names = ["umed!", "dima!", "bakhrom!"];
                    post.numbers = [11, 10, 11];
                    post.booleans = [true, true, true];
                    post.counters = [
                        new Counters_1.Counters(11, "number #11"),
                        new Counters_1.Counters(12, "number #12"),
                    ];
                    post.other1 = [
                        new Counters_1.Counters(0, "other"),
                    ];
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne({ title: "Post" })];
                case 4:
                    loadedUpdatedPost = _a.sent();
                    chai_1.expect(loadedUpdatedPost).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.names).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.numbers).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.booleans).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.counters).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.other1).to.be.not.empty;
                    chai_1.expect(loadedUpdatedPost.other2).to.be.empty;
                    loadedUpdatedPost.names[0].should.be.equal("umed!");
                    loadedUpdatedPost.names[1].should.be.equal("dima!");
                    loadedUpdatedPost.names[2].should.be.equal("bakhrom!");
                    loadedUpdatedPost.numbers[0].should.be.equal(11);
                    loadedUpdatedPost.numbers[1].should.be.equal(10);
                    loadedUpdatedPost.numbers[2].should.be.equal(11);
                    loadedUpdatedPost.booleans[0].should.be.equal(true);
                    loadedUpdatedPost.booleans[1].should.be.equal(true);
                    loadedUpdatedPost.booleans[2].should.be.equal(true);
                    loadedUpdatedPost.counters[0].should.be.instanceOf(Counters_1.Counters);
                    loadedUpdatedPost.counters[1].should.be.instanceOf(Counters_1.Counters);
                    loadedUpdatedPost.counters[0].likes.should.be.equal(11);
                    loadedUpdatedPost.counters[1].likes.should.be.equal(12);
                    loadedUpdatedPost.counters[0].text.should.be.equal("number #11");
                    loadedUpdatedPost.counters[1].text.should.be.equal("number #12");
                    loadedUpdatedPost.other1[0].should.be.instanceOf(Counters_1.Counters);
                    loadedUpdatedPost.other1[0].likes.should.be.equal(0);
                    loadedUpdatedPost.other1[0].text.should.be.equal("other");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=mongodb-array-columns.js.map