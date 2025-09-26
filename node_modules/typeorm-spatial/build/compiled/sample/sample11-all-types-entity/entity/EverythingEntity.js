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
var index_1 = require("../../../src/index");
var CreateDateColumn_1 = require("../../../src/decorator/columns/CreateDateColumn");
var UpdateDateColumn_1 = require("../../../src/decorator/columns/UpdateDateColumn");
var EverythingEntity = /** @class */ (function () {
    function EverythingEntity() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], EverythingEntity.prototype, "name", void 0);
    __decorate([
        index_1.Column("text"),
        __metadata("design:type", String)
    ], EverythingEntity.prototype, "text", void 0);
    __decorate([
        index_1.Column({ length: "32" }),
        __metadata("design:type", String)
    ], EverythingEntity.prototype, "shortTextColumn", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "numberColumn", void 0);
    __decorate([
        index_1.Column("integer"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "integerColumn", void 0);
    __decorate([
        index_1.Column("int"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "intColumn", void 0);
    __decorate([
        index_1.Column("smallint"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "smallintColumn", void 0);
    __decorate([
        index_1.Column("bigint"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "bigintColumn", void 0);
    __decorate([
        index_1.Column("float"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "floatColumn", void 0);
    __decorate([
        index_1.Column("double"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "doubleColumn", void 0);
    __decorate([
        index_1.Column("decimal"),
        __metadata("design:type", Number)
    ], EverythingEntity.prototype, "decimalColumn", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", Date)
    ], EverythingEntity.prototype, "date", void 0);
    __decorate([
        index_1.Column("date"),
        __metadata("design:type", Date)
    ], EverythingEntity.prototype, "dateColumn", void 0);
    __decorate([
        index_1.Column("time"),
        __metadata("design:type", Date)
    ], EverythingEntity.prototype, "timeColumn", void 0);
    __decorate([
        index_1.Column("boolean"),
        __metadata("design:type", Boolean)
    ], EverythingEntity.prototype, "isBooleanColumn", void 0);
    __decorate([
        index_1.Column("boolean"),
        __metadata("design:type", Boolean)
    ], EverythingEntity.prototype, "isSecondBooleanColumn", void 0);
    __decorate([
        index_1.Column("json"),
        __metadata("design:type", Object)
    ], EverythingEntity.prototype, "jsonColumn", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", Object)
    ], EverythingEntity.prototype, "alsoJson", void 0);
    __decorate([
        index_1.Column("simple_array"),
        __metadata("design:type", Array)
    ], EverythingEntity.prototype, "simpleArrayColumn", void 0);
    __decorate([
        CreateDateColumn_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], EverythingEntity.prototype, "createdDate", void 0);
    __decorate([
        UpdateDateColumn_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], EverythingEntity.prototype, "updatedDate", void 0);
    EverythingEntity = __decorate([
        index_1.Entity("sample11_everything_entity")
    ], EverythingEntity);
    return EverythingEntity;
}());
exports.EverythingEntity = EverythingEntity;
//# sourceMappingURL=EverythingEntity.js.map