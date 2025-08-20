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
exports.BlogService = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const appError_1 = __importDefault(require("../utils/appError"));
class BlogService {
    createBlog(createBlogDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = new Blog_1.default(createBlogDto);
            yield newBlog.save();
            return this.createBlogResponse(newBlog);
        });
    }
    getBlogs(page, limit, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            // Handle keyword filtering
            if (keyword && typeof keyword === "string" && keyword.trim() !== "") {
                const regex = new RegExp(keyword, "i");
                filter.$or = [
                    { title: { $regex: regex } },
                    { summary: { $regex: regex } },
                    { "content.content.text": { $regex: regex } },
                ];
            }
            const total = yield Blog_1.default.countDocuments(filter);
            const blogs = yield Blog_1.default.find(filter)
                .sort({ time: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                blogs: blogs.map(this.createBlogResponse),
                total,
                page,
                limit,
            };
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield Blog_1.default.findById(id);
            if (!blog) {
                throw new appError_1.default("Blog not found", 400);
            }
            return this.createBlogResponse(blog);
        });
    }
    updateBlog(id, updateBlogDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield Blog_1.default.findByIdAndUpdate(id, updateBlogDto, { new: true });
            if (!blog) {
                throw new appError_1.default("Blog not found", 400);
            }
            return this.createBlogResponse(blog);
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Blog_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new appError_1.default("Blog not found", 400);
            }
        });
    }
    createBlogResponse(blog) {
        return {
            id: blog._id.toString(),
            title: blog.title,
            summary: blog.summary,
            content: blog.content,
            image: blog.image,
        };
    }
}
exports.BlogService = BlogService;
exports.default = new BlogService();
