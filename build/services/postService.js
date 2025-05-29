"use strict";
// src/services/postService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const Post_1 = __importDefault(require("../models/Post"));
class PostService {
    createPost(createPostDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, image } = createPostDto;
            const newPost = new Post_1.default({
                title,
                content,
                image,
            });
            yield newPost.save();
            return this.createPostResponse(newPost);
        });
    }
    updatePost(id, updatePostDto, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.findOne({ _id: id, author: authorId });
            if (!post) {
                throw new Error("Post not found or you're not authorized to update it");
            }
            Object.assign(post, updatePostDto);
            yield post.save();
            return this.createPostResponse(post);
        });
    }
    getPosts(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield Post_1.default.countDocuments();
            const posts = yield Post_1.default.find()
                .populate("author", "fullName")
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                posts: posts.map(this.createPostResponse),
                total,
                page,
                limit,
            };
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.findById(id).populate("author", "fullName");
            if (!post) {
                throw new Error("Post not found");
            }
            return this.createPostResponse(post);
        });
    }
    deletePost(id, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Post_1.default.findOneAndDelete({ _id: id, author: authorId });
            if (!result) {
                throw new Error("Post not found or you're not authorized to delete it");
            }
        });
    }
    createPostResponse(post) {
        var _a;
        return {
            id: (_a = post._id) === null || _a === void 0 ? void 0 : _a.toString(),
            title: post.title,
            content: post.content,
            image: post.image,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
}
exports.PostService = PostService;
exports.default = new PostService();
