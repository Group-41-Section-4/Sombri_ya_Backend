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
var Connection_1 = require("../../../../src/connection/Connection");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var ConnectionMetadataBuilder_1 = require("../../../../src/connection/ConnectionMetadataBuilder");
var EntityMetadataValidator_1 = require("../../../../src/metadata-builder/EntityMetadataValidator");
var chai_1 = require("chai");
describe("persistence > order of persistence execution operations", function () {
    describe("should throw exception when non-resolvable circular relations found", function () {
        it("should throw CircularRelationsError", function () {
            var connection = new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [__dirname + "/entity/*{.js,.ts}"]
            });
            var connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
            var entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([__dirname + "/entity/*{.js,.ts}"]);
            var entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
            chai_1.expect(function () { return entityMetadataValidator.validateMany(entityMetadatas, connection.driver); }).to.throw(Error);
        });
    });
    describe.skip("should persist all entities in correct order", function () {
        var _this = this;
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
        it("", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var category1, post1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.name = "Category saved by cascades #1";
                        post1 = new Post_1.Post();
                        post1.title = "Hello Post #1";
                        post1.category = category1;
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=persistence-order.js.map