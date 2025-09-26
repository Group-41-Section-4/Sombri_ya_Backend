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
var Message_1 = require("./Message");
var User_1 = require("./User");
var Chat = /** @class */ (function () {
    function Chat(_a) {
        var _b = _a === void 0 ? {} : _a, name = _b.name, picture = _b.picture, allTimeMembers = _b.allTimeMembers, listingMembers = _b.listingMembers, actualGroupMembers = _b.actualGroupMembers, admins = _b.admins, owner = _b.owner, messages = _b.messages;
        if (name) {
            this.name = name;
        }
        if (picture) {
            this.picture = picture;
        }
        if (allTimeMembers) {
            this.allTimeMembers = allTimeMembers;
        }
        if (listingMembers) {
            this.listingMembers = listingMembers;
        }
        if (actualGroupMembers) {
            this.actualGroupMembers = actualGroupMembers;
        }
        if (admins) {
            this.admins = admins;
        }
        if (owner) {
            this.owner = owner;
        }
        if (messages) {
            this.messages = messages;
        }
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Chat.prototype, "id", void 0);
    __decorate([
        index_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Chat.prototype, "name", void 0);
    __decorate([
        index_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Chat.prototype, "picture", void 0);
    __decorate([
        index_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.allTimeMemberChats; }, { eager: true }),
        index_1.JoinTable(),
        __metadata("design:type", Array)
    ], Chat.prototype, "allTimeMembers", void 0);
    __decorate([
        index_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.listedMemberChats; }, { eager: true }),
        index_1.JoinTable(),
        __metadata("design:type", Array)
    ], Chat.prototype, "listingMembers", void 0);
    __decorate([
        index_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.actualGroupMemberChats; }, { eager: true }),
        index_1.JoinTable(),
        __metadata("design:type", Array)
    ], Chat.prototype, "actualGroupMembers", void 0);
    __decorate([
        index_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.adminChats; }, { eager: true }),
        index_1.JoinTable(),
        __metadata("design:type", Array)
    ], Chat.prototype, "admins", void 0);
    __decorate([
        index_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.ownerChats; }, { eager: true }),
        __metadata("design:type", User_1.User)
    ], Chat.prototype, "owner", void 0);
    __decorate([
        index_1.OneToMany(function () { return Message_1.Message; }, function (message) { return message.chat; }, { cascade: true, eager: true }),
        __metadata("design:type", Array)
    ], Chat.prototype, "messages", void 0);
    Chat = __decorate([
        index_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map