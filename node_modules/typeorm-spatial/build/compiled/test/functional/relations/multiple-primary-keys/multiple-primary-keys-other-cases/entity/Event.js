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
var OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
var EventMember_1 = require("./EventMember");
var Person_1 = require("./Person");
var Event = /** @class */ (function () {
    function Event() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Event.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "name", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Person_1.Person; }),
        __metadata("design:type", Person_1.Person)
    ], Event.prototype, "author", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return EventMember_1.EventMember; }, function (member) { return member.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "members", void 0);
    Event = __decorate([
        Entity_1.Entity()
    ], Event);
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map