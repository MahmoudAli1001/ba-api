"use strict";
// src/validators/postValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsQuerySchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
    content: zod_1.z.string().min(1, 'Content is required'),
    image: zod_1.z.string().url('Invalid image URL').optional(),
});
exports.updatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional(),
    image: zod_1.z.string().url('Invalid image URL').optional(),
});
exports.getPostsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
