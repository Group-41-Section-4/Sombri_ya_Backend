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
var MongoRepository_1 = require("../../../../../src/repository/MongoRepository");
describe("mongodb > MongoRepository", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post],
                        enabledDrivers: ["mongodb"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("connection should return mongo repository when requested", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository;
        return __generator(this, function (_a) {
            postRepository = connection.getMongoRepository(Post_1.Post);
            postRepository.should.be.instanceOf(MongoRepository_1.MongoRepository);
            return [2 /*return*/];
        });
    }); })); });
    it("entity manager should return mongo repository when requested", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository;
        return __generator(this, function (_a) {
            postRepository = connection.manager.getMongoRepository(Post_1.Post);
            postRepository.should.be.instanceOf(MongoRepository_1.MongoRepository);
            return [2 /*return*/];
        });
    }); })); });
    it("should be able to use entity cursor which will return instances of entity classes", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, firstPost, secondPost, cursor, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getMongoRepository(Post_1.Post);
                    firstPost = new Post_1.Post();
                    firstPost.title = "Post #1";
                    firstPost.text = "Everything about post #1";
                    return [4 /*yield*/, postRepository.save(firstPost)];
                case 1:
                    _a.sent();
                    secondPost = new Post_1.Post();
                    secondPost.title = "Post #2";
                    secondPost.text = "Everything about post #2";
                    return [4 /*yield*/, postRepository.save(secondPost)];
                case 2:
                    _a.sent();
                    cursor = postRepository.createEntityCursor({
                        title: "Post #1"
                    });
                    return [4 /*yield*/, cursor.toArray()];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.length.should.be.equal(1);
                    loadedPosts[0].should.be.instanceOf(Post_1.Post);
                    loadedPosts[0].id.should.be.eql(firstPost.id);
                    loadedPosts[0].title.should.be.equal("Post #1");
                    loadedPosts[0].text.should.be.equal("Everything about post #1");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to use entity cursor which will return instances of entity classes", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, firstPost, secondPost, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getMongoRepository(Post_1.Post);
                    firstPost = new Post_1.Post();
                    firstPost.title = "Post #1";
                    firstPost.text = "Everything about post #1";
                    return [4 /*yield*/, postRepository.save(firstPost)];
                case 1:
                    _a.sent();
                    secondPost = new Post_1.Post();
                    secondPost.title = "Post #2";
                    secondPost.text = "Everything about post #2";
                    return [4 /*yield*/, postRepository.save(secondPost)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postRepository.find({
                            where: {
                                $or: [
                                    {
                                        title: "Post #1",
                                    },
                                    {
                                        text: "Everything about post #1"
                                    }
                                ]
                            }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.length.should.be.equal(1);
                    loadedPosts[0].should.be.instanceOf(Post_1.Post);
                    loadedPosts[0].id.should.be.eql(firstPost.id);
                    loadedPosts[0].title.should.be.equal("Post #1");
                    loadedPosts[0].text.should.be.equal("Everything about post #1");
                    return [2 /*return*/];
            }
        });
    }); })); });
    // todo: cover other methods as well
});
//# sourceMappingURL=mongo-repository.js.map