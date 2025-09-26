"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
var ConnectionManager_1 = require("../../../src/connection/ConnectionManager");
var MysqlDriver_1 = require("../../../src/driver/mysql/MysqlDriver");
var PrimaryGeneratedColumn_1 = require("../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../src/decorator/columns/Column");
var Entity_1 = require("../../../src/decorator/entity/Entity");
describe("ConnectionManager", function () {
    var Post = /** @class */ (function () {
        function Post(id, title) {
            this.id = id;
            this.title = title;
        }
        __decorate([
            PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
            __metadata("design:type", Number)
        ], Post.prototype, "id", void 0);
        __decorate([
            Column_1.Column(),
            __metadata("design:type", String)
        ], Post.prototype, "title", void 0);
        Post = __decorate([
            Entity_1.Entity(),
            __metadata("design:paramtypes", [Number, String])
        ], Post);
        return Post;
    }());
    describe("create", function () {
        it("should create a mysql connection when mysql driver is specified", function () {
            var options = test_utils_1.setupSingleTestingConnection("mysql", {
                name: "default",
                entities: []
            });
            var connectionManager = new ConnectionManager_1.ConnectionManager();
            var connection = connectionManager.create(options);
            connection.name.should.be.equal("default");
            connection.driver.should.be.instanceOf(MysqlDriver_1.MysqlDriver);
            connection.isConnected.should.be.false;
        });
        /* it("should create a postgres connection when postgres driver is specified", () => {
             const options: ConnectionOptions = {
                 name: "myPostgresConnection",
                 driver: createTestingConnectionOptions("postgres")
             };
             const connectionManager = new ConnectionManager();
             const connection = connectionManager.create(options);
             connection.name.should.be.equal("myPostgresConnection");
             connection.driver.should.be.instanceOf(PostgresDriver);
             connection.isConnected.should.be.false;
         });*/
    });
    /*describe("createAndConnect", function() {

        it("should create a mysql connection when mysql driver is specified AND connect to it", async () => {
            const options: ConnectionOptions = setupSingleTestingConnection("mysql", {
                name: "default",
                entities: []
            });
            const connectionManager = new ConnectionManager();
            const connection = await connectionManager.createAndConnect(options);
            connection.name.should.be.equal("default");
            connection.driver.should.be.instanceOf(MysqlDriver);
            connection.isConnected.should.be.true;
            await connection.close();
        });

    /!*    it("should create a postgres connection when postgres driver is specified AND connect to it", async () => {
            const options: ConnectionOptions = {
                name: "myPostgresConnection",
                driver: createTestingConnectionOptions("postgres")
            };
            const connectionManager = new ConnectionManager();
            const connection = await connectionManager.createAndConnect(options);
            connection.name.should.be.equal("myPostgresConnection");
            connection.driver.should.be.instanceOf(PostgresDriver);
            connection.isConnected.should.be.true;
            await connection.close();
        });*!/

    });*/
    describe("get", function () {
        it("should give connection with a requested name", function () {
            var options = test_utils_1.setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                entities: []
            });
            var connectionManager = new ConnectionManager_1.ConnectionManager();
            var connection = connectionManager.create(options);
            connection.driver.should.be.instanceOf(MysqlDriver_1.MysqlDriver);
            connectionManager.get("myMysqlConnection").should.be.equal(connection);
        });
        it("should throw an error if connection with the given name was not found", function () {
            var options = test_utils_1.setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                entities: []
            });
            var connectionManager = new ConnectionManager_1.ConnectionManager();
            var connection = connectionManager.create(options);
            connection.driver.should.be.instanceOf(MysqlDriver_1.MysqlDriver);
            chai_1.expect(function () { return connectionManager.get("myPostgresConnection"); }).to.throw(Error);
        });
    });
    describe("create connection options", function () {
        var _this = this;
        it("should not drop the database if dropSchema was not specified", function () { return __awaiter(_this, void 0, void 0, function () {
            var options, connectionManager, connection, post, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = test_utils_1.setupSingleTestingConnection("mysql", {
                            name: "myMysqlConnection",
                            schemaCreate: true,
                            entities: [Post]
                        });
                        connectionManager = new ConnectionManager_1.ConnectionManager();
                        return [4 /*yield*/, connectionManager.create(options).connect()];
                    case 1:
                        connection = _a.sent();
                        post = new Post(1, "Hello post");
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connectionManager.create(options).connect()];
                    case 4:
                        // recreate connection and find previously saved post
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(Post, 1)];
                    case 5:
                        loadedPost = (_a.sent());
                        loadedPost.should.be.instanceof(Post);
                        loadedPost.should.be.eql({ id: 1, title: "Hello post" });
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should drop the database if dropSchema was set to true (mysql)", function () { return __awaiter(_this, void 0, void 0, function () {
            var options, connectionManager, connection, post, loadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = test_utils_1.setupSingleTestingConnection("mysql", {
                            name: "myMysqlConnection",
                            schemaCreate: true,
                            dropSchema: true,
                            entities: [Post]
                        });
                        connectionManager = new ConnectionManager_1.ConnectionManager();
                        return [4 /*yield*/, connectionManager.create(options).connect()];
                    case 1:
                        connection = _a.sent();
                        post = new Post(1, "Hello post");
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connectionManager.create(options).connect()];
                    case 4:
                        // recreate connection and find previously saved post
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(Post, 1)];
                    case 5:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost).to.be.undefined;
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        /*   it("should drop the database if dropSchema was set to true (postgres)", async () => {
               const options: ConnectionOptions = {
                   dropSchema: true,
                   synchronize: true,
                   driver: createTestingConnectionOptions("postgres"),
                   entities: [Post]
               };
               const connectionManager = new ConnectionManager();
   
               // create connection, save post and close connection
               let connection = await connectionManager.createAndConnect(options);
               const post = new Post(1, "Hello post");
               await connection.manager.save(post);
               await connection.close();
   
               // recreate connection and find previously saved post
               connection = await connectionManager.createAndConnect(options);
               const loadedPost = await connection.manager.findOne(Post, 1);
               expect(loadedPost).to.be.undefined;
   
               await connection.close();
            });*/
        /*    it("should drop the database if dropSchema was set to true (postgres)", async () => {
                const options: ConnectionOptions = {
                    dropSchema: true,
                    synchronize: true,
                    driver: createTestingConnectionOptions("postgres"),
                    entities: [Post]
                };
                const connectionManager = new ConnectionManager();
    
                // create connection, save post and close connection
                let connection = await connectionManager.createAndConnect(options);
                const post = new Post(1, "Hello post");
                await connection.manager.save(post);
                await connection.close();
    
                // recreate connection and find previously saved post
                connection = await connectionManager.createAndConnect(options);
                const loadedPost = await connection.manager.findOne(Post, 1);
                expect(loadedPost).to.be.undefined;
                await connection.close();
             });*/
    });
});
//# sourceMappingURL=connection-manager.js.map