"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
var ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
var JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
var Employee_1 = require("./Employee");
var Department_1 = require("./Department");
var Accountant = /** @class */ (function (_super) {
    __extends(Accountant, _super);
    function Accountant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Department_1.Department; }, function (department) { return department.accountants; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Accountant.prototype, "departments", void 0);
    Accountant = __decorate([
        ChildEntity_1.ChildEntity()
    ], Accountant);
    return Accountant;
}(Employee_1.Employee));
exports.Accountant = Accountant;
//# sourceMappingURL=Accountant.js.map