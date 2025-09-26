"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../src/index");
var Chat_1 = require("./Chat");
var Message_1 = require("./Message");
var Recipient_1 = require("./Recipient");
var User = /** @class */ (function () {
    function User(_a) {
        var _b = _a === void 0 ? {} : _a, username = _b.username, password = _b.password, name = _b.name, picture = _b.picture, phone = _b.phone;
        if (username) {
            this.username = username;
        }
        if (password) {
            this.password = password;
        }
        if (name) {
            this.name = name;
        }
        if (picture) {
            this.picture = picture;
        }
        if (phone) {
            this.phone = phone;
        }
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        index_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "picture", void 0);
    __decorate([
        index_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "phone", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Chat_1.Chat; }, function (chat) { return chat.allTimeMembers; }),
        __metadata("design:type", Array)
    ], User.prototype, "allTimeMemberChats", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Chat_1.Chat; }, function (chat) { return chat.listingMembers; }),
        __metadata("design:type", Array)
    ], User.prototype, "listedMemberChats", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Chat_1.Chat; }, function (chat) { return chat.actualGroupMembers; }),
        __metadata("design:type", Array)
    ], User.prototype, "actualGroupMemberChats", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Chat_1.Chat; }, function (chat) { return chat.admins; }),
        __metadata("design:type", Array)
    ], User.prototype, "adminChats", void 0);
    __decorate([
        index_1.ManyToMany(function (type) { return Message_1.Message; }, function (message) { return message.holders; }),
        __metadata("design:type", Array)
    ], User.prototype, "holderMessages", void 0);
    __decorate([
        index_1.OneToMany(function (type) { return Chat_1.Chat; }, function (chat) { return chat.owner; }),
        __metadata("design:type", Array)
    ], User.prototype, "ownerChats", void 0);
    __decorate([
        index_1.OneToMany(function (type) { return Message_1.Message; }, function (message) { return message.sender; }),
        __metadata("design:type", Array)
    ], User.prototype, "senderMessages", void 0);
    __decorate([
        index_1.OneToMany(function (type) { return Recipient_1.Recipient; }, function (recipient) { return recipient.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "recipients", void 0);
    User = __decorate([
        index_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map