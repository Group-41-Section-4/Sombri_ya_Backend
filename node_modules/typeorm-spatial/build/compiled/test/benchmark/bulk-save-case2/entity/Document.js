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
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Document = /** @class */ (function () {
    function Document() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn("text"),
        __metadata("design:type", String)
    ], Document.prototype, "id", void 0);
    __decorate([
        Column_1.Column("text"),
        __metadata("design:type", String)
    ], Document.prototype, "docId", void 0);
    __decorate([
        Column_1.Column("text"),
        __metadata("design:type", String)
    ], Document.prototype, "label", void 0);
    __decorate([
        Column_1.Column("text"),
        __metadata("design:type", String)
    ], Document.prototype, "context", void 0);
    __decorate([
        Column_1.Column({ type: "jsonb" }),
        __metadata("design:type", Array)
    ], Document.prototype, "distributions", void 0);
    __decorate([
        Column_1.Column({ type: "timestamp with time zone" }),
        __metadata("design:type", Date)
    ], Document.prototype, "date", void 0);
    Document = __decorate([
        Entity_1.Entity()
    ], Document);
    return Document;
}());
exports.Document = Document;
//# sourceMappingURL=Document.js.map