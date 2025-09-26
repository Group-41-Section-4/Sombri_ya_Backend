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
var Post_1 = require("./entity/Post");
var Counters_1 = require("./entity/Counters");
var chai_1 = require("chai");
var test_utils_1 = require("../../../utils/test-utils");
describe("embedded > outer-primary-column", function () {
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
    it("should insert, load, update and remove entities with embeddeds when primary column defined only in embedded entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post1, post2, loadedPosts, loadedPost, loadedPost2, loadedPosts2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post1 = new Post_1.Post();
                    post1.title = "About cars";
                    post1.text = "About cars";
                    post1.counters = new Counters_1.Counters();
                    post1.counters.code = 1;
                    post1.counters.comments = 1;
                    post1.counters.favorites = 2;
                    post1.counters.likes = 3;
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About airplanes";
                    post2.text = "About airplanes";
                    post2.counters = new Counters_1.Counters();
                    post2.counters.code = 2;
                    post2.counters.comments = 2;
                    post2.counters.favorites = 3;
                    post2.counters.likes = 4;
                    return [4 /*yield*/, postRepository.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .orderBy("post.counters.code")
                            .getMany()];
                case 3:
                    loadedPosts = _a.sent();
                    chai_1.expect(loadedPosts[0].title).to.be.equal("About cars");
                    chai_1.expect(loadedPosts[0].counters.should.be.eql({ code: 1, comments: 1, favorites: 2, likes: 3 }));
                    chai_1.expect(loadedPosts[1].title).to.be.equal("About airplanes");
                    chai_1.expect(loadedPosts[1].counters.should.be.eql({ code: 2, comments: 2, favorites: 3, likes: 4 }));
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    chai_1.expect(loadedPost.title).to.be.equal("About cars");
                    chai_1.expect(loadedPost.counters.should.be.eql({ code: 1, comments: 1, favorites: 2, likes: 3 }));
                    loadedPost.counters.favorites += 1;
                    return [4 /*yield*/, postRepository.save(loadedPost)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 6:
                    loadedPost2 = (_a.sent());
                    chai_1.expect(loadedPost.title).to.be.equal("About cars");
                    chai_1.expect(loadedPost.counters.should.be.eql({ code: 1, comments: 1, favorites: 3, likes: 3 }));
                    return [4 /*yield*/, postRepository.remove(loadedPost2)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, postRepository.find()];
                case 8:
                    loadedPosts2 = (_a.sent());
                    chai_1.expect(loadedPosts2.length).to.be.equal(1);
                    chai_1.expect(loadedPosts2[0].title).to.be.equal("About airplanes");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=outer-primary-column.js.map