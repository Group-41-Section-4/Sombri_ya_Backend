"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventSubscriber_1 = require("../../../src/decorator/listeners/EventSubscriber");
var EverythingSubscriber = /** @class */ (function () {
    function EverythingSubscriber() {
    }
    /**
     * Called before entity insertion.
     */
    EverythingSubscriber.prototype.beforeInsert = function (event) {
        console.log("BEFORE ENTITY INSERTED: ", event.entity);
    };
    /**
     * Called before entity insertion.
     */
    EverythingSubscriber.prototype.beforeUpdate = function (event) {
        console.log("BEFORE ENTITY UPDATED: ", event.entity);
    };
    /**
     * Called before entity insertion.
     */
    EverythingSubscriber.prototype.beforeRemove = function (event) {
        console.log("BEFORE ENTITY WITH ID " + event.entityId + " REMOVED: ", event.entity);
    };
    /**
     * Called after entity insertion.
     */
    EverythingSubscriber.prototype.afterInsert = function (event) {
        console.log("AFTER ENTITY INSERTED: ", event.entity);
    };
    /**
     * Called after entity insertion.
     */
    EverythingSubscriber.prototype.afterUpdate = function (event) {
        console.log("AFTER ENTITY UPDATED: ", event.entity);
    };
    /**
     * Called after entity insertion.
     */
    EverythingSubscriber.prototype.afterRemove = function (event) {
        console.log("AFTER ENTITY WITH ID " + event.entityId + " REMOVED: ", event.entity);
    };
    /**
     * Called after entity is loaded.
     */
    EverythingSubscriber.prototype.afterLoad = function (entity) {
        console.log("AFTER ENTITY LOADED: ", entity);
    };
    EverythingSubscriber = __decorate([
        EventSubscriber_1.EventSubscriber()
    ], EverythingSubscriber);
    return EverythingSubscriber;
}());
exports.EverythingSubscriber = EverythingSubscriber;
//# sourceMappingURL=EverythingSubscriber.js.map