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
var Post_1 = require("./entity/Post");
var Author_1 = require("./entity/Author");
var PostRepository_1 = require("./repository/PostRepository");
var AuthorRepository_1 = require("./repository/AuthorRepository");
var UserRepository_1 = require("./repository/UserRepository");
var User_1 = require("./entity/User");
var options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    logging: ["query", "error"],
    entities: [Post_1.Post, Author_1.Author, User_1.User],
};
index_1.createConnection(options).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var author, loadedAuthor, post, loadedPost, userRepository, loadedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection
                    .getCustomRepository(AuthorRepository_1.AuthorRepository)
                    .createAndSave("Umed", "Khudoiberdiev")];
            case 1:
                author = _a.sent();
                console.log("Author saved: ", author);
                return [4 /*yield*/, connection
                        .getCustomRepository(AuthorRepository_1.AuthorRepository)
                        .findMyAuthor()];
            case 2:
                loadedAuthor = _a.sent();
                console.log("Author loaded: ", loadedAuthor);
                post = connection
                    .getCustomRepository(PostRepository_1.PostRepository)
                    .create();
                post.title = "Hello Repositories!";
                return [4 /*yield*/, connection
                        .manager
                        .getCustomRepository(PostRepository_1.PostRepository)
                        .save(post)];
            case 3:
                _a.sent();
                return [4 /*yield*/, connection
                        .manager
                        .getCustomRepository(PostRepository_1.PostRepository)
                        .findMyPost()];
            case 4:
                loadedPost = _a.sent();
                console.log("Post persisted! Loaded post: ", loadedPost);
                userRepository = connection.manager.getCustomRepository(UserRepository_1.UserRepository);
                return [4 /*yield*/, userRepository.createAndSave("Umed", "Khudoiberdiev")];
            case 5:
                _a.sent();
                return [4 /*yield*/, userRepository.findByName("Umed", "Khudoiberdiev")];
            case 6:
                loadedUser = _a.sent();
                console.log("User loaded: ", loadedUser);
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log("Error: ", error); });
//# sourceMappingURL=app.js.map