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
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var Kollektion_1 = require("./Kollektion");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var Generated_1 = require("../../../../src/decorator/Generated");
var Artikel = /** @class */ (function () {
    function Artikel() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn("int", { name: "artikel_id" }),
        Generated_1.Generated(),
        __metadata("design:type", Number)
    ], Artikel.prototype, "id", void 0);
    __decorate([
        Column_1.Column({ name: "artikel_nummer" }),
        __metadata("design:type", String)
    ], Artikel.prototype, "nummer", void 0);
    __decorate([
        Column_1.Column({ name: "artikel_name" }),
        __metadata("design:type", String)
    ], Artikel.prototype, "name", void 0);
    __decorate([
        Column_1.Column({ name: "artikel_extrabarcode" }),
        __metadata("design:type", String)
    ], Artikel.prototype, "extrabarcode", void 0);
    __decorate([
        Column_1.Column({ name: "artikel_saison" }),
        __metadata("design:type", String)
    ], Artikel.prototype, "saison", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Kollektion_1.Kollektion; }, { cascade: true }),
        JoinColumn_1.JoinColumn({ name: "id_kollektion" }),
        __metadata("design:type", Kollektion_1.Kollektion)
    ], Artikel.prototype, "kollektion", void 0);
    Artikel = __decorate([
        Entity_1.Entity("artikel")
    ], Artikel);
    return Artikel;
}());
exports.Artikel = Artikel;
//# sourceMappingURL=Artikel.js.map