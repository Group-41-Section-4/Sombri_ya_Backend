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
var Post_1 = require("./entity/Post");
describe("database schema > mssql-parameters", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mssql"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should correctly insert/update/delete entities on SqlServer driver", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, post1, loadedPost1, post2, loadedPost2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post1 = new Post_1.Post();
                    post1.id = 1;
                    post1.name = "Post #1";
                    post1.category = "posts";
                    post1.text = "This is post";
                    return [4 /*yield*/, postRepository.save(post1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 2:
                    loadedPost1 = (_a.sent());
                    loadedPost1.id.should.be.equal(post1.id);
                    loadedPost1.name.should.be.equal(post1.name);
                    loadedPost1.category.should.be.equal(post1.category);
                    loadedPost1.text.should.be.equal(post1.text);
                    loadedPost1.name = "Updated Post #1";
                    loadedPost1.text = "This is updated post";
                    return [4 /*yield*/, postRepository.save(loadedPost1)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost1 = (_a.sent());
                    loadedPost1.name.should.be.equal("Updated Post #1");
                    loadedPost1.text.should.be.equal("This is updated post");
                    return [4 /*yield*/, postRepository.remove(loadedPost1)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 6:
                    loadedPost1 = (_a.sent());
                    chai_1.expect(loadedPost1).to.not.exist;
                    post2 = new Post_1.Post();
                    post2.id = 2;
                    post2.name = "Post #2";
                    post2.category = "posts";
                    post2.text = "This is second post";
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .insert()
                            .into(Post_1.Post)
                            .values(post2)
                            .execute()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(2)];
                case 8:
                    loadedPost2 = (_a.sent());
                    loadedPost2.id.should.be.equal(post2.id);
                    loadedPost2.name.should.be.equal(post2.name);
                    loadedPost2.category.should.be.equal(post2.category);
                    loadedPost2.text.should.be.equal(post2.text);
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .update(Post_1.Post)
                            .set({ name: "Updated Post #2" })
                            .where("id = :id", { id: 2 })
                            .execute()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(2)];
                case 10:
                    loadedPost2 = (_a.sent());
                    loadedPost2.name.should.be.equal("Updated Post #2");
                    return [4 /*yield*/, connection.createQueryBuilder()
                            .delete()
                            .from(Post_1.Post)
                            .where("id = :id", { id: "2" })
                            .execute()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(2)];
                case 12:
                    loadedPost2 = (_a.sent());
                    chai_1.expect(loadedPost2).to.not.exist;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=mssql-parameters.js.map