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
var index_1 = require("../../../../../src/index");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
var Post_1 = require("./Post");
var Counters_1 = require("./Counters");
var User_1 = require("./User");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "filename", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], Photo.prototype, "user", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Post_1.Post; }, function (post) { return post.photos; }),
        __metadata("design:type", Post_1.Post)
    ], Photo.prototype, "post", void 0);
    __decorate([
        Column_1.Column(function (type) { return Counters_1.Counters; }),
        __metadata("design:type", Counters_1.Counters)
    ], Photo.prototype, "counters", void 0);
    Photo = __decorate([
        Entity_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map