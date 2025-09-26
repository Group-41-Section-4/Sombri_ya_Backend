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
var chai_1 = require("chai");
var Car_1 = require("./entity/Car");
var Fruit_1 = require("./entity/Fruit");
describe("github issues > #363 Can't save 2 unrelated entity types in a single persist call", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("entityManager should allow you to save unrelated entities with one persist call", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var car, fruit, _a, savedCar, savedFruit, cars, fruits;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    car = new Car_1.Car();
                    car.name = "Ferrari";
                    fruit = new Fruit_1.Fruit();
                    fruit.name = "Banana";
                    return [4 /*yield*/, connection.manager.save([car, fruit])];
                case 1:
                    _a = _b.sent(), savedCar = _a[0], savedFruit = _a[1];
                    chai_1.expect(savedFruit).to.have.property("name", "Banana");
                    chai_1.expect(savedFruit).to.be.instanceof(Fruit_1.Fruit);
                    chai_1.expect(savedCar).to.have.property("name", "Ferrari");
                    chai_1.expect(savedCar).to.be.instanceof(Car_1.Car);
                    return [4 /*yield*/, connection.manager.find(Car_1.Car)];
                case 2:
                    cars = _b.sent();
                    // before the changes in this PR, all the tests before this one actually passed
                    chai_1.expect(cars).to.length(1);
                    chai_1.expect(cars[0]).to.have.property("name", "Ferrari");
                    return [4 /*yield*/, connection.manager.find(Fruit_1.Fruit)];
                case 3:
                    fruits = _b.sent();
                    chai_1.expect(fruits).to.length(1);
                    chai_1.expect(fruits[0]).to.have.property("name", "Banana");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("entityManager should allow you to delete unrelated entities with one remove call", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var fruit, fruit2, savedFruit, car, savedCar, cars, fruits;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fruit = new Fruit_1.Fruit();
                    fruit.name = "Banana";
                    fruit2 = new Fruit_1.Fruit();
                    fruit2.name = "Apple";
                    return [4 /*yield*/, connection.manager.save([fruit, fruit2])];
                case 1:
                    savedFruit = (_a.sent())[0];
                    car = new Car_1.Car();
                    car.name = "Ferrari";
                    return [4 /*yield*/, connection.manager.save(car)];
                case 2:
                    savedCar = _a.sent();
                    return [4 /*yield*/, connection.manager.remove([savedCar, savedFruit])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.find(Car_1.Car)];
                case 4:
                    cars = _a.sent();
                    chai_1.expect(cars).to.length(0);
                    return [4 /*yield*/, connection.manager.find(Fruit_1.Fruit)];
                case 5:
                    fruits = _a.sent();
                    chai_1.expect(fruits).to.length(1);
                    chai_1.expect(fruits[0]).to.have.property("name", "Apple");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-363.js.map