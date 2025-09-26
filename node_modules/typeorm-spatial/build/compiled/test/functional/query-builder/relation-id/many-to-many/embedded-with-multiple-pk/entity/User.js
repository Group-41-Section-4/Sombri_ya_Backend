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
var Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
var PrimaryColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryColumn");
var ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
var Post_1 = require("./Post");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        PrimaryColumn_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Post_1.Post; }, function (post) { return post.counters.subcntrs.watchedUsers; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    User = __decorate([
        Entity_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map