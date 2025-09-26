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
var ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
var Circle_1 = require("./Circle");
var User = /** @class */ (function () {
    function User() {
    }
    /**
     * Getter identifier
     *
     * @returns {number}
     */
    User.prototype.getId = function () {
        return this.id;
    };
    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    User.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     * Getter circles
     *
     * @returns {Circle[]}
     */
    User.prototype.getCircles = function () {
        return this.circles;
    };
    /**
     * Setter circle
     *
     * @param circles new circle value
     */
    User.prototype.setCircles = function (circles) {
        this.circles = circles;
    };
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn({ type: "bigint" }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Circle_1.Circle; }, function (circle) { return "users"; }),
        __metadata("design:type", Promise)
    ], User.prototype, "circles", void 0);
    User = __decorate([
        Entity_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map