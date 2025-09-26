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
var User_1 = require("./entity/User");
var Profile_1 = require("./entity/Profile");
var Editor_1 = require("./entity/Editor");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
describe("relations > eager relations > basic", function () {
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
    function prepareData(connection) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, user, primaryCategory1, primaryCategory2, secondaryCategory1, secondaryCategory2, post, editor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        profile = new Profile_1.Profile();
                        profile.about = "I cut trees!";
                        return [4 /*yield*/, connection.manager.save(profile)];
                    case 1:
                        _a.sent();
                        user = new User_1.User();
                        user.firstName = "Timber";
                        user.lastName = "Saw";
                        user.profile = profile;
                        return [4 /*yield*/, connection.manager.save(user)];
                    case 2:
                        _a.sent();
                        primaryCategory1 = new Category_1.Category();
                        primaryCategory1.name = "primary category #1";
                        return [4 /*yield*/, connection.manager.save(primaryCategory1)];
                    case 3:
                        _a.sent();
                        primaryCategory2 = new Category_1.Category();
                        primaryCategory2.name = "primary category #2";
                        return [4 /*yield*/, connection.manager.save(primaryCategory2)];
                    case 4:
                        _a.sent();
                        secondaryCategory1 = new Category_1.Category();
                        secondaryCategory1.name = "secondary category #1";
                        return [4 /*yield*/, connection.manager.save(secondaryCategory1)];
                    case 5:
                        _a.sent();
                        secondaryCategory2 = new Category_1.Category();
                        secondaryCategory2.name = "secondary category #2";
                        return [4 /*yield*/, connection.manager.save(secondaryCategory2)];
                    case 6:
                        _a.sent();
                        post = new Post_1.Post();
                        post.title = "about eager relations";
                        post.categories1 = [primaryCategory1, primaryCategory2];
                        post.categories2 = [secondaryCategory1, secondaryCategory2];
                        post.author = user;
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 7:
                        _a.sent();
                        editor = new Editor_1.Editor();
                        editor.post = post;
                        editor.user = user;
                        return [4 /*yield*/, connection.manager.save(editor)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it("should load all eager relations when object is loaded", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepareData(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1)];
                case 2:
                    loadedPost = _a.sent();
                    loadedPost.should.be.eql({
                        id: 1,
                        title: "about eager relations",
                        categories1: [{
                                id: 1,
                                name: "primary category #1"
                            }, {
                                id: 2,
                                name: "primary category #2"
                            }],
                        categories2: [{
                                id: 3,
                                name: "secondary category #1"
                            }, {
                                id: 4,
                                name: "secondary category #2"
                            }],
                        author: {
                            id: 1,
                            firstName: "Timber",
                            lastName: "Saw",
                            profile: {
                                id: 1,
                                about: "I cut trees!"
                            }
                        },
                        editors: [{
                                user: {
                                    id: 1,
                                    firstName: "Timber",
                                    lastName: "Saw",
                                    profile: {
                                        id: 1,
                                        about: "I cut trees!"
                                    }
                                }
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should not load eager relations when query builder is used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepareData(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Post_1.Post, "post")
                            .where("post.id = :id", { id: 1 })
                            .getOne()];
                case 2:
                    loadedPost = _a.sent();
                    loadedPost.should.be.eql({
                        id: 1,
                        title: "about eager relations"
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=basic-eager-relations.js.map