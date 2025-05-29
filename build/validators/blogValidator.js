"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsQuerySchema = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
    summary: zod_1.z.string().min(1, "Summary is required").max(500, "Summary must be 500 characters or less"),
    content: zod_1.z.unknown(),
    image: zod_1.z.string().url("Invalid image URL").optional(),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less").optional(),
    summary: zod_1.z.string().min(1, "Summary is required").max(500, "Summary must be 500 characters or less").optional(),
    content: zod_1.z.unknown(),
    image: zod_1.z.string().url("Invalid image URL").optional(),
});
exports.getBlogsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
