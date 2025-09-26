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
var ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Device_1 = require("./Device");
var DeviceInstance = /** @class */ (function () {
    function DeviceInstance() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn({ name: "id", type: "char", length: "36" }),
        __metadata("design:type", String)
    ], DeviceInstance.prototype, "id", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Device_1.Device; }, { nullable: false }),
        JoinColumn_1.JoinColumn({ name: "device_id", referencedColumnName: "id" }),
        __metadata("design:type", Device_1.Device)
    ], DeviceInstance.prototype, "device", void 0);
    __decorate([
        Column_1.Column({ name: "instance", type: "smallint" }),
        __metadata("design:type", Number)
    ], DeviceInstance.prototype, "instance", void 0);
    __decorate([
        Column_1.Column({ name: "type", type: "varchar", length: "30" }),
        __metadata("design:type", String)
    ], DeviceInstance.prototype, "type", void 0);
    DeviceInstance = __decorate([
        Entity_1.Entity("device_instances")
    ], DeviceInstance);
    return DeviceInstance;
}());
exports.DeviceInstance = DeviceInstance;
//# sourceMappingURL=DeviceInstance.js.map