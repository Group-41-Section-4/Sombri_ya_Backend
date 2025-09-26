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
var Category_1 = require("./entity/Category");
var options = {
    type: "sqlite",
    database: "temp/sqlitedb.db",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, Category_1.Category]
};
index_1.createConnection(options).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var postRepository, post1, post2, post3, post4, allPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postRepository = connection.getRepository(Post_1.Post);
                post1 = new Post_1.Post("Me", "hello me", [
                    new Category_1.Category("programming"),
                    new Category_1.Category("family"),
                    new Category_1.Category("chocolate"),
                ]);
                post2 = new Post_1.Post("Zorro", "hello zorro", [
                    new Category_1.Category("woman"),
                    new Category_1.Category("money"),
                    new Category_1.Category("weapon"),
                ]);
                post3 = new Post_1.Post("About earth", "hello earth", [
                    new Category_1.Category("kids"),
                    new Category_1.Category("people"),
                    new Category_1.Category("animals"),
                ]);
                post4 = new Post_1.Post("Zorro", "hello zorro", [
                    new Category_1.Category("woman"),
                    new Category_1.Category("money"),
                    new Category_1.Category("weapon"),
                ]);
                console.log("saving posts");
                return [4 /*yield*/, postRepository.save([post1, post2, post3, post4])];
            case 1:
                _a.sent();
                console.log("loading the post. pay attention on order: ");
                return [4 /*yield*/, postRepository.find()];
            case 2:
                allPosts = _a.sent();
                console.log(allPosts);
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log("Error: ", error); });
//# sourceMappingURL=app.js.map