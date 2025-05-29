"use strict";
// src/controllers/postController.ts
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
exports.PostController = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const imageService_1 = __importDefault(require("../services/imageService"));
class PostController {
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let createPostDto = req.body;
                const file = req.file;
                let imageUrl;
                if (file) {
                    imageUrl = yield imageService_1.default.uploadImage(file);
                }
                createPostDto.content = JSON.parse(req.body.content);
                const result = yield postService_1.default.createPost(Object.assign(Object.assign({}, createPostDto), { image: imageUrl }));
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatePostDto = req.body;
                const authorId = req.user.id;
                const file = req.file;
                let imageUrl;
                if (file) {
                    imageUrl = yield imageService_1.default.uploadImage(file);
                    // If there's an existing image, delete it
                    const existingPost = yield postService_1.default.getPostById(id);
                    if (existingPost.image) {
                        const oldImageKey = imageService_1.default.getKeyFromUrl(existingPost.image);
                        yield imageService_1.default.deleteImage(oldImageKey);
                    }
                }
                const result = yield postService_1.default.updatePost(id, Object.assign(Object.assign({}, updatePostDto), { image: imageUrl }), authorId);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const authorId = req.user.id;
                const post = yield postService_1.default.getPostById(id);
                if (post.image) {
                    const imageKey = imageService_1.default.getKeyFromUrl(post.image);
                    yield imageService_1.default.deleteImage(imageKey);
                }
                yield postService_1.default.deletePost(id, authorId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.query;
                const result = yield postService_1.default.getPosts(Number(page) || 1, Number(limit) || 10);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield postService_1.default.getPostById(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PostController = PostController;
exports.default = new PostController();
