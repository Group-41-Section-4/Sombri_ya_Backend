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
var Photo_1 = require("./Photo");
var string_decoder_1 = require("string_decoder");
var User = /** @class */ (function () {
    function User() {
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            var decoder = new string_decoder_1.StringDecoder("hex");
            return decoder.end(this._id);
        },
        set: function (value) {
            this._id = Buffer.from(value, "hex");
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        src_1.PrimaryColumn("binary", {
            length: 2
        }),
        __metadata("design:type", Buffer)
    ], User.prototype, "_id", void 0);
    __decorate([
        src_1.Column(),
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    __decorate([
        src_1.OneToMany(function (type) { return Photo_1.Photo; }, function (photo) { return photo.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "photos", void 0);
    User = __decorate([
        src_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map