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
var Category_1 = require("./entity/Category");
describe("github issues > #904 Using closure tables without @TreeLevelColumn will always fail on insert", function () {
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
    it("should work correctly when saving using parent category", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, b1, c1, c11, c12, roots, c1Tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    b1 = new Category_1.Category();
                    b1.name = "b1";
                    c1 = new Category_1.Category();
                    c1.name = "c1";
                    c11 = new Category_1.Category();
                    c11.name = "c11";
                    c12 = new Category_1.Category();
                    c12.name = "c12";
                    c11.parentCategory = c1;
                    c12.parentCategory = c1;
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(b1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(c1)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(c11)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(c12)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 6:
                    roots = _a.sent();
                    roots.should.be.eql([
                        {
                            id: 1,
                            name: "a1",
                        },
                        {
                            id: 2,
                            name: "b1",
                        },
                        {
                            id: 3,
                            name: "c1",
                        },
                    ]);
                    return [4 /*yield*/, categoryRepository.findDescendantsTree(c1)];
                case 7:
                    c1Tree = _a.sent();
                    c1Tree.should.be.equal(c1);
                    c1Tree.should.be.eql({
                        id: 3,
                        name: "c1",
                        childCategories: [{
                                id: 4,
                                name: "c11",
                                childCategories: []
                            }, {
                                id: 5,
                                name: "c12",
                                childCategories: []
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should work correctly when saving using children categories", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, b1, c1, c11, c12, roots, c1Tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    b1 = new Category_1.Category();
                    b1.name = "b1";
                    c1 = new Category_1.Category();
                    c1.name = "c1";
                    c11 = new Category_1.Category();
                    c11.name = "c11";
                    c12 = new Category_1.Category();
                    c12.name = "c12";
                    c1.childCategories = [c11];
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(b1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(c1)];
                case 3:
                    _a.sent();
                    c1.childCategories.push(c12);
                    return [4 /*yield*/, categoryRepository.save(c1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 5:
                    roots = _a.sent();
                    roots.should.be.eql([
                        {
                            id: 1,
                            name: "a1",
                        },
                        {
                            id: 2,
                            name: "b1",
                        },
                        {
                            id: 3,
                            name: "c1",
                        },
                    ]);
                    return [4 /*yield*/, categoryRepository.findDescendantsTree(c1)];
                case 6:
                    c1Tree = _a.sent();
                    c1Tree.should.be.equal(c1);
                    c1Tree.should.be.eql({
                        id: 3,
                        name: "c1",
                        childCategories: [{
                                id: 4,
                                name: "c11",
                                childCategories: []
                            }, {
                                id: 5,
                                name: "c12",
                                childCategories: []
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should be able to retrieve the whole tree", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, b1, c1, c11, c12, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    b1 = new Category_1.Category();
                    b1.name = "b1";
                    c1 = new Category_1.Category();
                    c1.name = "c1";
                    c11 = new Category_1.Category();
                    c11.name = "c11";
                    c12 = new Category_1.Category();
                    c12.name = "c12";
                    c1.childCategories = [c11];
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(b1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.save(c1)];
                case 3:
                    _a.sent();
                    c1.childCategories.push(c12);
                    return [4 /*yield*/, categoryRepository.save(c1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findTrees()];
                case 5:
                    tree = _a.sent();
                    tree.should.be.eql([
                        {
                            id: 1,
                            name: "a1",
                            childCategories: []
                        },
                        {
                            id: 2,
                            name: "b1",
                            childCategories: []
                        },
                        {
                            id: 3,
                            name: "c1",
                            childCategories: [{
                                    id: 4,
                                    name: "c11",
                                    childCategories: []
                                }, {
                                    id: 5,
                                    name: "c12",
                                    childCategories: []
                                }]
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-904.js.map