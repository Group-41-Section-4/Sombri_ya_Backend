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
var test_utils_1 = require("../../../../utils/test-utils");
var User_1 = require("./entity/User");
var EventMember_1 = require("./entity/EventMember");
var Event_1 = require("./entity/Event");
var Person_1 = require("./entity/Person");
describe("relations > multiple-primary-keys > other-cases", function () {
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
    it("should load related entity when entity uses relation ids as primary id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user2, user3, person1, person2, event1, event2, eventMember1, eventMember2, eventMember3, eventMember4, loadedEvents, loadedUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.name = "Alice";
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user2 = new User_1.User();
                    user2.name = "Bob";
                    return [4 /*yield*/, connection.manager.save(user2)];
                case 2:
                    _a.sent();
                    user3 = new User_1.User();
                    user3.name = "Clara";
                    return [4 /*yield*/, connection.manager.save(user3)];
                case 3:
                    _a.sent();
                    person1 = new Person_1.Person();
                    person1.fullName = "Alice A";
                    person1.user = user1;
                    return [4 /*yield*/, connection.manager.save(person1)];
                case 4:
                    _a.sent();
                    person2 = new Person_1.Person();
                    person2.fullName = "Bob B";
                    person2.user = user2;
                    return [4 /*yield*/, connection.manager.save(person2)];
                case 5:
                    _a.sent();
                    event1 = new Event_1.Event();
                    event1.name = "Event #1";
                    event1.author = person1;
                    return [4 /*yield*/, connection.manager.save(event1)];
                case 6:
                    _a.sent();
                    event2 = new Event_1.Event();
                    event2.name = "Event #2";
                    event2.author = person2;
                    return [4 /*yield*/, connection.manager.save(event2)];
                case 7:
                    _a.sent();
                    eventMember1 = new EventMember_1.EventMember();
                    eventMember1.user = user1;
                    eventMember1.event = event1;
                    return [4 /*yield*/, connection.manager.save(eventMember1)];
                case 8:
                    _a.sent();
                    eventMember2 = new EventMember_1.EventMember();
                    eventMember2.user = user2;
                    eventMember2.event = event1;
                    return [4 /*yield*/, connection.manager.save(eventMember2)];
                case 9:
                    _a.sent();
                    eventMember3 = new EventMember_1.EventMember();
                    eventMember3.user = user1;
                    eventMember3.event = event2;
                    return [4 /*yield*/, connection.manager.save(eventMember3)];
                case 10:
                    _a.sent();
                    eventMember4 = new EventMember_1.EventMember();
                    eventMember4.user = user3;
                    eventMember4.event = event2;
                    return [4 /*yield*/, connection.manager.save(eventMember4)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Event_1.Event, "event")
                            .leftJoinAndSelect("event.author", "author")
                            .leftJoinAndSelect("author.user", "authorUser")
                            .leftJoinAndSelect("event.members", "members")
                            .leftJoinAndSelect("members.user", "user")
                            .orderBy("event.id, user.id")
                            .getMany()];
                case 12:
                    loadedEvents = _a.sent();
                    chai_1.expect(loadedEvents[0].author).to.not.be.empty;
                    chai_1.expect(loadedEvents[0].author.fullName).to.be.equal("Alice A");
                    chai_1.expect(loadedEvents[0].author.user).to.not.be.empty;
                    chai_1.expect(loadedEvents[0].author.user.id).to.be.equal(1);
                    chai_1.expect(loadedEvents[0].members).to.not.be.empty;
                    chai_1.expect(loadedEvents[0].members[0].user.id).to.be.equal(1);
                    chai_1.expect(loadedEvents[0].members[0].user.name).to.be.equal("Alice");
                    chai_1.expect(loadedEvents[0].members[1].user.id).to.be.equal(2);
                    chai_1.expect(loadedEvents[0].members[1].user.name).to.be.equal("Bob");
                    chai_1.expect(loadedEvents[1].author).to.not.be.empty;
                    chai_1.expect(loadedEvents[1].author.fullName).to.be.equal("Bob B");
                    chai_1.expect(loadedEvents[1].author.user).to.not.be.empty;
                    chai_1.expect(loadedEvents[1].author.user.id).to.be.equal(2);
                    chai_1.expect(loadedEvents[1].members).to.not.be.empty;
                    chai_1.expect(loadedEvents[1].members[0].user.id).to.be.equal(1);
                    chai_1.expect(loadedEvents[1].members[0].user.name).to.be.equal("Alice");
                    chai_1.expect(loadedEvents[1].members[1].user.id).to.be.equal(3);
                    chai_1.expect(loadedEvents[1].members[1].user.name).to.be.equal("Clara");
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(User_1.User, "user")
                            .leftJoinAndSelect("user.members", "members")
                            .leftJoinAndSelect("members.event", "event")
                            .orderBy("user.id, event.id")
                            .getMany()];
                case 13:
                    loadedUsers = _a.sent();
                    chai_1.expect(loadedUsers[0].members).to.not.be.empty;
                    chai_1.expect(loadedUsers[0].members[0].event.id).to.be.equal(1);
                    chai_1.expect(loadedUsers[0].members[0].event.name).to.be.equal("Event #1");
                    chai_1.expect(loadedUsers[0].members[1].event.id).to.be.equal(2);
                    chai_1.expect(loadedUsers[0].members[1].event.name).to.be.equal("Event #2");
                    chai_1.expect(loadedUsers[1].members).to.not.be.empty;
                    chai_1.expect(loadedUsers[1].members[0].event.id).to.be.equal(1);
                    chai_1.expect(loadedUsers[1].members[0].event.name).to.be.equal("Event #1");
                    chai_1.expect(loadedUsers[2].members).to.not.be.empty;
                    chai_1.expect(loadedUsers[2].members[0].event.id).to.be.equal(2);
                    chai_1.expect(loadedUsers[2].members[0].event.name).to.be.equal("Event #2");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=multiple-primary-keys-other-cases.js.map