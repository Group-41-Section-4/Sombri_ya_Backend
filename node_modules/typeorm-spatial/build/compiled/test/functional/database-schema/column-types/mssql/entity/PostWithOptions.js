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
        Column_1.Column("decimal", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "decimal", void 0);
    __decorate([
        Column_1.Column("dec", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "dec", void 0);
    __decorate([
        Column_1.Column("numeric", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "numeric", void 0);
    __decorate([
        Column_1.Column("char", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "char", void 0);
    __decorate([
        Column_1.Column("varchar", { length: 50 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "varchar", void 0);
    __decorate([
        Column_1.Column("nchar", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "nchar", void 0);
    __decorate([
        Column_1.Column("nvarchar", { length: 40 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "nvarchar", void 0);
    __decorate([
        Column_1.Column("binary", { length: 5 }),
        __metadata("design:type", Buffer)
    ], PostWithOptions.prototype, "binary", void 0);
    __decorate([
        Column_1.Column("varbinary", { length: 5 }),
        __metadata("design:type", Buffer)
    ], PostWithOptions.prototype, "varbinary", void 0);
    __decorate([
        Column_1.Column("datetime2", { precision: 4 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "datetime2", void 0);
    __decorate([
        Column_1.Column("time", { precision: 5 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "time", void 0);
    __decorate([
        Column_1.Column("datetimeoffset", { precision: 6 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "datetimeoffset", void 0);
    PostWithOptions = __decorate([
        Entity_1.Entity()
    ], PostWithOptions);
    return PostWithOptions;
}());
exports.PostWithOptions = PostWithOptions;
//# sourceMappingURL=PostWithOptions.js.map