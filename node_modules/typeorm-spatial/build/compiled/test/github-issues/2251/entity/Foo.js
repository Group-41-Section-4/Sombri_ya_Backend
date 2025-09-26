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
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Bar_1 = require("./Bar");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Foo.prototype, "id", void 0);
    __decorate([
        src_1.OneToMany(function () { return Bar_1.Bar; }, function (bar) { return bar.foo; }, { cascade: true, eager: true }),
        __metadata("design:type", Array)
    ], Foo.prototype, "bars", void 0);
    Foo = __decorate([
        Entity_1.Entity("foo")
    ], Foo);
    return Foo;
}());
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map