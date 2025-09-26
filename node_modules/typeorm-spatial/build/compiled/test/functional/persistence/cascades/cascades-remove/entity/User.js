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
var ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
var Photo_1 = require("./Photo");
var OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
var JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Photo_1.Photo; }, function (photo) { return photo.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "manyPhotos", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Photo_1.Photo; }, { cascade: true }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], User.prototype, "manyToManyPhotos", void 0);
    User = __decorate([
        Entity_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map