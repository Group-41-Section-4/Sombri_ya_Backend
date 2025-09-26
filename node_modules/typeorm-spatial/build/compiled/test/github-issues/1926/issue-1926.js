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
var test_utils_1 = require("../../utils/test-utils");
var Role_1 = require("./entity/Role");
var Event_1 = require("./entity/Event");
var EventRole_1 = require("./entity/EventRole");
// todo: fix later (refactor persistence)
describe.skip("github issues > #1926 Update fails for entity with compound relation-based primary key on OneToMany relationship", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("Should update OneToMany entity with compound relation-based primary key", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var role, event, eventRole;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    role = new Role_1.Role();
                    role.title = "The Boss";
                    return [4 /*yield*/, connection.manager.save(role)];
                case 1:
                    role = _a.sent();
                    event = new Event_1.Event();
                    event.title = "The Big Event";
                    eventRole = new EventRole_1.EventRole();
                    eventRole.description = "Be the boss";
                    eventRole.compensation = "All the money!";
                    eventRole.roleId = role.id;
                    event.roles = [eventRole];
                    return [4 /*yield*/, connection.manager.save(event)];
                case 2:
                    event = _a.sent();
                    event.roles[0].description = "Be a good boss";
                    // Fails with:
                    // QueryFailedError: duplicate key value violates unique constraint "PK_..."
                    return [4 /*yield*/, connection.manager.save(event)];
                case 3:
                    // Fails with:
                    // QueryFailedError: duplicate key value violates unique constraint "PK_..."
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1926.js.map