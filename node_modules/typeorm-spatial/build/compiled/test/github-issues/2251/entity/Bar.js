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
var Foo_1 = require("./Foo");
var Bar = /** @class */ (function () {
    function Bar() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Bar.prototype, "id", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", String)
    ], Bar.prototype, "description", void 0);
    __decorate([
        src_1.ManyToOne(function (type) { return Foo_1.Foo; }, function (foo) { return foo.bars; }),
        __metadata("design:type", Foo_1.Foo)
    ], Bar.prototype, "foo", void 0);
    Bar = __decorate([
        Entity_1.Entity()
    ], Bar);
    return Bar;
}());
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map