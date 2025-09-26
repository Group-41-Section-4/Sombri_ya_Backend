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
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var Message_1 = require("./Message");
var Locale = /** @class */ (function () {
    function Locale() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn("varchar", { length: 5 }),
        __metadata("design:type", String)
    ], Locale.prototype, "code", void 0);
    __decorate([
        Column_1.Column("varchar", { length: 50 }),
        __metadata("design:type", String)
    ], Locale.prototype, "englishName", void 0);
    __decorate([
        OneToOne_1.OneToOne(function () { return Message_1.Message; }, { onDelete: "SET NULL" }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Message_1.Message)
    ], Locale.prototype, "name", void 0);
    Locale = __decorate([
        Entity_1.Entity()
    ], Locale);
    return Locale;
}());
exports.Locale = Locale;
//# sourceMappingURL=Locale.js.map