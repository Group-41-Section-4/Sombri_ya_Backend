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
var Category_1 = require("./entity/Category");
var chai_1 = require("chai");
var Counters_1 = require("./entity/Counters");
describe("persistence > partial persist", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
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
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should persist partial entities without data loss", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, categoryRepository, newCategory, newPost, loadedPost, loadedPostAfterTitleUpdate, loadedPostAfterStarsUpdate, loadedPostAfterCategoryUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    categoryRepository = connection.getRepository(Category_1.Category);
                    newCategory = new Category_1.Category();
                    newCategory.name = "Animals";
                    newCategory.position = 999;
                    return [4 /*yield*/, categoryRepository.save(newCategory)];
                case 1:
                    _a.sent();
                    newPost = new Post_1.Post();
                    newPost.title = "All about animals";
                    newPost.description = "Description of the post about animals";
                    newPost.categories = [newCategory];
                    newPost.counters = new Counters_1.Counters();
                    newPost.counters.stars = 5;
                    newPost.counters.commentCount = 2;
                    newPost.counters.metadata = "Animals Metadata";
                    return [4 /*yield*/, postRepository.save(newPost)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 3:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    chai_1.expect(loadedPost.categories).not.to.be.empty;
                    loadedPost.title.should.be.equal("All about animals");
                    loadedPost.description.should.be.equal("Description of the post about animals");
                    loadedPost.categories[0].name.should.be.equal("Animals");
                    loadedPost.categories[0].position.should.be.equal(999);
                    loadedPost.counters.metadata.should.be.equal("Animals Metadata");
                    loadedPost.counters.stars.should.be.equal(5);
                    loadedPost.counters.commentCount.should.be.equal(2);
                    // now update partially
                    return [4 /*yield*/, postRepository.update({ title: "All about animals" }, { title: "All about bears" })];
                case 4:
                    // now update partially
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 5:
                    loadedPostAfterTitleUpdate = _a.sent();
                    chai_1.expect(loadedPostAfterTitleUpdate).not.to.be.empty;
                    chai_1.expect(loadedPostAfterTitleUpdate.categories).not.to.be.empty;
                    loadedPostAfterTitleUpdate.title.should.be.equal("All about bears");
                    loadedPostAfterTitleUpdate.description.should.be.equal("Description of the post about animals");
                    loadedPostAfterTitleUpdate.categories[0].name.should.be.equal("Animals");
                    loadedPostAfterTitleUpdate.categories[0].position.should.be.equal(999);
                    loadedPostAfterTitleUpdate.counters.metadata.should.be.equal("Animals Metadata");
                    loadedPostAfterTitleUpdate.counters.stars.should.be.equal(5);
                    loadedPostAfterTitleUpdate.counters.commentCount.should.be.equal(2);
                    // now update in partial embeddable column
                    return [4 /*yield*/, postRepository.update({ id: 1 }, { counters: { stars: 10 } })];
                case 6:
                    // now update in partial embeddable column
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 7:
                    loadedPostAfterStarsUpdate = _a.sent();
                    chai_1.expect(loadedPostAfterStarsUpdate).not.to.be.empty;
                    chai_1.expect(loadedPostAfterStarsUpdate.categories).not.to.be.empty;
                    loadedPostAfterStarsUpdate.title.should.be.equal("All about bears");
                    loadedPostAfterStarsUpdate.description.should.be.equal("Description of the post about animals");
                    loadedPostAfterStarsUpdate.categories[0].name.should.be.equal("Animals");
                    loadedPostAfterStarsUpdate.categories[0].position.should.be.equal(999);
                    loadedPostAfterStarsUpdate.counters.metadata.should.be.equal("Animals Metadata");
                    loadedPostAfterStarsUpdate.counters.stars.should.be.equal(10);
                    loadedPostAfterStarsUpdate.counters.commentCount.should.be.equal(2);
                    // now update in relational column
                    return [4 /*yield*/, postRepository.save({ id: 1, categories: [{ id: 1, name: "Bears" }] })];
                case 8:
                    // now update in relational column
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1, {
                            join: {
                                alias: "post",
                                leftJoinAndSelect: {
                                    categories: "post.categories"
                                }
                            }
                        })];
                case 9:
                    loadedPostAfterCategoryUpdate = _a.sent();
                    chai_1.expect(loadedPostAfterCategoryUpdate).not.to.be.empty;
                    chai_1.expect(loadedPostAfterCategoryUpdate.categories).not.to.be.empty;
                    loadedPostAfterCategoryUpdate.title.should.be.equal("All about bears");
                    loadedPostAfterCategoryUpdate.description.should.be.equal("Description of the post about animals");
                    loadedPostAfterCategoryUpdate.categories[0].name.should.be.equal("Bears");
                    loadedPostAfterCategoryUpdate.categories[0].position.should.be.equal(999);
                    loadedPostAfterCategoryUpdate.counters.metadata.should.be.equal("Animals Metadata");
                    loadedPostAfterCategoryUpdate.counters.stars.should.be.equal(10);
                    loadedPostAfterCategoryUpdate.counters.commentCount.should.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=partial-persist.js.map