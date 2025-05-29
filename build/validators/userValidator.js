"use strict";
// src/validators/userValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersQuerySchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    fullName: zod_1.z.string().min(2, 'Full name must be at least 2 characters'),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').optional(),
    fullName: zod_1.z.string().min(2, 'Full name must be at least 2 characters').optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
exports.getUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
