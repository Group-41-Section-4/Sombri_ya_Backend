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
var chai_1 = require("chai");
var Record_1 = require("./entity/Record");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Question_1 = require("./entity/Question");
describe("uuid-postgres", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should make correct schema with Postgres' uuid type", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var queryRunner, schema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("record")];
                case 1:
                    schema = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    chai_1.expect(schema).not.to.be.empty;
                    chai_1.expect(schema.columns.find(function (tableColumn) { return tableColumn.name === "id" && tableColumn.type === "uuid" && tableColumn.isGenerated; })).to.be.not.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist uuid correctly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var recordRepo, record, persistedRecord, foundRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recordRepo = connection.getRepository(Record_1.Record);
                    record = new Record_1.Record();
                    record.id = "fd357b8f-8838-42f6-b7a2-ae027444e895";
                    return [4 /*yield*/, recordRepo.save(record)];
                case 1:
                    persistedRecord = _a.sent();
                    return [4 /*yield*/, recordRepo.findOne(persistedRecord.id)];
                case 2:
                    foundRecord = _a.sent();
                    chai_1.expect(foundRecord).to.be.exist;
                    chai_1.expect(foundRecord.id).to.eq("fd357b8f-8838-42f6-b7a2-ae027444e895");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should persist uuid correctly when it is generated non primary column", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, questionRepository, queryRunner, postTable, questionTable, post, loadedPost, post2, loadedPost2, question, savedQuestion, loadedQuestion, question2, loadedQuestion2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    questionRepository = connection.getRepository(Question_1.Question);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    postTable = _a.sent();
                    return [4 /*yield*/, queryRunner.getTable("question")];
                case 2:
                    questionTable = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 3:
                    _a.sent();
                    post = new Post_1.Post();
                    return [4 /*yield*/, postRepository.save(post)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 5:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost.uuid).to.be.exist;
                    postTable.findColumnByName("uuid").type.should.be.equal("uuid");
                    post2 = new Post_1.Post();
                    post2.uuid = "fd357b8f-8838-42f6-b7a2-ae027444e895";
                    return [4 /*yield*/, postRepository.save(post2)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(2)];
                case 7:
                    loadedPost2 = _a.sent();
                    chai_1.expect(loadedPost2.uuid).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
                    question = new Question_1.Question();
                    question.uuid2 = "fd357b8f-8838-42f6-b7a2-ae027444e895";
                    return [4 /*yield*/, questionRepository.save(question)];
                case 8:
                    savedQuestion = _a.sent();
                    chai_1.expect(savedQuestion.id).to.be.exist;
                    chai_1.expect(savedQuestion.uuid).to.be.exist;
                    chai_1.expect(savedQuestion.uuid2).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
                    chai_1.expect(savedQuestion.uuid3).to.be.null;
                    chai_1.expect(savedQuestion.uuid4).to.be.exist;
                    return [4 /*yield*/, questionRepository.findOne(savedQuestion.id)];
                case 9:
                    loadedQuestion = _a.sent();
                    chai_1.expect(loadedQuestion.id).to.be.exist;
                    chai_1.expect(loadedQuestion.uuid).to.be.exist;
                    chai_1.expect(loadedQuestion.uuid2).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
                    chai_1.expect(loadedQuestion.uuid3).to.be.null;
                    chai_1.expect(loadedQuestion.uuid4).to.be.exist;
                    questionTable.findColumnByName("id").type.should.be.equal("uuid");
                    questionTable.findColumnByName("uuid").type.should.be.equal("uuid");
                    questionTable.findColumnByName("uuid2").type.should.be.equal("uuid");
                    questionTable.findColumnByName("uuid3").type.should.be.equal("uuid");
                    question2 = new Question_1.Question();
                    question2.id = "1ecad7f6-23ee-453e-bb44-16eca26d5189";
                    question2.uuid = "35b44650-b2cd-44ec-aa54-137fbdf1c373";
                    question2.uuid2 = "fd357b8f-8838-42f6-b7a2-ae027444e895";
                    question2.uuid3 = null;
                    question2.uuid4 = null;
                    return [4 /*yield*/, questionRepository.save(question2)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, questionRepository.findOne("1ecad7f6-23ee-453e-bb44-16eca26d5189")];
                case 11:
                    loadedQuestion2 = _a.sent();
                    chai_1.expect(loadedQuestion2.id).to.equal("1ecad7f6-23ee-453e-bb44-16eca26d5189");
                    chai_1.expect(loadedQuestion2.uuid).to.equal("35b44650-b2cd-44ec-aa54-137fbdf1c373");
                    chai_1.expect(loadedQuestion2.uuid2).to.equal("fd357b8f-8838-42f6-b7a2-ae027444e895");
                    chai_1.expect(loadedQuestion2.uuid3).to.be.null;
                    chai_1.expect(loadedQuestion2.uuid4).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=uuid-postgres.js.map