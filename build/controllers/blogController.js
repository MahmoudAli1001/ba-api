"use strict";
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
exports.BlogController = void 0;
const blogService_1 = __importDefault(require("../services/blogService"));
class BlogController {
    createBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBlogDto = req.body;
                const result = yield blogService_1.default.createBlog(createBlogDto);
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.query;
                const result = yield blogService_1.default.getBlogs(Number(page) || 1, Number(limit) || 10);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getBlogById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield blogService_1.default.getBlogById(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateBlogDto = req.body;
                const result = yield blogService_1.default.updateBlog(id, updateBlogDto);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield blogService_1.default.deleteBlog(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BlogController = BlogController;
exports.default = new BlogController();
