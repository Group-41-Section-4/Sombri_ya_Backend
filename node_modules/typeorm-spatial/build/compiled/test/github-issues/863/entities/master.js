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
var OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
var detail_1 = require("./detail");
var Master = /** @class */ (function () {
    function Master() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn({
            length: 20
        }),
        __metadata("design:type", String)
    ], Master.prototype, "id", void 0);
    __decorate([
        Column_1.Column({
            nullable: false,
            length: 150
        }),
        __metadata("design:type", String)
    ], Master.prototype, "description", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return detail_1.Detail; }, function (detail) { return detail.master; }),
        __metadata("design:type", Array)
    ], Master.prototype, "details", void 0);
    Master = __decorate([
        Entity_1.Entity()
    ], Master);
    return Master;
}());
exports.Master = Master;
//# sourceMappingURL=master.js.map