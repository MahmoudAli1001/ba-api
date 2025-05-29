"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchedProjectsQuerySchema = exports.updateLaunchedProjectSchema = exports.createLaunchedProjectSchema = void 0;
const zod_1 = require("zod");
exports.createLaunchedProjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(200, "Name must be 200 characters or less"),
    description: zod_1.z.string().min(1, "Description is required"),
    category: zod_1.z.string().min(1, 'Category is required'),
    image: zod_1.z.string().url("Invalid image URL").optional(),
    price: zod_1.z.string().min(1, "Price is required"),
});
exports.updateLaunchedProjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(200, "Name must be 200 characters or less").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    category: zod_1.z.string().min(1, 'Category is required').optional(),
    image: zod_1.z.string().url("Invalid image URL").optional(),
    price: zod_1.z.string().min(1, "Price is required").optional(),
});
exports.getLaunchedProjectsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
