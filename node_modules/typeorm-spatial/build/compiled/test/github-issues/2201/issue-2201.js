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
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
var context_1 = require("./entity/ver2/context");
var record_1 = require("./entity/ver2/record");
var user_1 = require("./entity/ver2/user");
describe("github issues > #2201 - Create a select query when using a (custom) junction table", function () {
    it("Should create only two PM columns ('order_id' and 'user_id')", function () { return __awaiter(_this, void 0, void 0, function () {
        var connections, contextMetadata, expectedColumnNames, existingColumnNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/ver1/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchema: true
                    })];
                case 1:
                    connections = _a.sent();
                    if (!connections.length)
                        return [2 /*return*/];
                    contextMetadata = connections[0].entityMetadatas.find(function (metadata) { return metadata.name === "RecordContext"; });
                    expectedColumnNames = ["record_id", "meta", "user_id"];
                    existingColumnNames = contextMetadata.columns.map(function (col) { return col.databaseName; });
                    chai_1.expect(existingColumnNames.length).to.eql(expectedColumnNames.length);
                    chai_1.expect(existingColumnNames).have.members(expectedColumnNames);
                    return [4 /*yield*/, test_utils_1.closeTestingConnections(connections)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it.skip("Should not try to update the junction table when not needed", function () { return __awaiter(_this, void 0, void 0, function () {
        var connections, user, record, context, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/ver2/*{.js,.ts}"],
                        enabledDrivers: ["postgres"],
                        schemaCreate: true,
                        dropSchema: true,
                    })];
                case 1:
                    connections = _a.sent();
                    if (!connections.length)
                        return [2 /*return*/];
                    user_1.User.useConnection(connections[0]);
                    record_1.Record.useConnection(connections[0]);
                    context_1.RecordContext.useConnection(connections[0]);
                    user = user_1.User.create({ id: "user1" });
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    record = record_1.Record.create({ id: "record1", status: "pending" });
                    return [4 /*yield*/, record.save()];
                case 3:
                    _a.sent();
                    context = context_1.RecordContext.create({
                        user: user,
                        record: record,
                        userId: user.id,
                        recordId: record.id,
                        meta: { name: "meta name", description: "meta description" }
                    });
                    return [4 /*yield*/, context.save()];
                case 4:
                    _a.sent();
                    query = record_1.Record
                        .createQueryBuilder("record")
                        .leftJoinAndSelect("record.contexts", "context")
                        .where("record.id = :recordId", { recordId: record.id });
                    return [4 /*yield*/, query.getOne()];
                case 5:
                    result = (_a.sent());
                    result.status = "failed";
                    return [4 /*yield*/, result.save()];
                case 6:
                    _a.sent();
                    chai_1.expect(0).to.eql(0);
                    return [4 /*yield*/, test_utils_1.closeTestingConnections(connections)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=issue-2201.js.map