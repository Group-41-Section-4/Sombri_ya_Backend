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
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Student_1 = require("./Student");
var OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
var Index_1 = require("../../../../src/decorator/Index");
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Teacher.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Teacher.prototype, "name", void 0);
    __decorate([
        OneToMany_1.OneToMany(function (type) { return Student_1.Student; }, function (student) { return student.teacher; }),
        __metadata("design:type", Array)
    ], Teacher.prototype, "students", void 0);
    Teacher = __decorate([
        Entity_1.Entity(),
        Index_1.Index("ignored_index", { synchronize: false })
    ], Teacher);
    return Teacher;
}());
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map