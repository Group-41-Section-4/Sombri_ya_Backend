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
var Participant_1 = require("./entity/Participant");
var chai_1 = require("chai");
var Message_1 = require("./entity/Message");
var Translation_1 = require("./entity/Translation");
var Locale_1 = require("./entity/Locale");
describe("github issues > #720 `.save()` not updating composite key with Postgres", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should not insert new entity when entity already exist with same primary keys", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var participants, count1, updatedParticipants, count2, loadedParticipant1, loadedParticipant2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participants = [];
                    participants[0] = new Participant_1.Participant();
                    participants[0].order_id = 1;
                    participants[0].distance = "one";
                    participants[0].price = "100$";
                    participants[1] = new Participant_1.Participant();
                    participants[1].order_id = 1;
                    participants[1].distance = "two";
                    participants[1].price = "200$";
                    participants[2] = new Participant_1.Participant();
                    participants[2].order_id = 1;
                    participants[2].distance = "three";
                    participants[2].price = "300$";
                    return [4 /*yield*/, connection.manager.save(participants)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.count(Participant_1.Participant)];
                case 2:
                    count1 = _a.sent();
                    chai_1.expect(count1).to.be.equal(3);
                    updatedParticipants = [];
                    updatedParticipants[0] = new Participant_1.Participant();
                    updatedParticipants[0].order_id = 1;
                    updatedParticipants[0].distance = "one";
                    updatedParticipants[0].price = "150$";
                    updatedParticipants[1] = new Participant_1.Participant();
                    updatedParticipants[1].order_id = 1;
                    updatedParticipants[1].distance = "two";
                    updatedParticipants[1].price = "250$";
                    return [4 /*yield*/, connection.manager.save(updatedParticipants)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.count(Participant_1.Participant)];
                case 4:
                    count2 = _a.sent();
                    chai_1.expect(count2).to.be.equal(3);
                    return [4 /*yield*/, connection.manager.findOne(Participant_1.Participant, { order_id: 1, distance: "one" })];
                case 5:
                    loadedParticipant1 = _a.sent();
                    chai_1.expect(loadedParticipant1.order_id).to.be.equal(1);
                    chai_1.expect(loadedParticipant1.distance).to.be.equal("one");
                    chai_1.expect(loadedParticipant1.price).to.be.equal("150$");
                    return [4 /*yield*/, connection.manager.findOne(Participant_1.Participant, { order_id: 1, distance: "two" })];
                case 6:
                    loadedParticipant2 = _a.sent();
                    chai_1.expect(loadedParticipant2.order_id).to.be.equal(1);
                    chai_1.expect(loadedParticipant2.distance).to.be.equal("two");
                    chai_1.expect(loadedParticipant2.price).to.be.equal("250$");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("reproducing second comment issue", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var message, locale, translation, foundTranslation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = new Message_1.Message();
                    return [4 /*yield*/, connection.manager.save(message)];
                case 1:
                    _a.sent();
                    locale = new Locale_1.Locale();
                    locale.code = "US";
                    locale.englishName = "USA";
                    locale.name = message;
                    return [4 /*yield*/, connection.manager.save(locale)];
                case 2:
                    _a.sent();
                    translation = new Translation_1.Translation();
                    translation.message = message;
                    translation.locale = locale;
                    translation.text = "Some Text";
                    return [4 /*yield*/, connection.manager.save(translation)];
                case 3:
                    _a.sent();
                    // change its text and save again
                    translation.text = "Changed Text";
                    return [4 /*yield*/, connection.manager.save(translation)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.getRepository(Translation_1.Translation).findOne({
                            locale: {
                                code: "US"
                            },
                            message: {
                                id: "1"
                            }
                        })];
                case 5:
                    foundTranslation = _a.sent();
                    chai_1.expect(foundTranslation).to.be.eql({
                        text: "Changed Text"
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-720.js.map