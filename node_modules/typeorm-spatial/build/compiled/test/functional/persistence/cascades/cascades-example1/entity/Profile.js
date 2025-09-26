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
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var User_1 = require("./User");
var Photo_1 = require("./Photo");
var OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
var Profile = /** @class */ (function () {
    function Profile() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Profile.prototype, "id", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return User_1.User; }, function (user) { return user.profile; }, {
            nullable: false
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Profile.prototype, "user", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Photo_1.Photo; }, {
            nullable: false,
            cascade: ["insert"]
        }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Photo_1.Photo)
    ], Profile.prototype, "photo", void 0);
    Profile = __decorate([
        Entity_1.Entity()
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map