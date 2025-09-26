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
var Contact_1 = require("./Contact");
var Organisation = /** @class */ (function () {
    function Organisation() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Organisation.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Organisation.prototype, "name", void 0);
    __decorate([
        Column_1.Column(function (type) { return Contact_1.Contact; }),
        __metadata("design:type", Contact_1.Contact)
    ], Organisation.prototype, "contact", void 0);
    Organisation = __decorate([
        Entity_1.Entity()
    ], Organisation);
    return Organisation;
}());
exports.Organisation = Organisation;
//# sourceMappingURL=Organisation.js.map