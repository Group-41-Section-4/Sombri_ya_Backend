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
var EmbeddedInThing = /** @class */ (function () {
    function EmbeddedInThing() {
    }
    __decorate([
        src_1.Column(),
        __metadata("design:type", Number)
    ], EmbeddedInThing.prototype, "someSeriouslyLongFieldNameFirst", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", Number)
    ], EmbeddedInThing.prototype, "someSeriouslyLongFieldNameSecond", void 0);
    return EmbeddedInThing;
}());
exports.EmbeddedInThing = EmbeddedInThing;
var Thing = /** @class */ (function () {
    function Thing() {
    }
    __decorate([
        src_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Thing.prototype, "id", void 0);
    __decorate([
        src_1.Column(function (type) { return EmbeddedInThing; }),
        __metadata("design:type", EmbeddedInThing)
    ], Thing.prototype, "embeddedThing", void 0);
    Thing = __decorate([
        src_1.Entity()
    ], Thing);
    return Thing;
}());
exports.Thing = Thing;
//# sourceMappingURL=thing.js.map