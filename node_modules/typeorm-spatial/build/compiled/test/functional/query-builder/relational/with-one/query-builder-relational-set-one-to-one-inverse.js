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
var Image_1 = require("./entity/Image");
var test_utils_1 = require("../../../../utils/test-utils");
var chai_1 = require("chai");
describe("query builder > relational query builder > set operation > one-to-one non owner side", function () {
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
    it("should set entity relation of a given entity by entity objects", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var image1, image2, image3, post1, post2, post3, loadedPost1, loadedPost2, loadedPost3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image1 = new Image_1.Image();
                    image1.url = "image #1";
                    return [4 /*yield*/, connection.manager.save(image1)];
                case 1:
                    _a.sent();
                    image2 = new Image_1.Image();
                    image2.url = "image #2";
                    return [4 /*yield*/, connection.manager.save(image2)];
                case 2:
                    _a.sent();
                    image3 = new Image_1.Image();
                    image3.url = "image #3";
                    return [4 /*yield*/, connection.manager.save(image3)];
                case 3:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "post #1";
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 4:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "post #2";
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 5:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "post #3";
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of(image1)
                            .set(post1)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 8:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.eql({ id: 1, url: "image #1" });
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 9:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 10:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of(image1)
                            .set(null)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 12:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 13:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 14:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should set entity relation of a given entity by entity id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var image1, image2, image3, post1, post2, post3, loadedPost1, loadedPost2, loadedPost3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image1 = new Image_1.Image();
                    image1.url = "image #1";
                    return [4 /*yield*/, connection.manager.save(image1)];
                case 1:
                    _a.sent();
                    image2 = new Image_1.Image();
                    image2.url = "image #2";
                    return [4 /*yield*/, connection.manager.save(image2)];
                case 2:
                    _a.sent();
                    image3 = new Image_1.Image();
                    image3.url = "image #3";
                    return [4 /*yield*/, connection.manager.save(image3)];
                case 3:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "post #1";
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 4:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "post #2";
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 5:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "post #3";
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of(2)
                            .set(2)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 8:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 9:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.eql({ id: 2, url: "image #2" });
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 10:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of(2)
                            .set(null)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 12:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 13:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 14:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should set entity relation of a given entity by entity id map", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var image1, image2, image3, post1, post2, post3, loadedPost1, loadedPost2, loadedPost3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image1 = new Image_1.Image();
                    image1.url = "image #1";
                    return [4 /*yield*/, connection.manager.save(image1)];
                case 1:
                    _a.sent();
                    image2 = new Image_1.Image();
                    image2.url = "image #2";
                    return [4 /*yield*/, connection.manager.save(image2)];
                case 2:
                    _a.sent();
                    image3 = new Image_1.Image();
                    image3.url = "image #3";
                    return [4 /*yield*/, connection.manager.save(image3)];
                case 3:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "post #1";
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 4:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "post #2";
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 5:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "post #3";
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of({ id: 3 })
                            .set({ id: 3 })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 8:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 9:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 10:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.eql({ id: 3, url: "image #3" });
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of({ id: 3 })
                            .set(null)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 12:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 13:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 14:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should raise error when setting entity relation of a multiple entities", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var image1, image2, image3, post1, post2, post3, error, e_1, loadedPost1, loadedPost2, loadedPost3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image1 = new Image_1.Image();
                    image1.url = "image #1";
                    return [4 /*yield*/, connection.manager.save(image1)];
                case 1:
                    _a.sent();
                    image2 = new Image_1.Image();
                    image2.url = "image #2";
                    return [4 /*yield*/, connection.manager.save(image2)];
                case 2:
                    _a.sent();
                    image3 = new Image_1.Image();
                    image3.url = "image #3";
                    return [4 /*yield*/, connection.manager.save(image3)];
                case 3:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "post #1";
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 4:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "post #2";
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 5:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "post #3";
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 6:
                    _a.sent();
                    error = null;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .relation(Image_1.Image, "post")
                            .of({ id: 3 })
                            .set([{ id: 1 }, { id: 3 }])];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_1 = _a.sent();
                    error = e_1;
                    return [3 /*break*/, 10];
                case 10:
                    chai_1.expect(error).to.be.an.instanceof(Error);
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, { relations: ["image"] })];
                case 11:
                    loadedPost1 = _a.sent();
                    chai_1.expect(loadedPost1.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 2, { relations: ["image"] })];
                case 12:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.image).to.be.null;
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 3, { relations: ["image"] })];
                case 13:
                    loadedPost3 = _a.sent();
                    chai_1.expect(loadedPost3.image).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-relational-set-one-to-one-inverse.js.map