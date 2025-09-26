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
var typings_1 = require("../../../../src/driver/mongodb/typings");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var ObjectIdColumn_1 = require("../../../../src/decorator/columns/ObjectIdColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Event = /** @class */ (function () {
    function Event() {
    }
    __decorate([
        ObjectIdColumn_1.ObjectIdColumn(),
        __metadata("design:type", typings_1.ObjectID)
    ], Event.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "name", void 0);
    __decorate([
        Column_1.Column({ name: "at_date", default: Date.now }),
        __metadata("design:type", Date)
    ], Event.prototype, "date", void 0);
    Event = __decorate([
        Entity_1.Entity()
    ], Event);
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map