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
var User_1 = require("./User");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
var Circle = /** @class */ (function () {
    function Circle() {
    }
    /**
     * Getter identifier
     *
     * @returns {number}
     */
    Circle.prototype.getId = function () {
        return this.id;
    };
    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    Circle.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     * Setter user
     *
     * @param {Promise<User[]>} users
     */
    Circle.prototype.setUsers = function (users) {
        this.users = users;
    };
    /**
     * Getter user
     *
     * @returns {User[]}
     */
    Circle.prototype.getUsers = function () {
        return this.users;
    };
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn({ type: "bigint" }),
        __metadata("design:type", String)
    ], Circle.prototype, "id", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return User_1.User; }, function (user) { return "circles"; }),
        JoinTable_1.JoinTable({ name: "circle_users_user" }),
        __metadata("design:type", Promise)
    ], Circle.prototype, "users", void 0);
    Circle = __decorate([
        Entity_1.Entity()
    ], Circle);
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map