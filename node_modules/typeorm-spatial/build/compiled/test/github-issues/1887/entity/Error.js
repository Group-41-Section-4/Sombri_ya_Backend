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
var src_1 = require("../../../../src");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Error = /** @class */ (function () {
    function Error() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Error.prototype, "id", void 0);
    __decorate([
        Column_1.Column("uniqueidentifier", { nullable: false }),
        __metadata("design:type", String)
    ], Error.prototype, "executionGuid", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorNumber", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Error.prototype, "errorDescription", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Date)
    ], Error.prototype, "errorDate", void 0);
    Error = __decorate([
        src_1.Entity("Error")
    ], Error);
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=Error.js.map