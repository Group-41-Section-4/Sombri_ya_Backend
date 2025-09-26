"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var User_1 = require("./entity/User");
var Product_1 = require("./entity/Product");
var DeliverySlot_1 = require("./entity/DeliverySlot");
var Order_1 = require("./entity/Order");
var OrderItem_1 = require("./entity/OrderItem");
describe.skip("github issues > #1581 Composite key breaks OneToMany relation", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mysql"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("throws an error because there is no object id defined", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var user1, product1, product2, slot1, slot2, order1, item1, orders2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = new User_1.User();
                    user1.email = "user1@example.com";
                    return [4 /*yield*/, connection.manager.save(user1)];
                case 1:
                    _a.sent();
                    product1 = new Product_1.Product();
                    product1.id = 1;
                    product1.name = "Product 1";
                    return [4 /*yield*/, connection.manager.save(product1)];
                case 2:
                    _a.sent();
                    product2 = new Product_1.Product();
                    product2.id = 3;
                    product2.name = "Product 2";
                    return [4 /*yield*/, connection.manager.save(product2)];
                case 3:
                    _a.sent();
                    slot1 = new DeliverySlot_1.DeliverySlot();
                    slot1.name = "Slot 1";
                    return [4 /*yield*/, connection.manager.save(slot1)];
                case 4:
                    _a.sent();
                    slot2 = new DeliverySlot_1.DeliverySlot();
                    slot2.name = "Slot 2";
                    return [4 /*yield*/, connection.manager.save(slot2)];
                case 5:
                    _a.sent();
                    order1 = new Order_1.Order();
                    order1.deliverySlot = slot1;
                    order1.user = user1;
                    order1.enabled = true;
                    return [4 /*yield*/, connection.manager.save(order1)];
                case 6:
                    _a.sent();
                    item1 = new OrderItem_1.OrderItem();
                    item1.order = order1;
                    item1.product = product1;
                    item1.amount = 3;
                    return [4 /*yield*/, connection.manager.save(item1)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Order_1.Order, "order")
                            .leftJoinAndSelect("order.deliverySlot", "deliverySlot")
                            .leftJoinAndSelect("order.user", "user")
                            .leftJoinAndSelect("order.items", "items")
                            .getMany()];
                case 8:
                    orders2 = _a.sent();
                    console.log(orders2);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1581.js.map