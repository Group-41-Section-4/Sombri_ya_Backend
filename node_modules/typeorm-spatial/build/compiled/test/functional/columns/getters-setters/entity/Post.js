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
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Post = /** @class */ (function () {
    function Post() {
    }
    Object.defineProperty(Post.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            // this._title = "!" + title + "!"; // if you'll do "append" like this, you won't get expected results, because setter is called multiple times
            if (title === "hello") {
                this._title = "bye";
            }
            else {
                this._title = title;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Post.prototype, "title", null);
    Post = __decorate([
        Entity_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map