"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventSubscriber_1 = require("../../../../../../src/decorator/listeners/EventSubscriber");
var TestBlogSubscriber = /** @class */ (function () {
    function TestBlogSubscriber() {
    }
    /**
     * Called after entity insertion.
     */
    TestBlogSubscriber.prototype.beforeInsert = function (event) {
        console.log("BEFORE ENTITY INSERTED: ", event.entity);
    };
    TestBlogSubscriber = __decorate([
        EventSubscriber_1.EventSubscriber()
    ], TestBlogSubscriber);
    return TestBlogSubscriber;
}());
exports.TestBlogSubscriber = TestBlogSubscriber;
//# sourceMappingURL=TestBlogSubscriber.js.map