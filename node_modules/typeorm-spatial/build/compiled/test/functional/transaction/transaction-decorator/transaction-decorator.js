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
var PostController_1 = require("./controller/PostController");
var Category_1 = require("./entity/Category");
describe("transaction > method wrapped into transaction decorator", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mysql"] // since @Transaction accepts a specific connection name we can use only one connection and its name
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    // create a fake controller
    var controller = new PostController_1.PostController();
    it("should execute all operations in the method in a transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    post.title = "successfully saved post";
                    category = new Category_1.Category();
                    category.name = "successfully saved category";
                    // call controller method
                    return [4 /*yield*/, controller.save.apply(controller, [post, category])];
                case 1:
                    // call controller method
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql(post);
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    loadedCategory.should.be.eql(category);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should rollback transaction if any operation in the method failed", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, throwError, err_1, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    post.title = "successfully saved post";
                    category = new Category_1.Category();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, controller.save.apply(controller, [post, category])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    throwError = err_1;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(throwError).not.to.be.empty;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 5:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.empty;
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 6:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should rollback transaction if any operation in the method failed", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, throwError, err_2, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    category = new Category_1.Category();
                    category.name = "successfully saved category";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, controller.save.apply(controller, [post, category])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    throwError = err_2;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(throwError).not.to.be.empty;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 5:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.empty;
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 6:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should save even if second operation failed in method not wrapped into @Transaction decorator", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, throwError, err_3, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    post.title = "successfully saved post";
                    category = new Category_1.Category();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, controller.nonSafeSave.apply(controller, [connection.manager, post, category])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    throwError = err_3;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(throwError).not.to.be.empty;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 5:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql(post);
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 6:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should inject repository and custom repository into method decorated with @Transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, savedCategory, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    post.title = "successfully saved post";
                    category = new Category_1.Category();
                    category.name = "successfully saved category";
                    return [4 /*yield*/, controller.saveWithRepository.apply(controller, [post, category])];
                case 1:
                    savedCategory = _a.sent();
                    // controller should successfully call custom repository method and return the found entity
                    chai_1.expect(savedCategory).not.to.be.empty;
                    savedCategory.should.be.eql(category);
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql(post);
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    loadedCategory.should.be.eql(category);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should execute all operations in the method in a transaction with a specified isolation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, loadedPost, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post();
                    post.title = "successfully saved post";
                    category = new Category_1.Category();
                    category.name = "successfully saved category";
                    // call controller method
                    return [4 /*yield*/, controller.saveWithNonDefaultIsolation.apply(controller, [post, category])];
                case 1:
                    // call controller method
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "successfully saved post" } })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql(post);
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "successfully saved category" } })];
                case 3:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).not.to.be.empty;
                    loadedCategory.should.be.eql(category);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=transaction-decorator.js.map