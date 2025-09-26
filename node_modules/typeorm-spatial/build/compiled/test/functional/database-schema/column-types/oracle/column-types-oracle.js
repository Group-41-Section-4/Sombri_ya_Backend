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
var Post_1 = require("./entity/Post");
var test_utils_1 = require("../../../../utils/test-utils");
var PostWithOptions_1 = require("./entity/PostWithOptions");
var PostWithoutTypes_1 = require("./entity/PostWithoutTypes");
var DateUtils_1 = require("../../../../../src/util/DateUtils");
describe("database schema > column types > oracle", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["oracle"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("all types should work correctly - persist and hydrate", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, queryRunner, table, post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    post = new Post_1.Post();
                    post.id = 1;
                    post.name = "Post";
                    post.number = 32767;
                    post.numeric = 32767;
                    post.float = 10.53;
                    post.dec = 100;
                    post.decimal = 50;
                    post.int = 2147483647;
                    post.integer = 2147483647;
                    post.smallint = 32767;
                    post.real = 10.5;
                    post.doublePrecision = 15.35;
                    post.char = "A";
                    post.nchar = "A";
                    post.varchar2 = "This is varchar2";
                    post.nvarchar2 = "This is nvarchar2";
                    post.long = "This is long";
                    post.raw = new Buffer("This is raw");
                    post.dateObj = new Date();
                    post.date = "2017-06-21";
                    post.timestamp = new Date();
                    post.timestamp.setMilliseconds(0);
                    post.timestampWithTimeZone = new Date();
                    post.timestampWithTimeZone.setMilliseconds(0);
                    post.timestampWithLocalTimeZone = new Date();
                    post.timestampWithLocalTimeZone.setMilliseconds(0);
                    post.blob = new Buffer("This is blob");
                    post.clob = "This is clob";
                    post.nclob = "This is nclob";
                    post.simpleArray = ["A", "B", "C"];
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.name.should.be.equal(post.name);
                    loadedPost.number.should.be.equal(post.number);
                    loadedPost.numeric.should.be.equal(post.numeric);
                    loadedPost.float.should.be.equal(post.float);
                    loadedPost.dec.should.be.equal(post.dec);
                    loadedPost.decimal.should.be.equal(post.decimal);
                    loadedPost.int.should.be.equal(post.int);
                    loadedPost.integer.should.be.equal(post.integer);
                    loadedPost.smallint.should.be.equal(post.smallint);
                    loadedPost.real.should.be.equal(post.real);
                    loadedPost.doublePrecision.should.be.equal(post.doublePrecision);
                    loadedPost.char.should.be.equal(post.char);
                    loadedPost.nchar.should.be.equal(post.nchar);
                    loadedPost.varchar2.should.be.equal(post.varchar2);
                    loadedPost.nvarchar2.should.be.equal(post.nvarchar2);
                    loadedPost.long.should.be.equal(post.long);
                    loadedPost.raw.should.be.eql(post.raw);
                    loadedPost.dateObj.should.be.equal(DateUtils_1.DateUtils.mixedDateToDateString(post.dateObj));
                    loadedPost.date.should.be.equal(post.date);
                    loadedPost.timestamp.valueOf().should.be.equal(post.timestamp.valueOf());
                    loadedPost.timestampWithTimeZone.valueOf().should.be.equal(post.timestampWithTimeZone.valueOf());
                    loadedPost.timestampWithLocalTimeZone.valueOf().should.be.equal(post.timestampWithLocalTimeZone.valueOf());
                    loadedPost.blob.toString().should.be.equal(post.blob.toString());
                    loadedPost.clob.toString().should.be.equal(post.clob.toString());
                    loadedPost.nclob.toString().should.be.equal(post.nclob.toString());
                    loadedPost.simpleArray[0].should.be.equal(post.simpleArray[0]);
                    loadedPost.simpleArray[1].should.be.equal(post.simpleArray[1]);
                    loadedPost.simpleArray[2].should.be.equal(post.simpleArray[2]);
                    table.findColumnByName("id").type.should.be.equal("number");
                    table.findColumnByName("name").type.should.be.equal("varchar2");
                    table.findColumnByName("number").type.should.be.equal("number");
                    table.findColumnByName("numeric").type.should.be.equal("number");
                    table.findColumnByName("float").type.should.be.equal("float");
                    table.findColumnByName("dec").type.should.be.equal("number");
                    table.findColumnByName("decimal").type.should.be.equal("number");
                    table.findColumnByName("int").type.should.be.equal("number");
                    table.findColumnByName("integer").type.should.be.equal("number");
                    table.findColumnByName("real").type.should.be.equal("float");
                    table.findColumnByName("smallint").type.should.be.equal("number");
                    table.findColumnByName("doublePrecision").type.should.be.equal("float");
                    table.findColumnByName("char").type.should.be.equal("char");
                    table.findColumnByName("nchar").type.should.be.equal("nchar");
                    table.findColumnByName("varchar2").type.should.be.equal("varchar2");
                    table.findColumnByName("nvarchar2").type.should.be.equal("nvarchar2");
                    table.findColumnByName("long").type.should.be.equal("long");
                    table.findColumnByName("raw").type.should.be.equal("raw");
                    table.findColumnByName("date").type.should.be.equal("date");
                    table.findColumnByName("dateObj").type.should.be.equal("date");
                    table.findColumnByName("timestamp").type.should.be.equal("timestamp");
                    table.findColumnByName("timestampWithTimeZone").type.should.be.equal("timestamp with time zone");
                    table.findColumnByName("timestampWithLocalTimeZone").type.should.be.equal("timestamp with local time zone");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("clob").type.should.be.equal("clob");
                    table.findColumnByName("nclob").type.should.be.equal("nclob");
                    table.findColumnByName("simpleArray").type.should.be.equal("clob");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("all types should work correctly - persist and hydrate when options are specified on columns", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, queryRunner, table, post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(PostWithOptions_1.PostWithOptions);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post_with_options")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    post = new PostWithOptions_1.PostWithOptions();
                    post.id = 1;
                    post.number = 50;
                    post.numeric = 50;
                    post.float = 5.25;
                    post.dec = 60;
                    post.decimal = 70;
                    post.char = "AAA";
                    post.nchar = "AAA";
                    post.varchar2 = "This is varchar";
                    post.nvarchar2 = "This is nvarchar";
                    post.raw = new Buffer("This is raw");
                    post.timestamp = new Date();
                    post.timestampWithTimeZone = new Date();
                    post.timestampWithLocalTimeZone = new Date();
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.number.should.be.equal(post.number);
                    loadedPost.numeric.should.be.equal(post.numeric);
                    loadedPost.float.should.be.equal(post.float);
                    loadedPost.dec.should.be.equal(post.dec);
                    loadedPost.decimal.should.be.equal(post.decimal);
                    loadedPost.char.should.be.equal(post.char);
                    loadedPost.nchar.should.be.equal(post.nchar);
                    loadedPost.varchar2.should.be.equal(post.varchar2);
                    loadedPost.nvarchar2.should.be.equal(post.nvarchar2);
                    loadedPost.raw.should.be.eql(post.raw);
                    loadedPost.timestamp.getTime().should.be.equal(post.timestamp.getTime());
                    loadedPost.timestampWithTimeZone.getTime().should.be.equal(post.timestampWithTimeZone.getTime());
                    loadedPost.timestampWithLocalTimeZone.getTime().should.be.equal(post.timestampWithLocalTimeZone.getTime());
                    table.findColumnByName("id").type.should.be.equal("number");
                    table.findColumnByName("number").type.should.be.equal("number");
                    table.findColumnByName("number").precision.should.be.equal(10);
                    table.findColumnByName("number").scale.should.be.equal(5);
                    table.findColumnByName("numeric").type.should.be.equal("number");
                    table.findColumnByName("numeric").precision.should.be.equal(10);
                    table.findColumnByName("numeric").scale.should.be.equal(5);
                    table.findColumnByName("float").type.should.be.equal("float");
                    table.findColumnByName("float").precision.should.be.equal(24);
                    table.findColumnByName("dec").type.should.be.equal("number");
                    table.findColumnByName("dec").precision.should.be.equal(10);
                    table.findColumnByName("dec").scale.should.be.equal(5);
                    table.findColumnByName("decimal").type.should.be.equal("number");
                    table.findColumnByName("decimal").precision.should.be.equal(10);
                    table.findColumnByName("decimal").scale.should.be.equal(5);
                    table.findColumnByName("char").type.should.be.equal("char");
                    table.findColumnByName("char").length.should.be.equal("3");
                    table.findColumnByName("nchar").type.should.be.equal("nchar");
                    table.findColumnByName("nchar").length.should.be.equal("3");
                    table.findColumnByName("varchar2").type.should.be.equal("varchar2");
                    table.findColumnByName("varchar2").length.should.be.equal("50");
                    table.findColumnByName("nvarchar2").type.should.be.equal("nvarchar2");
                    table.findColumnByName("nvarchar2").length.should.be.equal("40");
                    table.findColumnByName("raw").type.should.be.equal("raw");
                    table.findColumnByName("raw").length.should.be.equal("500");
                    table.findColumnByName("timestamp").type.should.be.equal("timestamp");
                    table.findColumnByName("timestamp").precision.should.be.equal(5);
                    table.findColumnByName("timestampWithTimeZone").type.should.be.equal("timestamp with time zone");
                    table.findColumnByName("timestampWithTimeZone").precision.should.be.equal(6);
                    table.findColumnByName("timestampWithLocalTimeZone").type.should.be.equal("timestamp with local time zone");
                    table.findColumnByName("timestampWithLocalTimeZone").precision.should.be.equal(7);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("all types should work correctly - persist and hydrate when types are not specified on columns", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, queryRunner, table, post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(PostWithoutTypes_1.PostWithoutTypes);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post_without_types")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    post = new PostWithoutTypes_1.PostWithoutTypes();
                    post.id = 1;
                    post.name = "Post";
                    post.boolean = true;
                    post.blob = new Buffer("This is blob");
                    post.datetime = new Date();
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.name.should.be.equal(post.name);
                    loadedPost.boolean.should.be.equal(post.boolean);
                    loadedPost.blob.toString().should.be.equal(post.blob.toString());
                    loadedPost.datetime.getTime().should.be.equal(post.datetime.getTime());
                    table.findColumnByName("id").type.should.be.equal("number");
                    table.findColumnByName("name").type.should.be.equal("varchar2");
                    table.findColumnByName("boolean").type.should.be.equal("number");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("datetime").type.should.be.equal("timestamp");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=column-types-oracle.js.map