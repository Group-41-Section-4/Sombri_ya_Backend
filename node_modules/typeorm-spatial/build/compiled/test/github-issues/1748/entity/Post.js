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
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Uuid = /** @class */ (function () {
    function Uuid(value) {
        if (!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(value)) {
            throw new Error("Invalid UUID format");
        }
        this.value = value;
    }
    Uuid.prototype.getValue = function () {
        return this.value;
    };
    return Uuid;
}());
exports.Uuid = Uuid;
var UuidTransformer = /** @class */ (function () {
    function UuidTransformer() {
    }
    UuidTransformer.prototype.to = function (value) {
        return value.getValue();
    };
    UuidTransformer.prototype.from = function (value) {
        return new Uuid(value);
    };
    return UuidTransformer;
}());
var Post = /** @class */ (function () {
    function Post(id) {
        this.id = id;
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn({ type: "uuid", transformer: new UuidTransformer() }),
        __metadata("design:type", Uuid)
    ], Post.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    Post = __decorate([
        Entity_1.Entity(),
        __metadata("design:paramtypes", [Uuid])
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map