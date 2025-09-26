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
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var PostCategory_1 = require("./entity/PostCategory");
var chai_1 = require("chai");
describe("github issues > #58 relations with multiple primary keys", function () {
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
    it("should persist successfully and return persisted entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category1, category2, post, postCategory1, postCategory2, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "category #1";
                    category2 = new Category_1.Category();
                    category2.name = "category #2";
                    post = new Post_1.Post();
                    post.title = "Hello Post #1";
                    postCategory1 = new PostCategory_1.PostCategory();
                    postCategory1.addedByAdmin = true;
                    postCategory1.addedByUser = false;
                    postCategory1.category = category1;
                    postCategory1.post = post;
                    postCategory2 = new PostCategory_1.PostCategory();
                    postCategory2.addedByAdmin = false;
                    postCategory2.addedByUser = true;
                    postCategory2.category = category2;
                    postCategory2.post = post;
                    return [4 /*yield*/, connection.manager.save(postCategory1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(postCategory2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .innerJoinAndSelect("post.categories", "postCategory")
                            .innerJoinAndSelect("postCategory.category", "category")
                            .getOne()];
                case 3:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql({
                        id: 1,
                        title: "Hello Post #1",
                        categories: [{
                                addedByAdmin: true,
                                addedByUser: false,
                                category: {
                                    id: 1,
                                    name: "category #1"
                                }
                            }, {
                                addedByAdmin: false,
                                addedByUser: true,
                                category: {
                                    id: 2,
                                    name: "category #2"
                                }
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-58.js.map