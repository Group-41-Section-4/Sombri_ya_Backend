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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var index_1 = require("../../src/index");
var PostDetails_1 = require("../../sample/sample2-one-to-one/entity/PostDetails");
var Post_1 = require("../../sample/sample2-one-to-one/entity/Post");
var PostCategory_1 = require("../../sample/sample2-one-to-one/entity/PostCategory");
var PostAuthor_1 = require("../../sample/sample2-one-to-one/entity/PostAuthor");
var PostMetadata_1 = require("../../sample/sample2-one-to-one/entity/PostMetadata");
var PostImage_1 = require("../../sample/sample2-one-to-one/entity/PostImage");
var PostInformation_1 = require("../../sample/sample2-one-to-one/entity/PostInformation");
var test_utils_1 = require("../utils/test-utils");
describe("one-to-one", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    var connection;
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.createConnection(test_utils_1.setupSingleTestingConnection("mysql", {
                            entities: [Post_1.Post, PostDetails_1.PostDetails, PostCategory_1.PostCategory, PostMetadata_1.PostMetadata, PostImage_1.PostImage, PostInformation_1.PostInformation, PostAuthor_1.PostAuthor],
                        }))];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () { return connection.close(); });
    // clean up database before each test
    function reloadDatabase() {
        return connection.synchronize(true);
    }
    var postRepository, postDetailsRepository, postCategoryRepository, postImageRepository, postMetadataRepository;
    before(function () {
        postRepository = connection.getRepository(Post_1.Post);
        postDetailsRepository = connection.getRepository(PostDetails_1.PostDetails);
        postCategoryRepository = connection.getRepository(PostCategory_1.PostCategory);
        postImageRepository = connection.getRepository(PostImage_1.PostImage);
        postMetadataRepository = connection.getRepository(PostMetadata_1.PostMetadata);
    });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("insert post and details (has inverse relation + full cascade options)", function () {
        var newPost, details, savedPost;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository.save(newPost).then(function (post) { return savedPost = post; });
        });
        it("should return the same post instance after its created", function () {
            savedPost.should.be.equal(newPost);
        });
        it("should return the same post details instance after its created", function () {
            savedPost.details.should.be.equal(newPost.details);
        });
        it("should have a new generated id after post is created", function () {
            chai_1.expect(savedPost.id).not.to.be.empty;
            chai_1.expect(savedPost.details.id).not.to.be.empty;
        });
        it("should have inserted post in the database", function () {
            var expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository.findOne(savedPost.id).should.eventually.eql(expectedPost);
        });
        it("should have inserted post details in the database", function () {
            return __awaiter(this, void 0, void 0, function () {
                var expectedDetails, loadedPostDetails;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expectedDetails = new PostDetails_1.PostDetails();
                            expectedDetails.id = savedPost.details.id;
                            expectedDetails.authorName = savedPost.details.authorName;
                            expectedDetails.comment = savedPost.details.comment;
                            expectedDetails.metadata = savedPost.details.metadata;
                            return [4 /*yield*/, postDetailsRepository.findOne(savedPost.details.id)];
                        case 1:
                            loadedPostDetails = _a.sent();
                            loadedPostDetails.should.be.eql(expectedDetails);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should load post and its details if left join used", function () {
            return __awaiter(this, void 0, void 0, function () {
                var expectedPost, post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expectedPost = new Post_1.Post();
                            expectedPost.id = savedPost.id;
                            expectedPost.text = savedPost.text;
                            expectedPost.title = savedPost.title;
                            expectedPost.details = new PostDetails_1.PostDetails();
                            expectedPost.details.id = savedPost.details.id;
                            expectedPost.details.authorName = savedPost.details.authorName;
                            expectedPost.details.comment = savedPost.details.comment;
                            expectedPost.details.metadata = savedPost.details.metadata;
                            return [4 /*yield*/, postRepository
                                    .createQueryBuilder("post")
                                    .leftJoinAndSelect("post.details", "details")
                                    .where("post.id=:id")
                                    .setParameter("id", savedPost.id)
                                    .getOne()];
                        case 1:
                            post = _a.sent();
                            chai_1.expect(post).not.to.be.empty;
                            post.should.eql(expectedPost);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should load details and its post if left join used (from reverse side)", function () {
            var expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedPost.details.id;
            expectedDetails.authorName = savedPost.details.authorName;
            expectedDetails.comment = savedPost.details.comment;
            expectedDetails.metadata = savedPost.details.metadata;
            expectedDetails.post = new Post_1.Post();
            expectedDetails.post.id = savedPost.id;
            expectedDetails.post.text = savedPost.text;
            expectedDetails.post.title = savedPost.title;
            return postDetailsRepository
                .createQueryBuilder("details")
                .leftJoinAndSelect("details.post", "post")
                .where("details.id=:id")
                .setParameter("id", savedPost.id)
                .getOne()
                .should.eventually.eql(expectedDetails);
        });
        it("should load saved post without details if left joins are not specified", function () {
            var expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository
                .createQueryBuilder("post")
                .where("post.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedPost);
        });
        it("should load saved post without details if left joins are not specified", function () {
            var expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedPost.details.id;
            expectedDetails.authorName = savedPost.details.authorName;
            expectedDetails.comment = savedPost.details.comment;
            expectedDetails.metadata = savedPost.details.metadata;
            return postDetailsRepository
                .createQueryBuilder("details")
                .where("details.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedDetails);
        });
    });
    describe("insert post and category (one-side relation)", function () {
        var newPost, category, savedPost;
        before(reloadDatabase);
        before(function () {
            category = new PostCategory_1.PostCategory();
            category.name = "technology";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.category = category;
            return postRepository.save(newPost).then(function (post) { return savedPost = post; });
        });
        it("should return the same post instance after its created", function () {
            savedPost.should.be.equal(newPost);
        });
        it("should return the same post category instance after its created", function () {
            savedPost.category.should.be.equal(newPost.category);
        });
        it("should have a new generated id after post is created", function () {
            chai_1.expect(savedPost.id).not.to.be.empty;
            chai_1.expect(savedPost.category.id).not.to.be.empty;
        });
        it("should have inserted post in the database", function () {
            var expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository.findOne(savedPost.id).should.eventually.eql(expectedPost);
        });
        it("should have inserted category in the database", function () {
            var expectedPost = new PostCategory_1.PostCategory();
            expectedPost.id = savedPost.category.id;
            expectedPost.name = "technology";
            return postCategoryRepository.findOne(savedPost.category.id).should.eventually.eql(expectedPost);
        });
        it("should load post and its category if left join used", function () {
            var expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.title = savedPost.title;
            expectedPost.text = savedPost.text;
            expectedPost.category = new PostCategory_1.PostCategory();
            expectedPost.category.id = savedPost.category.id;
            expectedPost.category.name = savedPost.category.name;
            return postRepository
                .createQueryBuilder("post")
                .leftJoinAndSelect("post.category", "category")
                .where("post.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedPost);
        });
        it("should load details and its post if left join used (from reverse side)", function () {
            // later need to specify with what exception we reject it
            /*return postCategoryRepository
                .createQueryBuilder("category")
                .leftJoinAndSelect("category.post", "post")
                .where("category.id=:id", { id: savedPost.id })
                .getSingleResult()
                .should.be.rejectedWith(Error);*/ // not working, find fix
        });
    });
    describe("cascade updates should not be executed when cascadeUpdate option is not set", function () {
        var newPost, details, savedPost;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository
                .save(newPost)
                .then(function (post) { return savedPost = post; });
        });
        it("should ignore updates in the model and do not update the db when entity is updated", function () {
            newPost.details.comment = "i am updated comment";
            return postRepository.save(newPost).then(function (updatedPost) {
                updatedPost.details.comment.should.be.equal("i am updated comment");
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.details", "details")
                    .where("post.id=:id")
                    .setParameter("id", updatedPost.id)
                    .getOne();
            }).then(function (updatedPostReloaded) {
                updatedPostReloaded.details.comment.should.be.equal("this is post");
            });
        }); // todo: also check that updates throw exception in strict cascades mode
    });
    describe("cascade remove should not be executed when cascadeRemove option is not set", function () {
        var newPost, details, savedPost;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository
                .save(newPost)
                .then(function (post) { return savedPost = post; });
        });
        it("should ignore updates in the model and do not update the db when entity is updated", function () {
            delete newPost.details;
            return postRepository.save(newPost).then(function (updatedPost) {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.details", "details")
                    .where("post.id=:id")
                    .setParameter("id", updatedPost.id)
                    .getOne();
            }).then(function (updatedPostReloaded) {
                updatedPostReloaded.details.comment.should.be.equal("this is post");
            });
        });
    });
    // todo: check why it generates extra query
    describe("cascade updates should be executed when cascadeUpdate option is set", function () {
        var newPost, newImage;
        before(reloadDatabase);
        it("should update a relation successfully when updated", function () {
            newImage = new PostImage_1.PostImage();
            newImage.url = "logo.png";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            return postImageRepository
                .save(newImage)
                .then(function (image) {
                newPost.image = image;
                return postRepository.save(newPost);
            }).then(function (post) {
                newPost = post;
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.image", "image")
                    .where("post.id=:id")
                    .setParameter("id", post.id)
                    .getOne();
            }).then(function (loadedPost) {
                loadedPost.image.url = "new-logo.png";
                return postRepository.save(loadedPost);
            }).then(function () {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.image", "image")
                    .where("post.id=:id")
                    .setParameter("id", newPost.id)
                    .getOne();
            }).then(function (reloadedPost) {
                reloadedPost.image.url.should.be.equal("new-logo.png");
            });
        });
    });
    describe("cascade remove should be executed when cascadeRemove option is set", function () {
        var newPost, newMetadata;
        before(reloadDatabase);
        it("should remove a relation entity successfully when removed", function () {
            newMetadata = new PostMetadata_1.PostMetadata();
            newMetadata.description = "this is post metadata";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            return postMetadataRepository
                .save(newMetadata)
                .then(function (metadata) {
                newPost.metadata = metadata;
                return postRepository.save(newPost);
            }).then(function (post) {
                newPost = post;
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.metadata", "metadata")
                    .where("post.id=:id")
                    .setParameter("id", post.id)
                    .getOne();
            }).then(function (loadedPost) {
                loadedPost.metadata = null;
                return postRepository.save(loadedPost);
            }).then(function () {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.metadata", "metadata")
                    .where("post.id=:id")
                    .setParameter("id", newPost.id)
                    .getOne();
            }).then(function (reloadedPost) {
                chai_1.expect(reloadedPost.metadata).to.not.exist;
            });
        });
    });
});
//# sourceMappingURL=sample2-one-to-one.js.map