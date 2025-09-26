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
var Category_1 = require("./entity/Category");
var test_utils_1 = require("../../../utils/test-utils");
describe("tree tables > materialized-path", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Category_1.Category],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("attach should work properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, a11, a111, a12, rootCategories, a11Parent, a1Children;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    a11 = new Category_1.Category();
                    a11.name = "a11";
                    a11.parentCategory = a1;
                    return [4 /*yield*/, categoryRepository.save(a11)];
                case 2:
                    _a.sent();
                    a111 = new Category_1.Category();
                    a111.name = "a111";
                    a111.parentCategory = a11;
                    return [4 /*yield*/, categoryRepository.save(a111)];
                case 3:
                    _a.sent();
                    a12 = new Category_1.Category();
                    a12.name = "a12";
                    a12.parentCategory = a1;
                    return [4 /*yield*/, categoryRepository.save(a12)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 5:
                    rootCategories = _a.sent();
                    rootCategories.should.be.eql([{
                            id: 1,
                            name: "a1"
                        }]);
                    return [4 /*yield*/, categoryRepository.findAncestors(a11)];
                case 6:
                    a11Parent = _a.sent();
                    a11Parent.length.should.be.equal(2);
                    a11Parent.should.contain({ id: 1, name: "a1" });
                    a11Parent.should.contain({ id: 2, name: "a11" });
                    return [4 /*yield*/, categoryRepository.findDescendants(a1)];
                case 7:
                    a1Children = _a.sent();
                    a1Children.length.should.be.equal(4);
                    a1Children.should.contain({ id: 1, name: "a1" });
                    a1Children.should.contain({ id: 2, name: "a11" });
                    a1Children.should.contain({ id: 3, name: "a111" });
                    a1Children.should.contain({ id: 4, name: "a12" });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("categories should be attached via children and saved properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, a11, a12, rootCategories, a11Parent, a1Children;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    a11 = new Category_1.Category();
                    a11.name = "a11";
                    a12 = new Category_1.Category();
                    a12.name = "a12";
                    a1.childCategories = [a11, a12];
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 3:
                    rootCategories = _a.sent();
                    rootCategories.should.be.eql([{
                            id: 1,
                            name: "a1"
                        }]);
                    return [4 /*yield*/, categoryRepository.findAncestors(a11)];
                case 4:
                    a11Parent = _a.sent();
                    a11Parent.length.should.be.equal(2);
                    a11Parent.should.include({ id: 1, name: "a1" });
                    a11Parent.should.include({ id: 2, name: "a11" });
                    return [4 /*yield*/, categoryRepository.findDescendants(a1)];
                case 5:
                    a1Children = _a.sent();
                    a1Children.length.should.be.equal(3);
                    a1Children.should.include({ id: 1, name: "a1" });
                    a1Children.should.include({ id: 2, name: "a11" });
                    a1Children.should.include({ id: 3, name: "a12" });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("categories should be attached via children and saved properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, a11, a12, rootCategories, a11Parent, a1Children;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    a11 = new Category_1.Category();
                    a11.name = "a11";
                    a12 = new Category_1.Category();
                    a12.name = "a12";
                    a1.childCategories = [a11, a12];
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 3:
                    rootCategories = _a.sent();
                    rootCategories.should.be.eql([{
                            id: 1,
                            name: "a1"
                        }]);
                    return [4 /*yield*/, categoryRepository.findAncestors(a11)];
                case 4:
                    a11Parent = _a.sent();
                    a11Parent.length.should.be.equal(2);
                    a11Parent.should.include({ id: 1, name: "a1" });
                    a11Parent.should.include({ id: 2, name: "a11" });
                    return [4 /*yield*/, categoryRepository.findDescendants(a1)];
                case 5:
                    a1Children = _a.sent();
                    a1Children.length.should.be.equal(3);
                    a1Children.should.include({ id: 1, name: "a1" });
                    a1Children.should.include({ id: 2, name: "a11" });
                    a1Children.should.include({ id: 3, name: "a12" });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("categories should be attached via children and saved properly and everything must be saved in cascades", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var categoryRepository, a1, a11, a12, a111, a112, rootCategories, a11Parent, a1Children, a1ChildrenNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepository = connection.getTreeRepository(Category_1.Category);
                    a1 = new Category_1.Category();
                    a1.name = "a1";
                    a11 = new Category_1.Category();
                    a11.name = "a11";
                    a12 = new Category_1.Category();
                    a12.name = "a12";
                    a111 = new Category_1.Category();
                    a111.name = "a111";
                    a112 = new Category_1.Category();
                    a112.name = "a112";
                    a1.childCategories = [a11, a12];
                    a11.childCategories = [a111, a112];
                    return [4 /*yield*/, categoryRepository.save(a1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, categoryRepository.findRoots()];
                case 2:
                    rootCategories = _a.sent();
                    rootCategories.should.be.eql([{
                            id: 1,
                            name: "a1"
                        }]);
                    return [4 /*yield*/, categoryRepository.findAncestors(a11)];
                case 3:
                    a11Parent = _a.sent();
                    a11Parent.length.should.be.equal(2);
                    a11Parent.should.include({ id: 1, name: "a1" });
                    a11Parent.should.include({ id: 2, name: "a11" });
                    return [4 /*yield*/, categoryRepository.findDescendants(a1)];
                case 4:
                    a1Children = _a.sent();
                    a1ChildrenNames = a1Children.map(function (child) { return child.name; });
                    a1ChildrenNames.length.should.be.equal(5);
                    a1ChildrenNames.should.include("a1");
                    a1ChildrenNames.should.include("a11");
                    a1ChildrenNames.should.include("a12");
                    a1ChildrenNames.should.include("a111");
                    a1ChildrenNames.should.include("a112");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=materialized-path.js.map