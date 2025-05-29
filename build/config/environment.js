"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/business-arabic",
    jwtSecret: process.env.JWT_SECRET || "",
    maxImageSize: 5 * 1024 * 1024,
    aws: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
        REGION: process.env.AWS_REGION || "",
        S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
    },
};
