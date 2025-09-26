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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var User_1 = require("./entity/User");
describe("persistence > basic functionality", function () {
    var _this = this;
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should save an entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello Post"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should remove an entity", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove(post)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should throw an error when not an object is passed to a save method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.save(undefined).should.be.rejectedWith("Cannot save, given value must be an entity, instead \"undefined\" is given.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(null).should.be.rejectedWith("Cannot save, given value must be an entity, instead \"null\" is given.")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(123).should.be.rejectedWith("Cannot save, given value must be an entity, instead \"123\" is given.")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should throw an error when not an object is passed to a remove method", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.remove(undefined).should.be.rejectedWith("Cannot remove, given value must be an entity, instead \"undefined\" is given.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove(null).should.be.rejectedWith("Cannot remove, given value must be an entity, instead \"null\" is given.")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove(123).should.be.rejectedWith("Cannot remove, given value must be an entity, instead \"123\" is given.")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should throw an exception if object literal is given instead of constructed entity because it cannot determine what to save", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.manager.save({}).should.be.rejectedWith("Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save([{}, {}]).should.be.rejectedWith("Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save([new Post_1.Post("Hello Post"), {}]).should.be.rejectedWith("Cannot save, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove({}).should.be.rejectedWith("Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove([{}, {}]).should.be.rejectedWith("Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove([new Post_1.Post("Hello Post"), {}]).should.be.rejectedWith("Cannot remove, given value must be instance of entity class, instead object literal is given. Or you must specify an entity target to method call.")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to save and remove entities of different types", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, category, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new Post_1.Post("Hello Post");
                    category = new Category_1.Category("Hello Category");
                    user = new User_1.User("Hello User");
                    return [4 /*yield*/, connection.manager.save([post, category, user])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1).should.eventually.eql({ id: 1, title: "Hello Post" })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1).should.eventually.eql({ id: 1, name: "Hello Category" })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1).should.eventually.eql({ id: 1, name: "Hello User" })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.remove([post, category, user])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1).should.eventually.be.undefined];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, 1).should.eventually.be.undefined];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(User_1.User, 1).should.eventually.be.undefined];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=persistence-basic-functionality.js.map