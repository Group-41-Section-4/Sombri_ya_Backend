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
var PostIncrement_1 = require("./entity/PostIncrement");
var PostUuid_1 = require("./entity/PostUuid");
var PostDefaultValues_1 = require("./entity/PostDefaultValues");
var PostSpecialColumns_1 = require("./entity/PostSpecialColumns");
var chai_1 = require("chai");
var PostMultiplePrimaryKeys_1 = require("./entity/PostMultiplePrimaryKeys");
var PostComplex_1 = require("./entity/PostComplex");
var PostEmbedded_1 = require("./entity/PostEmbedded");
describe("persistence > entity updation", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should update generated auto-increment id after saving", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostIncrement_1.PostIncrement();
                    post.text = "Hello Post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    post.id.should.be.equal(1);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update generated uuid after saving", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostUuid_1.PostUuid();
                    post.text = "Hello Post";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(PostUuid_1.PostUuid)];
                case 2:
                    loadedPost = _a.sent();
                    post.id.should.be.equal(loadedPost.id);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update default values after saving", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostDefaultValues_1.PostDefaultValues();
                    post.title = "Post #1";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    post.id.should.be.equal(1);
                    post.title.should.be.equal("Post #1");
                    post.text.should.be.equal("hello post");
                    post.isActive.should.be.equal(true);
                    post.addDate.should.be.instanceof(Date);
                    post.views.should.be.equal(0);
                    chai_1.expect(post.description).to.be.equal(null);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update special columns after saving", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostSpecialColumns_1.PostSpecialColumns();
                    post.title = "Post #1";
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    post.id.should.be.equal(1);
                    post.title.should.be.equal("Post #1");
                    post.createDate.should.be.instanceof(Date);
                    post.updateDate.should.be.instanceof(Date);
                    post.version.should.be.equal(1);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update even when multiple primary keys are used", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostMultiplePrimaryKeys_1.PostMultiplePrimaryKeys();
                    post.firstId = 1;
                    post.secondId = 3;
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    post.firstId.should.be.equal(1);
                    post.secondId.should.be.equal(3);
                    post.text.should.be.equal("Hello Multi Ids");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should update even with embeddeds", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = new PostComplex_1.PostComplex();
                    post.firstId = 1;
                    post.embed = new PostEmbedded_1.PostEmbedded();
                    post.embed.secondId = 3;
                    return [4 /*yield*/, connection.manager.save(post)];
                case 1:
                    _a.sent();
                    post.firstId.should.be.equal(1);
                    post.embed.secondId.should.be.equal(3);
                    post.embed.createDate.should.be.instanceof(Date);
                    post.embed.updateDate.should.be.instanceof(Date);
                    post.embed.version.should.be.equal(1);
                    post.text.should.be.equal("Hello Complexity");
                    return [4 /*yield*/, connection.manager.findOne(PostComplex_1.PostComplex, { firstId: 1, embed: { secondId: 3 } })];
                case 2:
                    loadedPost = _a.sent();
                    loadedPost.firstId.should.be.equal(1);
                    loadedPost.embed.secondId.should.be.equal(3);
                    loadedPost.embed.createDate.should.be.instanceof(Date);
                    loadedPost.embed.updateDate.should.be.instanceof(Date);
                    loadedPost.embed.version.should.be.equal(1);
                    loadedPost.text.should.be.equal("Hello Complexity");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=persistence-entity-updation.js.map