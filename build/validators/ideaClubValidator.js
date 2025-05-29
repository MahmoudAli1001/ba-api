"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdeaClubQuerySchema = exports.updateIdeaClubSchema = exports.createIdeaClubSchema = void 0;
const zod_1 = require("zod");
exports.createIdeaClubSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(200, 'Name must be 200 characters or less'),
    description: zod_1.z.string().min(1, 'Description is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
});
exports.updateIdeaClubSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(200, 'Name must be 200 characters or less').optional(),
    description: zod_1.z.string().min(1, 'Description is required').optional(),
    category: zod_1.z.string().min(1, 'Category is required').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional(),
});
exports.getIdeaClubQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
