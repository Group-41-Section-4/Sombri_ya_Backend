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
var Index_1 = require("../../../../src/decorator/Index");
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var master_1 = require("./master");
var Detail = /** @class */ (function () {
    function Detail() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn({
            length: 20
        }),
        __metadata("design:type", String)
    ], Detail.prototype, "id", void 0);
    __decorate([
        Column_1.Column({
            nullable: false,
            length: 20
        }),
        __metadata("design:type", String)
    ], Detail.prototype, "masterId", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return master_1.Master; }, function (master) { return master.details; }, {
            nullable: false,
            onDelete: "CASCADE"
        }),
        JoinColumn_1.JoinColumn({
            name: "masterId"
        }),
        __metadata("design:type", master_1.Master)
    ], Detail.prototype, "master", void 0);
    Detail = __decorate([
        Entity_1.Entity(),
        Index_1.Index("IDX_UNQ_MasterId", function (type) { return [type.masterId]; }, { unique: true })
    ], Detail);
    return Detail;
}());
exports.Detail = Detail;
//# sourceMappingURL=detail.js.map