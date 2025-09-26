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
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
var Photo_1 = require("./Photo");
var User_1 = require("./User");
var Question_1 = require("./Question");
var Answer = /** @class */ (function () {
    function Answer() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Answer.prototype, "id", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Question_1.Question; }, function (question) { return question.answers; }, {
            cascade: ["insert"],
            nullable: false
        }),
        __metadata("design:type", Question_1.Question)
    ], Answer.prototype, "question", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return Photo_1.Photo; }, {
            cascade: ["insert"],
            nullable: false
        }),
        __metadata("design:type", Photo_1.Photo)
    ], Answer.prototype, "photo", void 0);
    __decorate([
        ManyToOne_1.ManyToOne(function (type) { return User_1.User; }, {
            cascade: ["insert"],
            nullable: false
        }),
        __metadata("design:type", User_1.User)
    ], Answer.prototype, "user", void 0);
    Answer = __decorate([
        Entity_1.Entity()
    ], Answer);
    return Answer;
}());
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map