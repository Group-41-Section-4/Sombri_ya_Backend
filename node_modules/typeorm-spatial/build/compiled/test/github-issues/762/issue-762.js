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
var Foo_1 = require("./entity/Foo");
var FooMetadata_1 = require("./entity/FooMetadata");
var FooChildMetadata_1 = require("./entity/FooChildMetadata");
describe("github issues > #762 Nullable @Embedded inside @Embedded", function () {
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
    it("should work perfectly with all data set", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var foo, loadedFoo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foo = new Foo_1.Foo();
                    foo.name = "Apple";
                    foo.metadata = new FooMetadata_1.FooMetadata();
                    foo.metadata.bar = 1;
                    foo.metadata.child = new FooChildMetadata_1.FooChildMetadata();
                    foo.metadata.child.something = 2;
                    foo.metadata.child.somethingElse = 3;
                    return [4 /*yield*/, connection.manager.save(foo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Foo_1.Foo).findOne({ name: "Apple" })];
                case 2:
                    loadedFoo = _a.sent();
                    loadedFoo.should.be.eql({
                        id: 1,
                        name: "Apple",
                        metadata: {
                            bar: 1,
                            child: {
                                something: 2,
                                somethingElse: 3
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should work perfectly with some data not set", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var foo, loadedFoo, foo2, loadedFoo2, foo3, loadedFoo3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foo = new Foo_1.Foo();
                    foo.name = "Apple";
                    foo.metadata = new FooMetadata_1.FooMetadata();
                    foo.metadata.bar = 1;
                    foo.metadata.child = new FooChildMetadata_1.FooChildMetadata();
                    foo.metadata.child.somethingElse = 3;
                    return [4 /*yield*/, connection.manager.save(foo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Foo_1.Foo).findOne({ name: "Apple" })];
                case 2:
                    loadedFoo = _a.sent();
                    loadedFoo.should.be.eql({
                        id: 1,
                        name: "Apple",
                        metadata: {
                            bar: 1,
                            child: {
                                something: null,
                                somethingElse: 3
                            }
                        }
                    });
                    foo2 = new Foo_1.Foo();
                    foo2.name = "Apple2";
                    foo2.metadata = new FooMetadata_1.FooMetadata();
                    foo2.metadata.child = new FooChildMetadata_1.FooChildMetadata();
                    foo2.metadata.child.something = 2;
                    return [4 /*yield*/, connection.manager.save(foo2)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Foo_1.Foo).findOne({ name: "Apple2" })];
                case 4:
                    loadedFoo2 = _a.sent();
                    loadedFoo2.should.be.eql({
                        id: 2,
                        name: "Apple2",
                        metadata: {
                            bar: null,
                            child: {
                                something: 2,
                                somethingElse: null
                            }
                        }
                    });
                    foo3 = new Foo_1.Foo();
                    foo3.name = "Apple3";
                    foo3.metadata = new FooMetadata_1.FooMetadata();
                    return [4 /*yield*/, connection.manager.save(foo3)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Foo_1.Foo).findOne({ name: "Apple3" })];
                case 6:
                    loadedFoo3 = _a.sent();
                    loadedFoo3.should.be.eql({
                        id: 3,
                        name: "Apple3",
                        metadata: {
                            bar: null,
                            child: {
                                something: null,
                                somethingElse: null
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should work perfectly without any data set", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var foo, loadedFoo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foo = new Foo_1.Foo();
                    foo.name = "Orange";
                    return [4 /*yield*/, connection.manager.save(foo)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Foo_1.Foo).findOne({ name: "Orange" })];
                case 2:
                    loadedFoo = _a.sent();
                    loadedFoo.should.be.eql({
                        id: 1,
                        name: "Orange",
                        metadata: {
                            bar: null,
                            child: {
                                something: null,
                                somethingElse: null
                            }
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-762.js.map