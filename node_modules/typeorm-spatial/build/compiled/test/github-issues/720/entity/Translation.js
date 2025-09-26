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
var Index_1 = require("../../../../src/decorator/Index");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Message_1 = require("./Message");
var Locale_1 = require("./Locale");
var Translation = /** @class */ (function () {
    function Translation() {
    }
    __decorate([
        ManyToOne_1.ManyToOne(function () { return Locale_1.Locale; }, { primary: true, nullable: false }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Locale_1.Locale)
    ], Translation.prototype, "locale", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function () { return Message_1.Message; }, { primary: true, nullable: false }),
        JoinColumn_1.JoinColumn(),
        __metadata("design:type", Message_1.Message)
    ], Translation.prototype, "message", void 0);
    __decorate([
        Column_1.Column("text"),
        __metadata("design:type", String)
    ], Translation.prototype, "text", void 0);
    Translation = __decorate([
        Entity_1.Entity(),
        Index_1.Index(["locale", "message"], { unique: true })
    ], Translation);
    return Translation;
}());
exports.Translation = Translation;
//# sourceMappingURL=Translation.js.map