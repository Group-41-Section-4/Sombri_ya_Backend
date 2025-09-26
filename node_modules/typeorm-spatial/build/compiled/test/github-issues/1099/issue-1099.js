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
var Animal_1 = require("./entity/Animal");
var OffsetWithoutLimitNotSupportedError_1 = require("../../../src/error/OffsetWithoutLimitNotSupportedError");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
describe("github issues > #1099 BUG - QueryBuilder MySQL skip sql is wrong", function () {
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
    it("drivers which does not support offset without limit should throw an exception, other drivers must work fine", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var animals, _i, animals_1, animal, qb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    animals = ["cat", "dog", "bear", "snake"];
                    _i = 0, animals_1 = animals;
                    _a.label = 1;
                case 1:
                    if (!(_i < animals_1.length)) return [3 /*break*/, 4];
                    animal = animals_1[_i];
                    return [4 /*yield*/, connection.getRepository(Animal_1.Animal).save({ name: animal })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    qb = connection.getRepository(Animal_1.Animal)
                        .createQueryBuilder("a")
                        .leftJoinAndSelect("a.categories", "categories")
                        .orderBy("a.id")
                        .skip(1);
                    if (!(connection.driver instanceof MysqlDriver_1.MysqlDriver)) return [3 /*break*/, 6];
                    return [4 /*yield*/, qb.getManyAndCount().should.be.rejectedWith(OffsetWithoutLimitNotSupportedError_1.OffsetWithoutLimitNotSupportedError)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, qb.getManyAndCount().should.eventually.be.eql([[{ id: 2, name: "dog", categories: [] }, { id: 3, name: "bear", categories: [] }, { id: 4, name: "snake", categories: [] },], 4])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1099.js.map