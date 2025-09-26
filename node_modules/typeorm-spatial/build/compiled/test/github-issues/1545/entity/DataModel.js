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
var index_1 = require("../../../../src/index");
var MainModel_1 = require("./MainModel");
var ValidationModel_1 = require("./ValidationModel");
var DataModel = /** @class */ (function () {
    function DataModel() {
    }
    __decorate([
        index_1.ManyToOne(function (type) { return ValidationModel_1.ValidationModel; }, { eager: true, primary: true }),
        index_1.JoinColumn({
            name: "validation",
            referencedColumnName: "validation"
        }),
        __metadata("design:type", ValidationModel_1.ValidationModel)
    ], DataModel.prototype, "validations", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return MainModel_1.MainModel; }, {
            primary: true
        }),
        index_1.JoinColumn({
            name: "mainId",
            referencedColumnName: "id"
        }),
        __metadata("design:type", MainModel_1.MainModel)
    ], DataModel.prototype, "main", void 0);
    __decorate([
        index_1.Column({
            type: "boolean",
            default: false
        }),
        __metadata("design:type", Boolean)
    ], DataModel.prototype, "active", void 0);
    DataModel = __decorate([
        index_1.Entity()
    ], DataModel);
    return DataModel;
}());
exports.DataModel = DataModel;
//# sourceMappingURL=DataModel.js.map