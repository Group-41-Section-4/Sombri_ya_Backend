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
var User_1 = require("./entity/User");
var Category_1 = require("./entity/Category");
var Post_1 = require("./entity/Post");
var Photo_1 = require("./entity/Photo");
describe("repository > find options", function () {
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
    it("should load relations", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user, category, post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User();
                    user.name = "Alex Messer";
                    return [4 /*yield*/, connection.manager.save(user)];
                case 1:
                    _a.sent();
                    category = new Category_1.Category();
                    category.name = "Boys";
                    return [4 /*yield*/, connection.manager.save(category)];
                case 2:
                    _a.sent();
                    post = new Post_1.Post();
                    post.title = "About Alex Messer";
                    post.author = user;
                    post.categories = [category];
                    return [4 /*yield*/, connection.manager.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).findOne({
                            relations: ["author", "categories"]
                        })];
                case 4:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.eql({
                        id: 1,
                        title: "About Alex Messer",
                        author: {
                            id: 1,
                            name: "Alex Messer"
                        },
                        categories: [{
                                id: 1,
                                name: "Boys"
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should select specific columns", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category, categories, photos, i, photo, loadedPhoto, loadedPhotos1, loadedPhotos2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category = new Category_1.Category();
                    category.name = "Bears";
                    return [4 /*yield*/, connection.manager.save(category)];
                case 1:
                    _a.sent();
                    categories = [category];
                    photos = [];
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i < 10)) return [3 /*break*/, 5];
                    photo = new Photo_1.Photo();
                    photo.name = "Me and Bears " + i;
                    photo.description = "I am near bears " + i;
                    photo.filename = "photo-with-bears-" + i + ".jpg";
                    photo.views = 10;
                    photo.isPublished = false;
                    photo.categories = categories;
                    photos.push(photo);
                    return [4 /*yield*/, connection.manager.save(photo)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, connection.getRepository(Photo_1.Photo).findOne({
                        select: ["name"],
                        where: {
                            id: 5
                        }
                    })];
                case 6:
                    loadedPhoto = _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).find({
                            select: ["filename", "views"],
                        })];
                case 7:
                    loadedPhotos1 = _a.sent();
                    return [4 /*yield*/, connection.getRepository(Photo_1.Photo).find({
                            select: ["id", "name", "description"],
                            relations: ["categories"],
                        })];
                case 8:
                    loadedPhotos2 = _a.sent();
                    // const loadedPhotos3 = await connection.getRepository(Photo).createQueryBuilder("photo")
                    //     .select(["photo.name", "photo.description"])
                    //     .addSelect(["category.name"])
                    //     .leftJoin("photo.categories", "category")
                    //     .getMany();
                    chai_1.expect(loadedPhoto).to.be.eql({
                        name: "Me and Bears 5"
                    });
                    chai_1.expect(loadedPhotos1).to.have.deep.members(photos.map(function (photo) { return ({
                        filename: photo.filename,
                        views: photo.views,
                    }); }));
                    chai_1.expect(loadedPhotos2).to.have.deep.members(photos.map(function (photo) { return ({
                        id: photo.id,
                        name: photo.name,
                        description: photo.description,
                        categories: categories,
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); })); });
});
describe("repository > find options > cache", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        cache: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("repository should cache results properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, users1, user4, users2, users3, users4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.name = "Harry";
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.name = "Ron";
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.name = "Hermione";
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .find({ cache: true })];
                case 4:
                    users1 = _a.sent();
                    chai_1.expect(users1.length).to.be.equal(3);
                    user4 = new User_1.User();
                    user4.name = "Ginny";
                    return [4 /*yield*/, connection.manager.save(user4)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User).find()];
                case 6:
                    users2 = _a.sent();
                    chai_1.expect(users2.length).to.be.equal(4);
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .find({ cache: true })];
                case 7:
                    users3 = _a.sent();
                    chai_1.expect(users3.length).to.be.equal(3);
                    // give some time for cache to expire
                    return [4 /*yield*/, test_utils_1.sleep(1000)];
                case 8:
                    // give some time for cache to expire
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(User_1.User)
                            .find({ cache: true })];
                case 9:
                    users4 = _a.sent();
                    chai_1.expect(users4.length).to.be.equal(4);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=repository-find-options.js.map