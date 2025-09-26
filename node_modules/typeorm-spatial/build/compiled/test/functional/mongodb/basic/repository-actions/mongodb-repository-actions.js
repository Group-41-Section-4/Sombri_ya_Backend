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
var test_utils_1 = require("../../../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("mongodb > basic repository actions", function () {
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
    it("create should create instance of same entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            postRepository.create().should.be.instanceOf(Post_1.Post);
            return [2 /*return*/];
        });
    }); })); });
    it("create should be able to fill data from the given object", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            post = postRepository.create({
                title: "This is created post",
                text: "All about this post"
            });
            post.should.be.instanceOf(Post_1.Post);
            post.title.should.be.equal("This is created post");
            post.text.should.be.equal("All about this post");
            return [2 /*return*/];
        });
    }); })); });
    it("merge should merge all given partial objects into given source entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post, mergedPost;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            post = postRepository.create({
                title: "This is created post",
                text: "All about this post"
            });
            mergedPost = postRepository.merge(post, { title: "This is updated post" }, { text: "And its text is updated as well" });
            mergedPost.should.be.instanceOf(Post_1.Post);
            mergedPost.should.be.equal(post);
            mergedPost.title.should.be.equal("This is updated post");
            mergedPost.text.should.be.equal("And its text is updated as well");
            return [2 /*return*/];
        });
    }); })); });
    it("target should be valid", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            chai_1.expect(postRepository.target).not.to.be.empty;
            postRepository.target.should.be.eql(Post_1.Post);
            return [2 /*return*/];
        });
    }); })); });
    it("should persist entity successfully and after persistence have generated object id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post = new Post_1.Post();
                    post.title = "Post #1";
                    post.text = "Everything about post!";
                    return [4 /*yield*/, postRepository.save(post)];
                case 1:
                    _a.sent();
                    chai_1.expect(post.id).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("hasId should return true if id really has an id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post = new Post_1.Post();
                    post.title = "Post #1";
                    post.text = "Everything about post!";
                    return [4 /*yield*/, postRepository.save(post)];
                case 1:
                    _a.sent();
                    chai_1.expect(post.id).not.to.be.empty;
                    postRepository.hasId(post).should.be.true;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("unsupported methods should throw exception", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository;
        return __generator(this, function (_a) {
            postRepository = connection.getRepository(Post_1.Post);
            chai_1.expect(function () { return postRepository.createQueryBuilder("post"); }).to.throw(Error);
            chai_1.expect(function () { return postRepository.query("SELECT * FROM POSTS"); }).to.throw(Error);
            return [2 /*return*/];
        });
    }); })); });
    it("should return persisted objects using find* methods", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post1, post2, posts, i, post, loadedPost1, loadedPost2, loadedPost3, loadedPosts1, _a, loadedPosts2, loadedPosts2Count;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post1 = new Post_1.Post();
                    post1.title = "First Post";
                    post1.text = "Everything about first post";
                    return [4 /*yield*/, postRepository.save(post1)];
                case 1:
                    _b.sent();
                    post2 = new Post_1.Post();
                    post2.title = "Second Post";
                    post2.text = "Everything about second post";
                    return [4 /*yield*/, postRepository.save(post2)];
                case 2:
                    _b.sent();
                    posts = [];
                    for (i = 0; i < 50; i++) {
                        post = new Post_1.Post();
                        post.title = "Post #" + i;
                        post.text = "Everything about post #" + i;
                        posts.push(post);
                    }
                    return [4 /*yield*/, postRepository.save(posts)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, postRepository.findOne(post1.id)];
                case 4:
                    loadedPost1 = _b.sent();
                    chai_1.expect(loadedPost1.id).to.be.eql(post1.id);
                    chai_1.expect(loadedPost1.title).to.be.equal("First Post");
                    chai_1.expect(loadedPost1.text).to.be.equal("Everything about first post");
                    return [4 /*yield*/, postRepository.findOne({ title: "Second Post" })];
                case 5:
                    loadedPost2 = _b.sent();
                    chai_1.expect(loadedPost2.id).to.be.eql(post2.id);
                    chai_1.expect(loadedPost2.title).to.be.equal("Second Post");
                    chai_1.expect(loadedPost2.text).to.be.equal("Everything about second post");
                    return [4 /*yield*/, postRepository.findByIds([
                            post1.id,
                            post2.id
                        ])];
                case 6:
                    loadedPost3 = _b.sent();
                    chai_1.expect(loadedPost3[0].id).to.be.eql(post1.id);
                    chai_1.expect(loadedPost3[0].title).to.be.equal("First Post");
                    chai_1.expect(loadedPost3[0].text).to.be.equal("Everything about first post");
                    chai_1.expect(loadedPost3[1].id).to.be.eql(post2.id);
                    chai_1.expect(loadedPost3[1].title).to.be.equal("Second Post");
                    chai_1.expect(loadedPost3[1].text).to.be.equal("Everything about second post");
                    return [4 /*yield*/, postRepository.find({
                            skip: 10,
                            take: 10
                        })];
                case 7:
                    loadedPosts1 = _b.sent();
                    loadedPosts1.length.should.be.equal(10);
                    chai_1.expect(loadedPosts1[0].id).not.to.be.empty;
                    chai_1.expect(loadedPosts1[0].title).not.to.be.empty;
                    chai_1.expect(loadedPosts1[0].text).not.to.be.empty;
                    chai_1.expect(loadedPosts1[9].id).not.to.be.empty;
                    chai_1.expect(loadedPosts1[9].title).not.to.be.empty;
                    chai_1.expect(loadedPosts1[9].text).not.to.be.empty;
                    return [4 /*yield*/, postRepository.findAndCount({
                            skip: 5,
                            take: 5
                        })];
                case 8:
                    _a = _b.sent(), loadedPosts2 = _a[0], loadedPosts2Count = _a[1];
                    loadedPosts2.length.should.be.equal(5);
                    loadedPosts2Count.should.be.equal(52);
                    chai_1.expect(loadedPosts2[0].id).not.to.be.empty;
                    chai_1.expect(loadedPosts2[0].title).not.to.be.empty;
                    chai_1.expect(loadedPosts2[0].text).not.to.be.empty;
                    chai_1.expect(loadedPosts2[4].id).not.to.be.empty;
                    chai_1.expect(loadedPosts2[4].title).not.to.be.empty;
                    chai_1.expect(loadedPosts2[4].text).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should sort entities in a query", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, posts, i, post, queryPostsAsc, i, queryPostsDesc, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    posts = [];
                    for (i = 0; i < 10; i++) {
                        post = new Post_1.Post();
                        post.title = "Post #" + i;
                        post.text = "Everything about post #" + i;
                        post.index = i;
                        posts.push(post);
                    }
                    return [4 /*yield*/, postRepository.save(posts)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postRepository.find({
                            order: { index: "ASC" }
                        })];
                case 2:
                    queryPostsAsc = _a.sent();
                    queryPostsAsc.length.should.be.equal(10);
                    for (i = 0; i < 10; i++) {
                        chai_1.expect(queryPostsAsc[i].index).eq(i);
                    }
                    return [4 /*yield*/, postRepository.find({
                            order: { index: "DESC" }
                        })];
                case 3:
                    queryPostsDesc = _a.sent();
                    queryPostsDesc.length.should.be.equal(10);
                    for (j = 0; j < 10; j++) {
                        chai_1.expect(queryPostsDesc[j].index).eq(9 - j);
                    }
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("clear should remove all persisted entities", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, posts, i, post, _a, loadedPosts, postsCount, _b, loadedPostsAfterClear, postsCountAfterClear;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    posts = [];
                    for (i = 0; i < 50; i++) {
                        post = new Post_1.Post();
                        post.title = "Post #" + i;
                        post.text = "Everything about post #" + i;
                        posts.push(post);
                    }
                    return [4 /*yield*/, postRepository.save(posts)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, postRepository.findAndCount()];
                case 2:
                    _a = _c.sent(), loadedPosts = _a[0], postsCount = _a[1];
                    chai_1.expect(postsCount).to.be.equal(50);
                    loadedPosts.length.should.be.equal(50);
                    return [4 /*yield*/, postRepository.clear()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, postRepository.findAndCount()];
                case 4:
                    _b = _c.sent(), loadedPostsAfterClear = _b[0], postsCountAfterClear = _b[1];
                    chai_1.expect(postsCountAfterClear).to.be.equal(0);
                    loadedPostsAfterClear.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("remove should remove given entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post1, post2, loadedPost1, _a, loadedPostsAfterClear, postsCountAfterClear;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post1 = new Post_1.Post();
                    post1.title = "First Post";
                    post1.text = "Everything about first post";
                    return [4 /*yield*/, postRepository.save(post1)];
                case 1:
                    _b.sent();
                    post2 = new Post_1.Post();
                    post2.title = "Second Post";
                    post2.text = "Everything about second post";
                    return [4 /*yield*/, postRepository.save(post2)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, postRepository.findOne(post1.id)];
                case 3:
                    loadedPost1 = _b.sent();
                    return [4 /*yield*/, postRepository.remove(loadedPost1)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, postRepository.remove(post2)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, postRepository.findAndCount()];
                case 6:
                    _a = _b.sent(), loadedPostsAfterClear = _a[0], postsCountAfterClear = _a[1];
                    chai_1.expect(postsCountAfterClear).to.be.equal(0);
                    loadedPostsAfterClear.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("clear should remove all persisted entities", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, posts, i, post, _a, loadedPosts, postsCount, _b, loadedPostsAfterClear, postsCountAfterClear;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    posts = [];
                    for (i = 0; i < 50; i++) {
                        post = new Post_1.Post();
                        post.title = "Post #" + i;
                        post.text = "Everything about post #" + i;
                        posts.push(post);
                    }
                    return [4 /*yield*/, postRepository.save(posts)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, postRepository.findAndCount()];
                case 2:
                    _a = _c.sent(), loadedPosts = _a[0], postsCount = _a[1];
                    chai_1.expect(postsCount).to.be.equal(50);
                    loadedPosts.length.should.be.equal(50);
                    return [4 /*yield*/, postRepository.clear()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, postRepository.findAndCount()];
                case 4:
                    _b = _c.sent(), loadedPostsAfterClear = _b[0], postsCountAfterClear = _b[1];
                    chai_1.expect(postsCountAfterClear).to.be.equal(0);
                    loadedPostsAfterClear.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("preload should pre-load given object", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, postToSave, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    postToSave = new Post_1.Post();
                    postToSave.title = "First Post";
                    postToSave.text = "Everything about first post";
                    return [4 /*yield*/, postRepository.save(postToSave)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postRepository.preload({
                            id: postToSave.id,
                            title: "This is updated post"
                        })];
                case 2:
                    post = _a.sent();
                    // console.log(post);
                    post.should.be.instanceOf(Post_1.Post);
                    post.id.should.be.equal(postToSave.id);
                    post.title.should.be.equal("This is updated post");
                    post.text.should.be.equal("Everything about first post");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=mongodb-repository-actions.js.map