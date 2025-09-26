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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Index_1 = require("../../../../src/decorator/Index");
var OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var User_1 = require("./User");
var Item = /** @class */ (function () {
    function Item() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Item.prototype, "postId", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return User_1.User; }, function (users) { return users.userId; }),
        JoinColumn_1.JoinColumn({ name: "userId" }),
        __metadata("design:type", User_1.User)
    ], Item.prototype, "userData", void 0);
    __decorate([
        Column_1.Column({ type: "int" }),
        __metadata("design:type", Number)
    ], Item.prototype, "userId", void 0);
    __decorate([
        Column_1.Column({ type: "int" }),
        __metadata("design:type", Number)
    ], Item.prototype, "mid", void 0);
    Item = __decorate([
        Entity_1.Entity(),
        Index_1.Index("table_index_userId_mid", function (post) { return [post.userId, post.mid]; })
    ], Item);
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.js.map