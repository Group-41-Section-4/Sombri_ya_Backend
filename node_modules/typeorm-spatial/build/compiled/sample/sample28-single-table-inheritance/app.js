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
var index_1 = require("../../src/index");
var Employee_1 = require("./entity/Employee");
var Homesitter_1 = require("./entity/Homesitter");
var Student_1 = require("./entity/Student");
var Person_1 = require("./entity/Person");
var options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [
        Person_1.Person,
        Employee_1.Employee,
        Homesitter_1.Homesitter,
        Student_1.Student
    ]
};
index_1.createConnection(options).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var employeeRepository, employee, loadedEmployee, homesitterRepository, homesitter, loadedHomesitter, studentRepository, student, loadedStudent, secondEmployee, thirdEmployee, secondHomesitter, thirdHomesitter, secondStudent, thirdStudent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                employeeRepository = connection.getRepository(Employee_1.Employee);
                employee = new Employee_1.Employee();
                employee.id = 1;
                employee.firstName = "umed";
                employee.lastName = "khudoiberdiev";
                employee.salary = 200000;
                console.log("saving the employee: ");
                return [4 /*yield*/, employeeRepository.save(employee)];
            case 1:
                _a.sent();
                console.log("employee has been saved: ", employee);
                console.log("now loading the employee: ");
                return [4 /*yield*/, employeeRepository.findOne(1)];
            case 2:
                loadedEmployee = _a.sent();
                console.log("loaded employee: ", loadedEmployee);
                console.log("-----------------");
                homesitterRepository = connection.getRepository(Homesitter_1.Homesitter);
                homesitter = new Homesitter_1.Homesitter();
                homesitter.id = 2;
                homesitter.firstName = "umed";
                homesitter.lastName = "khudoiberdiev";
                homesitter.numberOfKids = 5;
                console.log("saving the homesitter: ");
                return [4 /*yield*/, homesitterRepository.save(homesitter)];
            case 3:
                _a.sent();
                console.log("homesitter has been saved: ", homesitter);
                console.log("now loading the homesitter: ");
                return [4 /*yield*/, homesitterRepository.findOne(2)];
            case 4:
                loadedHomesitter = _a.sent();
                console.log("loaded homesitter: ", loadedHomesitter);
                console.log("-----------------");
                studentRepository = connection.getRepository(Student_1.Student);
                student = new Student_1.Student();
                student.id = 3;
                student.firstName = "umed";
                student.lastName = "khudoiberdiev";
                student.faculty = "computer science";
                console.log("saving the student: ");
                return [4 /*yield*/, studentRepository.save(student)];
            case 5:
                _a.sent();
                console.log("student has been saved: ", student);
                console.log("now loading the student: ");
                return [4 /*yield*/, studentRepository.findOne(3)];
            case 6:
                loadedStudent = _a.sent();
                console.log("loaded student: ", loadedStudent);
                console.log("-----------------");
                return [4 /*yield*/, employeeRepository.findOne(2)];
            case 7:
                secondEmployee = _a.sent();
                console.log("Non exist employee: ", secondEmployee);
                return [4 /*yield*/, employeeRepository.findOne(3)];
            case 8:
                thirdEmployee = _a.sent();
                console.log("Non exist employee: ", thirdEmployee);
                console.log("-----------------");
                return [4 /*yield*/, homesitterRepository.findOne(1)];
            case 9:
                secondHomesitter = _a.sent();
                console.log("Non exist homesitter: ", secondHomesitter);
                return [4 /*yield*/, homesitterRepository.findOne(3)];
            case 10:
                thirdHomesitter = _a.sent();
                console.log("Non exist homesitter: ", thirdHomesitter);
                console.log("-----------------");
                return [4 /*yield*/, studentRepository.findOne(1)];
            case 11:
                secondStudent = _a.sent();
                console.log("Non exist student: ", secondStudent);
                return [4 /*yield*/, studentRepository.findOne(2)];
            case 12:
                thirdStudent = _a.sent();
                console.log("Non exist student: ", thirdStudent);
                return [2 /*return*/];
        }
    });
}); }, function (error) { return console.log("Error: ", error); });
//# sourceMappingURL=app.js.map