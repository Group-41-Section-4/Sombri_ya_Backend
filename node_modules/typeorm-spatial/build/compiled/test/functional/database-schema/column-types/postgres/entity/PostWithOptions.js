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
var PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
var Column_1 = require("../../../../../../src/decorator/columns/Column");
var PostWithOptions = /** @class */ (function () {
    function PostWithOptions() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "id", void 0);
    __decorate([
        Column_1.Column("numeric", { precision: 5, scale: 2 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "numeric", void 0);
    __decorate([
        Column_1.Column("decimal", { precision: 5, scale: 2 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "decimal", void 0);
    __decorate([
        Column_1.Column("char", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "char", void 0);
    __decorate([
        Column_1.Column("character", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "character", void 0);
    __decorate([
        Column_1.Column("varchar", { length: 30 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "varchar", void 0);
    __decorate([
        Column_1.Column("character varying", { length: 30 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "characterVarying", void 0);
    __decorate([
        Column_1.Column("timestamp", { precision: 3 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "timestamp", void 0);
    __decorate([
        Column_1.Column("timestamp with time zone", { precision: 5 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "timestampWithTimeZone", void 0);
    __decorate([
        Column_1.Column("time", { precision: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "time", void 0);
    __decorate([
        Column_1.Column("time with time zone", { precision: 5 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "timeWithTimeZone", void 0);
    __decorate([
        Column_1.Column("int4range", { nullable: true }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "int4range", void 0);
    PostWithOptions = __decorate([
        Entity_1.Entity()
    ], PostWithOptions);
    return PostWithOptions;
}());
exports.PostWithOptions = PostWithOptions;
//# sourceMappingURL=PostWithOptions.js.map