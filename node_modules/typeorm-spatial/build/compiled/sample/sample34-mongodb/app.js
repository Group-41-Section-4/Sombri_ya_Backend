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
var options = {
    type: "mongodb",
    host: "localhost",
    database: "test",
    logging: ["query", "error"],
    // synchronize: true,
    entities: [Post_1.Post]
};
index_1.createConnection(options).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var post, loadedPost, allPosts, cursor1, _a, _b, _c, _d, _e, _f, cursor2, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                post = new Post_1.Post();
                post.text = "Hello how are you?";
                post.title = "hello";
                post.likesCount = 100;
                return [4 /*yield*/, connection.getRepository(Post_1.Post).save(post)];
            case 1:
                _k.sent();
                console.log("Post has been saved: ", post);
                return [4 /*yield*/, connection.getRepository(Post_1.Post).findOne({
                        text: "Hello how are you?",
                    })];
            case 2:
                loadedPost = _k.sent();
                console.log("Post has been loaded: ", loadedPost);
                return [4 /*yield*/, connection.getRepository(Post_1.Post).find({ take: 5 })];
            case 3:
                allPosts = _k.sent();
                console.log("All posts: ", allPosts);
                cursor1 = connection.getMongoRepository(Post_1.Post).createEntityCursor({ title: "hello" });
                _b = (_a = console).log;
                _c = ["Post retrieved via cursor #1: "];
                return [4 /*yield*/, cursor1.next()];
            case 4:
                _b.apply(_a, _c.concat([_k.sent()]));
                _e = (_d = console).log;
                _f = ["Post retrieved via cursor #2: "];
                return [4 /*yield*/, cursor1.next()];
            case 5:
                _e.apply(_d, _f.concat([_k.sent()]));
                cursor2 = connection.mongoManager.createEntityCursor(Post_1.Post, { title: "hello" });
                _h = (_g = console).log;
                _j = ["Only two posts retrieved via cursor: "];
                return [4 /*yield*/, cursor2.limit(2).toArray()];
            case 6:
                _h.apply(_g, _j.concat([_k.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (error) { return console.log("Error: ", error); });
//# sourceMappingURL=app.js.map