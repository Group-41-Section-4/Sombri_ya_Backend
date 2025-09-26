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
var PostWithoutTypes_1 = require("./entity/PostWithoutTypes");
describe("database schema > column types > sqlite", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["sqlite"],
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
                    post.integer = 2147483647;
                    post.int = 2147483647;
                    post.int2 = 32767;
                    post.int8 = 8223372036854775807;
                    post.tinyint = 127;
                    post.smallint = 32767;
                    post.mediumint = 8388607;
                    post.bigint = 8223372036854775807;
                    post.unsignedBigInt = 8223372036854775807;
                    post.character = "A";
                    post.varchar = "This is varchar";
                    post.varyingCharacter = "This is varying character";
                    post.nchar = "This is nchar";
                    post.nativeCharacter = "This is native character";
                    post.nvarchar = "This is nvarchar";
                    post.blob = new Buffer("This is blob");
                    post.clob = "This is clob";
                    post.text = "This is text";
                    post.real = 10.5;
                    post.double = 10.1234;
                    post.doublePrecision = 10.1234;
                    post.float = 10.53;
                    post.numeric = 10;
                    post.decimal = 50;
                    post.boolean = true;
                    post.date = "2017-06-21";
                    post.datetime = new Date();
                    post.datetime.setMilliseconds(0);
                    post.simpleArray = ["A", "B", "C"];
                    post.simpleJson = { param: "VALUE" };
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.name.should.be.equal(post.name);
                    loadedPost.int.should.be.equal(post.int);
                    loadedPost.int2.should.be.equal(post.int2);
                    loadedPost.int8.should.be.equal(post.int8);
                    loadedPost.tinyint.should.be.equal(post.tinyint);
                    loadedPost.smallint.should.be.equal(post.smallint);
                    loadedPost.mediumint.should.be.equal(post.mediumint);
                    loadedPost.bigint.should.be.equal(post.bigint);
                    loadedPost.unsignedBigInt.should.be.equal(post.unsignedBigInt);
                    loadedPost.character.should.be.equal(post.character);
                    loadedPost.varchar.should.be.equal(post.varchar);
                    loadedPost.varyingCharacter.should.be.equal(post.varyingCharacter);
                    loadedPost.nchar.should.be.equal(post.nchar);
                    loadedPost.nativeCharacter.should.be.equal(post.nativeCharacter);
                    loadedPost.nvarchar.should.be.equal(post.nvarchar);
                    loadedPost.text.should.be.equal(post.text);
                    loadedPost.blob.toString().should.be.equal(post.blob.toString());
                    loadedPost.clob.should.be.equal(post.clob);
                    loadedPost.real.should.be.equal(post.real);
                    loadedPost.double.should.be.equal(post.double);
                    loadedPost.doublePrecision.should.be.equal(post.doublePrecision);
                    loadedPost.float.should.be.equal(post.float);
                    loadedPost.numeric.should.be.equal(post.numeric);
                    loadedPost.decimal.should.be.equal(post.decimal);
                    loadedPost.date.should.be.equal(post.date);
                    loadedPost.boolean.should.be.equal(post.boolean);
                    loadedPost.date.should.be.equal(post.date);
                    loadedPost.datetime.valueOf().should.be.equal(post.datetime.valueOf());
                    loadedPost.simpleArray[0].should.be.equal(post.simpleArray[0]);
                    loadedPost.simpleArray[1].should.be.equal(post.simpleArray[1]);
                    loadedPost.simpleArray[2].should.be.equal(post.simpleArray[2]);
                    loadedPost.simpleJson.param.should.be.equal(post.simpleJson.param);
                    table.findColumnByName("id").type.should.be.equal("integer");
                    table.findColumnByName("name").type.should.be.equal("varchar");
                    table.findColumnByName("int").type.should.be.equal("integer");
                    table.findColumnByName("int2").type.should.be.equal("int2");
                    table.findColumnByName("int8").type.should.be.equal("int8");
                    table.findColumnByName("tinyint").type.should.be.equal("tinyint");
                    table.findColumnByName("smallint").type.should.be.equal("smallint");
                    table.findColumnByName("mediumint").type.should.be.equal("mediumint");
                    table.findColumnByName("bigint").type.should.be.equal("bigint");
                    table.findColumnByName("unsignedBigInt").type.should.be.equal("unsigned big int");
                    table.findColumnByName("character").type.should.be.equal("character");
                    table.findColumnByName("varchar").type.should.be.equal("varchar");
                    table.findColumnByName("varyingCharacter").type.should.be.equal("varying character");
                    table.findColumnByName("nchar").type.should.be.equal("nchar");
                    table.findColumnByName("nativeCharacter").type.should.be.equal("native character");
                    table.findColumnByName("nvarchar").type.should.be.equal("nvarchar");
                    table.findColumnByName("text").type.should.be.equal("text");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("clob").type.should.be.equal("clob");
                    table.findColumnByName("real").type.should.be.equal("real");
                    table.findColumnByName("double").type.should.be.equal("double");
                    table.findColumnByName("doublePrecision").type.should.be.equal("double precision");
                    table.findColumnByName("float").type.should.be.equal("float");
                    table.findColumnByName("numeric").type.should.be.equal("numeric");
                    table.findColumnByName("decimal").type.should.be.equal("decimal");
                    table.findColumnByName("boolean").type.should.be.equal("boolean");
                    table.findColumnByName("date").type.should.be.equal("date");
                    table.findColumnByName("datetime").type.should.be.equal("datetime");
                    table.findColumnByName("simpleArray").type.should.be.equal("text");
                    table.findColumnByName("simpleJson").type.should.be.equal("text");
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
                    post.blob = new Buffer("A");
                    post.datetime = new Date();
                    post.datetime.setMilliseconds(0);
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
                    loadedPost.datetime.valueOf().should.be.equal(post.datetime.valueOf());
                    table.findColumnByName("id").type.should.be.equal("integer");
                    table.findColumnByName("name").type.should.be.equal("varchar");
                    table.findColumnByName("boolean").type.should.be.equal("boolean");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("datetime").type.should.be.equal("datetime");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=column-types-sqlite.js.map