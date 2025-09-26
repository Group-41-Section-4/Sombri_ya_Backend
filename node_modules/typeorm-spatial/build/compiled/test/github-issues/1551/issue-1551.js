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
var Message_1 = require("./entity/Message");
var Recipient_1 = require("./entity/Recipient");
var User_1 = require("./entity/User");
var Chat_1 = require("./entity/Chat");
describe("github issues > #1551 complex example of cascades + multiple primary keys = persistence order", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname, enabledDrivers: ["mysql"] })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("throws an error because there is no object id defined", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user5, messages, recipients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User({
                        username: "ethan",
                        password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
                        name: "Ethan Gonzalez",
                        picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
                        phone: "+391234567890",
                    });
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user5 = new User_1.User({
                        username: "ray",
                        password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
                        name: "Ray Edwards",
                        picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
                        phone: "+391234567894",
                    });
                    return [4 /*yield*/, connection.manager.save(user5)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(new Chat_1.Chat({
                            allTimeMembers: [user1, user5],
                            listingMembers: [user1, user5],
                            messages: [
                                new Message_1.Message({
                                    sender: user1,
                                    content: "I should buy a boat",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                                new Message_1.Message({
                                    sender: user1,
                                    content: "You still there?",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                            ],
                        }))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.find(Message_1.Message)];
                case 4:
                    messages = _a.sent();
                    messages[0].recipients.length.should.be.equal(1);
                    messages[1].recipients.length.should.be.equal(1);
                    return [4 /*yield*/, connection.manager.find(Recipient_1.Recipient)];
                case 5:
                    recipients = _a.sent();
                    recipients.length.should.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    // cascade remove are not supported
    it.skip("throws a \"update or delete on table 'message' violates foreign key constraint on table 'recipient'\" error on delete", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user5, message, messages, recipients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User({
                        username: "ethan",
                        password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
                        name: "Ethan Gonzalez",
                        picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
                        phone: "+391234567890",
                    });
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user5 = new User_1.User({
                        username: "ray",
                        password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
                        name: "Ray Edwards",
                        picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
                        phone: "+391234567894",
                    });
                    return [4 /*yield*/, connection.manager.save(user5)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(new Chat_1.Chat({
                            allTimeMembers: [user1, user5],
                            listingMembers: [user1, user5],
                            messages: [
                                new Message_1.Message({
                                    sender: user1,
                                    content: "I should buy a boat",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                                new Message_1.Message({
                                    sender: user1,
                                    content: "You still there?",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                            ],
                        }))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .createQueryBuilder(Message_1.Message, "message")
                            .getOne()];
                case 4:
                    message = _a.sent();
                    if (!message) return [3 /*break*/, 6];
                    return [4 /*yield*/, connection.getRepository(Message_1.Message).remove(message)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6: throw new Error("Cannot get message");
                case 7: return [4 /*yield*/, connection.manager.find(Message_1.Message)];
                case 8:
                    messages = _a.sent();
                    messages.length.should.be.equal(0);
                    return [4 /*yield*/, connection.manager.find(Recipient_1.Recipient)];
                case 9:
                    recipients = _a.sent();
                    recipients.length.should.be.equal(0);
                    return [2 /*return*/];
            }
        });
    }); })); });
    // cascade remove are not supported
    it.skip("throws a \"null value in column 'userId' violates not-null constraint\" error on delete", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user5, message, messages, recipients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User({
                        username: "ethan",
                        password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
                        name: "Ethan Gonzalez",
                        picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
                        phone: "+391234567890",
                    });
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user5 = new User_1.User({
                        username: "ray",
                        password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
                        name: "Ray Edwards",
                        picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
                        phone: "+391234567894",
                    });
                    return [4 /*yield*/, connection.manager.save(user5)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(new Chat_1.Chat({
                            allTimeMembers: [user1, user5],
                            listingMembers: [user1, user5],
                            messages: [
                                new Message_1.Message({
                                    sender: user1,
                                    content: "I should buy a boat",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                                new Message_1.Message({
                                    sender: user1,
                                    content: "You still there?",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                            ],
                        }))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Message_1.Message)];
                case 4:
                    message = _a.sent();
                    if (!message) return [3 /*break*/, 6];
                    return [4 /*yield*/, connection.getRepository(Message_1.Message).remove(message)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6: throw new Error("Cannot get message");
                case 7: return [4 /*yield*/, connection.manager.find(Message_1.Message)];
                case 8:
                    messages = _a.sent();
                    messages.length.should.be.equal(0);
                    return [4 /*yield*/, connection.manager.find(Recipient_1.Recipient)];
                case 9:
                    recipients = _a.sent();
                    recipients.length.should.be.equal(0);
                    return [2 /*return*/];
            }
        });
    }); })); });
    // cascade remove are not supported
    it.skip("throws a \"Subject Recipient must have an identifier to perform operation\" internal error on delete", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, user5, recipients, _i, recipients_1, recipient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User({
                        username: "ethan",
                        password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
                        name: "Ethan Gonzalez",
                        picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
                        phone: "+391234567890",
                    });
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    user5 = new User_1.User({
                        username: "ray",
                        password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
                        name: "Ray Edwards",
                        picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
                        phone: "+391234567894",
                    });
                    return [4 /*yield*/, connection.manager.save(user5)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.save(new Chat_1.Chat({
                            allTimeMembers: [user1, user5],
                            listingMembers: [user1, user5],
                            messages: [
                                new Message_1.Message({
                                    sender: user1,
                                    content: "I should buy a boat",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                                new Message_1.Message({
                                    sender: user1,
                                    content: "You still there?",
                                    type: Message_1.MessageType.TEXT,
                                    holders: [user1, user5],
                                    recipients: [
                                        new Recipient_1.Recipient({
                                            user: user5,
                                        }),
                                    ],
                                }),
                            ],
                        }))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.find(Recipient_1.Recipient)];
                case 4:
                    recipients = _a.sent();
                    _i = 0, recipients_1 = recipients;
                    _a.label = 5;
                case 5:
                    if (!(_i < recipients_1.length)) return [3 /*break*/, 8];
                    recipient = recipients_1[_i];
                    return [4 /*yield*/, connection.getRepository(Recipient_1.Recipient).remove(recipient)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, connection.manager.find(Recipient_1.Recipient)];
                case 9:
                    recipients = _a.sent();
                    recipients.length.should.be.equal(0);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1551.js.map