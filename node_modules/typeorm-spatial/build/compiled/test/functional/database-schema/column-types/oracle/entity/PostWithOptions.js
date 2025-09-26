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
        Column_1.Column("number", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "number", void 0);
    __decorate([
        Column_1.Column("numeric", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "numeric", void 0);
    __decorate([
        Column_1.Column("dec", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "dec", void 0);
    __decorate([
        Column_1.Column("decimal", { precision: 10, scale: 5 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "decimal", void 0);
    __decorate([
        Column_1.Column("float", { precision: 24 }),
        __metadata("design:type", Number)
    ], PostWithOptions.prototype, "float", void 0);
    __decorate([
        Column_1.Column("char", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "char", void 0);
    __decorate([
        Column_1.Column("nchar", { length: 3 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "nchar", void 0);
    __decorate([
        Column_1.Column("varchar2", { length: 50 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "varchar2", void 0);
    __decorate([
        Column_1.Column("nvarchar2", { length: 40 }),
        __metadata("design:type", String)
    ], PostWithOptions.prototype, "nvarchar2", void 0);
    __decorate([
        Column_1.Column("raw", { length: 500 }),
        __metadata("design:type", Buffer)
    ], PostWithOptions.prototype, "raw", void 0);
    __decorate([
        Column_1.Column("timestamp", { precision: 5 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "timestamp", void 0);
    __decorate([
        Column_1.Column("timestamp with time zone", { precision: 6 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "timestampWithTimeZone", void 0);
    __decorate([
        Column_1.Column("timestamp with local time zone", { precision: 7 }),
        __metadata("design:type", Date)
    ], PostWithOptions.prototype, "timestampWithLocalTimeZone", void 0);
    PostWithOptions = __decorate([
        Entity_1.Entity()
    ], PostWithOptions);
    return PostWithOptions;
}());
exports.PostWithOptions = PostWithOptions;
//# sourceMappingURL=PostWithOptions.js.map