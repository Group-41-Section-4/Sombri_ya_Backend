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
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var PostDefaultValues = /** @class */ (function () {
    function PostDefaultValues() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostDefaultValues.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], PostDefaultValues.prototype, "title", void 0);
    __decorate([
        Column_1.Column({ default: "hello post" }),
        __metadata("design:type", String)
    ], PostDefaultValues.prototype, "text", void 0);
    __decorate([
        Column_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], PostDefaultValues.prototype, "isActive", void 0);
    __decorate([
        Column_1.Column({ default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], PostDefaultValues.prototype, "addDate", void 0);
    __decorate([
        Column_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], PostDefaultValues.prototype, "views", void 0);
    __decorate([
        Column_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], PostDefaultValues.prototype, "description", void 0);
    PostDefaultValues = __decorate([
        Entity_1.Entity()
    ], PostDefaultValues);
    return PostDefaultValues;
}());
exports.PostDefaultValues = PostDefaultValues;
//# sourceMappingURL=PostDefaultValues.js.map