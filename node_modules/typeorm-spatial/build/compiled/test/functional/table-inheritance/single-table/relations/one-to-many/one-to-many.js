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
var test_utils_1 = require("../../../../../utils/test-utils");
var Student_1 = require("./entity/Student");
var Teacher_1 = require("./entity/Teacher");
var Accountant_1 = require("./entity/Accountant");
var Employee_1 = require("./entity/Employee");
var Person_1 = require("./entity/Person");
var Faculty_1 = require("./entity/Faculty");
var Specialization_1 = require("./entity/Specialization");
var Department_1 = require("./entity/Department");
describe("table-inheritance > single-table > relations > one-to-many", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should work correctly with OneToMany relations", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var faculty1, faculty2, student, specialization1, specialization2, teacher, department1, department2, accountant, loadedStudent, loadedTeacher, loadedAccountant, loadedEmployees, loadedPersons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    faculty1 = new Faculty_1.Faculty();
                    faculty1.name = "Economics";
                    return [4 /*yield*/, connection.getRepository(Faculty_1.Faculty).save(faculty1)];
                case 1:
                    _a.sent();
                    faculty2 = new Faculty_1.Faculty();
                    faculty2.name = "Programming";
                    return [4 /*yield*/, connection.getRepository(Faculty_1.Faculty).save(faculty2)];
                case 2:
                    _a.sent();
                    student = new Student_1.Student();
                    student.name = "Alice";
                    student.faculties = [faculty1, faculty2];
                    return [4 /*yield*/, connection.getRepository(Student_1.Student).save(student)];
                case 3:
                    _a.sent();
                    specialization1 = new Specialization_1.Specialization();
                    specialization1.name = "Geography";
                    return [4 /*yield*/, connection.getRepository(Specialization_1.Specialization).save(specialization1)];
                case 4:
                    _a.sent();
                    specialization2 = new Specialization_1.Specialization();
                    specialization2.name = "Economist";
                    return [4 /*yield*/, connection.getRepository(Specialization_1.Specialization).save(specialization2)];
                case 5:
                    _a.sent();
                    teacher = new Teacher_1.Teacher();
                    teacher.name = "Mr. Garrison";
                    teacher.specializations = [specialization1, specialization2];
                    teacher.salary = 2000;
                    return [4 /*yield*/, connection.getRepository(Teacher_1.Teacher).save(teacher)];
                case 6:
                    _a.sent();
                    department1 = new Department_1.Department();
                    department1.name = "Bookkeeping";
                    return [4 /*yield*/, connection.getRepository(Department_1.Department).save(department1)];
                case 7:
                    _a.sent();
                    department2 = new Department_1.Department();
                    department2.name = "HR";
                    return [4 /*yield*/, connection.getRepository(Department_1.Department).save(department2)];
                case 8:
                    _a.sent();
                    accountant = new Accountant_1.Accountant();
                    accountant.name = "Mr. Burns";
                    accountant.departments = [department1, department2];
                    accountant.salary = 3000;
                    return [4 /*yield*/, connection.getRepository(Accountant_1.Accountant).save(accountant)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Student_1.Student, "student")
                            .leftJoinAndSelect("student.faculties", "faculty")
                            .where("student.name = :name", { name: "Alice" })
                            .orderBy("student.id, faculty.id")
                            .getOne()];
                case 10:
                    loadedStudent = _a.sent();
                    loadedStudent.should.have.all.keys("id", "name", "faculties");
                    loadedStudent.id.should.equal(1);
                    loadedStudent.name.should.equal("Alice");
                    loadedStudent.faculties.length.should.equal(2);
                    loadedStudent.faculties[0].name.should.be.equal("Economics");
                    loadedStudent.faculties[1].name.should.be.equal("Programming");
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Teacher_1.Teacher, "teacher")
                            .leftJoinAndSelect("teacher.specializations", "specialization")
                            .where("teacher.name = :name", { name: "Mr. Garrison" })
                            .orderBy("teacher.id, specialization.id")
                            .getOne()];
                case 11:
                    loadedTeacher = _a.sent();
                    loadedTeacher.should.have.all.keys("id", "name", "specializations", "salary");
                    loadedTeacher.id.should.equal(2);
                    loadedTeacher.name.should.equal("Mr. Garrison");
                    loadedTeacher.specializations.length.should.equal(2);
                    loadedTeacher.specializations[0].name.should.be.equal("Geography");
                    loadedTeacher.specializations[1].name.should.be.equal("Economist");
                    loadedTeacher.salary.should.equal(2000);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Accountant_1.Accountant, "accountant")
                            .leftJoinAndSelect("accountant.departments", "department")
                            .where("accountant.name = :name", { name: "Mr. Burns" })
                            .orderBy("accountant.id, department.id")
                            .getOne()];
                case 12:
                    loadedAccountant = _a.sent();
                    loadedAccountant.should.have.all.keys("id", "name", "departments", "salary");
                    loadedAccountant.id.should.equal(3);
                    loadedAccountant.name.should.equal("Mr. Burns");
                    loadedAccountant.departments.length.should.equal(2);
                    loadedAccountant.departments[0].name.should.be.equal("Bookkeeping");
                    loadedAccountant.departments[1].name.should.be.equal("HR");
                    loadedAccountant.salary.should.equal(3000);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Employee_1.Employee, "employee")
                            .leftJoinAndSelect("employee.specializations", "specialization")
                            .leftJoinAndSelect("employee.departments", "department")
                            .orderBy("employee.id, specialization.id, department.id")
                            .getMany()];
                case 13:
                    loadedEmployees = _a.sent();
                    loadedEmployees[0].should.have.all.keys("id", "name", "salary", "specializations");
                    loadedEmployees[0].should.be.instanceof(Teacher_1.Teacher);
                    loadedEmployees[0].id.should.equal(2);
                    loadedEmployees[0].name.should.equal("Mr. Garrison");
                    loadedEmployees[0].specializations.length.should.equal(2);
                    loadedEmployees[0].specializations[0].name.should.be.equal("Geography");
                    loadedEmployees[0].specializations[1].name.should.be.equal("Economist");
                    loadedEmployees[0].salary.should.equal(2000);
                    loadedEmployees[1].should.have.all.keys("id", "name", "salary", "departments");
                    loadedEmployees[1].should.be.instanceof(Accountant_1.Accountant);
                    loadedEmployees[1].id.should.equal(3);
                    loadedEmployees[1].name.should.equal("Mr. Burns");
                    loadedEmployees[1].departments.length.should.equal(2);
                    loadedEmployees[1].departments[0].name.should.be.equal("Bookkeeping");
                    loadedEmployees[1].departments[1].name.should.be.equal("HR");
                    loadedEmployees[1].salary.should.equal(3000);
                    return [4 /*yield*/, connection.manager
                            .createQueryBuilder(Person_1.Person, "person")
                            .leftJoinAndSelect("person.faculties", "faculty")
                            .leftJoinAndSelect("person.specializations", "specialization")
                            .leftJoinAndSelect("person.departments", "department")
                            .orderBy("person.id, specialization.id, department.id, faculty.id")
                            .getMany()];
                case 14:
                    loadedPersons = _a.sent();
                    loadedPersons[0].should.have.all.keys("id", "name", "faculties");
                    loadedPersons[0].should.be.instanceof(Student_1.Student);
                    loadedPersons[0].id.should.equal(1);
                    loadedPersons[0].name.should.equal("Alice");
                    loadedPersons[0].faculties.length.should.equal(2);
                    loadedPersons[0].faculties[0].name.should.be.equal("Economics");
                    loadedPersons[0].faculties[1].name.should.be.equal("Programming");
                    loadedPersons[1].should.have.all.keys("id", "name", "salary", "specializations");
                    loadedPersons[1].should.be.instanceof(Teacher_1.Teacher);
                    loadedPersons[1].id.should.equal(2);
                    loadedPersons[1].name.should.equal("Mr. Garrison");
                    loadedPersons[1].specializations.length.should.equal(2);
                    loadedPersons[1].specializations[0].name.should.be.equal("Geography");
                    loadedPersons[1].specializations[1].name.should.be.equal("Economist");
                    loadedPersons[1].salary.should.equal(2000);
                    loadedPersons[2].should.have.all.keys("id", "name", "salary", "departments");
                    loadedPersons[2].should.be.instanceof(Accountant_1.Accountant);
                    loadedPersons[2].id.should.equal(3);
                    loadedPersons[2].name.should.equal("Mr. Burns");
                    loadedPersons[2].departments.length.should.equal(2);
                    loadedPersons[2].departments[0].name.should.be.equal("Bookkeeping");
                    loadedPersons[2].departments[1].name.should.be.equal("HR");
                    loadedPersons[2].salary.should.equal(3000);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=one-to-many.js.map