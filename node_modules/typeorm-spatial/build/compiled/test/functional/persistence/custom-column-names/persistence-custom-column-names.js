"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var CategoryMetadata_1 = require("./entity/CategoryMetadata");
var test_utils_1 = require("../../../utils/test-utils");
describe("persistence > custom-column-names", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    var connection;
    before(test_utils_1.setupConnection(function (con) { return connection = con; }, [Post_1.Post, Category_1.Category, CategoryMetadata_1.CategoryMetadata]));
    after(function () { return connection.close(); });
    // clean up database before each test
    function reloadDatabase() {
        return connection
            .synchronize(true)
            .catch(function (e) {
            console.log("Error during schema re-creation: ", e);
            throw e;
        });
    }
    var postRepository;
    var categoryRepository;
    var metadataRepository;
    before(function () {
        postRepository = connection.getRepository(Post_1.Post);
        categoryRepository = connection.getRepository(Category_1.Category);
        metadataRepository = connection.getRepository(CategoryMetadata_1.CategoryMetadata);
    });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("attach exist entity to exist entity with many-to-one relation", function () {
        var newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // attach category to post and save it
        before(function () {
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne(1, { join: { alias: "post", leftJoinAndSelect: { category: "post.category" } } })
                .then(function (post) { return loadedPost = post; });
        });
        it("should contain attached category", function () {
            chai_1.expect(loadedPost).not.to.be.empty;
            chai_1.expect(loadedPost.category).not.to.be.empty;
            chai_1.expect(loadedPost.categoryId).not.to.be.empty;
        });
    });
    describe("attach new entity to exist entity with many-to-one relation", function () {
        var newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new post and attach category
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne(1, { join: { alias: "post", leftJoinAndSelect: { category: "post.category" } } })
                .then(function (post) { return loadedPost = post; });
        });
        it("should contain attached category", function () {
            chai_1.expect(loadedPost).not.to.be.empty;
            chai_1.expect(loadedPost.category).not.to.be.empty;
            chai_1.expect(loadedPost.categoryId).not.to.be.empty;
        });
    });
    describe("attach new entity to new entity with many-to-one relation", function () {
        var newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category, post and attach category to post
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            newPost = postRepository.create();
            newPost.title = "All about animals";
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne(1, { join: { alias: "post", leftJoinAndSelect: { category: "post.category" } } })
                .then(function (post) { return loadedPost = post; });
        });
        it("should contain attached category", function () {
            chai_1.expect(loadedPost).not.to.be.empty;
            chai_1.expect(loadedPost.category).not.to.be.empty;
            chai_1.expect(loadedPost.categoryId).not.to.be.empty;
        });
    });
    describe("attach exist entity to exist entity with one-to-one relation", function () {
        var newPost, newCategory, newMetadata, loadedPost;
        before(reloadDatabase);
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new metadata
        before(function () {
            newMetadata = metadataRepository.create();
            newMetadata.keyword = "animals";
            return metadataRepository.save(newMetadata);
        });
        // attach metadata to category and category to post and save it
        before(function () {
            newCategory.metadata = newMetadata;
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne(1, { join: { alias: "post", leftJoinAndSelect: { category: "post.category", metadata: "category.metadata" } } })
                .then(function (post) { return loadedPost = post; });
        });
        it("should contain attached category and metadata in the category", function () {
            chai_1.expect(loadedPost).not.to.be.empty;
            chai_1.expect(loadedPost.category).not.to.be.empty;
            chai_1.expect(loadedPost.categoryId).not.to.be.empty;
            chai_1.expect(loadedPost.category.metadata).not.to.be.empty;
            chai_1.expect(loadedPost.category.metadataId).not.to.be.empty;
        });
    });
    describe("attach new entity to exist entity with one-to-one relation", function () {
        var newPost, newCategory, newMetadata, loadedPost;
        before(reloadDatabase);
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // save a new category and new metadata
        before(function () {
            newMetadata = metadataRepository.create();
            newMetadata.keyword = "animals";
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            newCategory.metadata = newMetadata;
            return categoryRepository.save(newCategory);
        });
        // attach metadata to category and category to post and save it
        before(function () {
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne(1, { join: { alias: "post", leftJoinAndSelect: { category: "post.category", metadata: "category.metadata" } } })
                .then(function (post) { return loadedPost = post; });
        });
        it("should contain attached category and metadata in the category", function () {
            chai_1.expect(loadedPost).not.to.be.empty;
            chai_1.expect(loadedPost.category).not.to.be.empty;
            chai_1.expect(loadedPost.categoryId).not.to.be.empty;
            chai_1.expect(loadedPost.category.metadata).not.to.be.empty;
            chai_1.expect(loadedPost.category.metadataId).not.to.be.empty;
        });
    });
});
//# sourceMappingURL=persistence-custom-column-names.js.map