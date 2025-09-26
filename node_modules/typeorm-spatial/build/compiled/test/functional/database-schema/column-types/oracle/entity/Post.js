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
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "name", void 0);
    __decorate([
        Column_1.Column("number"),
        __metadata("design:type", Number)
    ], Post.prototype, "number", void 0);
    __decorate([
        Column_1.Column("numeric"),
        __metadata("design:type", Number)
    ], Post.prototype, "numeric", void 0);
    __decorate([
        Column_1.Column("float"),
        __metadata("design:type", Number)
    ], Post.prototype, "float", void 0);
    __decorate([
        Column_1.Column("dec"),
        __metadata("design:type", Number)
    ], Post.prototype, "dec", void 0);
    __decorate([
        Column_1.Column("decimal"),
        __metadata("design:type", Number)
    ], Post.prototype, "decimal", void 0);
    __decorate([
        Column_1.Column("int"),
        __metadata("design:type", Number)
    ], Post.prototype, "int", void 0);
    __decorate([
        Column_1.Column("integer"),
        __metadata("design:type", Number)
    ], Post.prototype, "integer", void 0);
    __decorate([
        Column_1.Column("smallint"),
        __metadata("design:type", Number)
    ], Post.prototype, "smallint", void 0);
    __decorate([
        Column_1.Column("real"),
        __metadata("design:type", Number)
    ], Post.prototype, "real", void 0);
    __decorate([
        Column_1.Column("double precision"),
        __metadata("design:type", Number)
    ], Post.prototype, "doublePrecision", void 0);
    __decorate([
        Column_1.Column("char"),
        __metadata("design:type", String)
    ], Post.prototype, "char", void 0);
    __decorate([
        Column_1.Column("nchar"),
        __metadata("design:type", String)
    ], Post.prototype, "nchar", void 0);
    __decorate([
        Column_1.Column("nvarchar2"),
        __metadata("design:type", String)
    ], Post.prototype, "nvarchar2", void 0);
    __decorate([
        Column_1.Column("varchar2"),
        __metadata("design:type", String)
    ], Post.prototype, "varchar2", void 0);
    __decorate([
        Column_1.Column("long"),
        __metadata("design:type", String)
    ], Post.prototype, "long", void 0);
    __decorate([
        Column_1.Column("raw"),
        __metadata("design:type", Buffer)
    ], Post.prototype, "raw", void 0);
    __decorate([
        Column_1.Column("date"),
        __metadata("design:type", Date)
    ], Post.prototype, "dateObj", void 0);
    __decorate([
        Column_1.Column("date"),
        __metadata("design:type", String)
    ], Post.prototype, "date", void 0);
    __decorate([
        Column_1.Column("timestamp"),
        __metadata("design:type", Date)
    ], Post.prototype, "timestamp", void 0);
    __decorate([
        Column_1.Column("timestamp with time zone"),
        __metadata("design:type", Date)
    ], Post.prototype, "timestampWithTimeZone", void 0);
    __decorate([
        Column_1.Column("timestamp with local time zone"),
        __metadata("design:type", Date)
    ], Post.prototype, "timestampWithLocalTimeZone", void 0);
    __decorate([
        Column_1.Column("blob"),
        __metadata("design:type", Buffer)
    ], Post.prototype, "blob", void 0);
    __decorate([
        Column_1.Column("clob"),
        __metadata("design:type", String)
    ], Post.prototype, "clob", void 0);
    __decorate([
        Column_1.Column("nclob"),
        __metadata("design:type", String)
    ], Post.prototype, "nclob", void 0);
    __decorate([
        Column_1.Column("simple-array"),
        __metadata("design:type", Array)
    ], Post.prototype, "simpleArray", void 0);
    Post = __decorate([
        Entity_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map