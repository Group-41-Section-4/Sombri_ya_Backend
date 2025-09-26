"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
var FirstCustomNamingStrategy = /** @class */ (function (_super) {
    __extends(FirstCustomNamingStrategy, _super);
    function FirstCustomNamingStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstCustomNamingStrategy.prototype.tableName = function (className, customName) {
        return customName ? customName.toUpperCase() : className.toUpperCase();
    };
    return FirstCustomNamingStrategy;
}(DefaultNamingStrategy_1.DefaultNamingStrategy));
exports.FirstCustomNamingStrategy = FirstCustomNamingStrategy;
//# sourceMappingURL=FirstCustomNamingStrategy.js.map