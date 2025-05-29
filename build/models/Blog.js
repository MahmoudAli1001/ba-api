"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Blog.ts
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: [
        {
            type: Map,
            of: mongoose_1.default.Schema.Types.Mixed,
        },
    ],
    image: { type: String, required: false },
}, { timestamps: true });
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.default = Blog;
