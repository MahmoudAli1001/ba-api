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
const client_s3_1 = require("@aws-sdk/client-s3");
const sharp_1 = __importDefault(require("sharp"));
const environment_1 = require("../config/environment");
const appError_1 = __importDefault(require("./appError"));
const s3Config_1 = __importDefault(require("../config/s3Config"));
const removeExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, "");
};
const sanitizeImageName = (filename) => {
    return removeExtension(filename.replace(/[^a-zA-Z0-9.-]/g, "_"));
};
const convertToWebP = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, sharp_1.default)(buffer).webp({ quality: 80 }).toBuffer();
});
const validateWebP = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = yield (0, sharp_1.default)(buffer).metadata();
    return metadata.format === "webp";
});
const uploadToS3 = (file_1, ...args_1) => __awaiter(void 0, [file_1, ...args_1], void 0, function* (file, s3Path = "") {
    if (!file.buffer || !file.originalname || !file.mimetype) {
        throw new appError_1.default("Invalid file (type not recognized)", 400);
    }
    if (file.buffer.length > environment_1.config.maxImageSize) {
        throw new appError_1.default(`File size exceeds the limit of ${environment_1.config.maxImageSize / 1024 / 1024} MB`, 400);
    }
    if (s3Path) {
        s3Path = sanitizeImageName(s3Path);
    }
    const sanitizedFilename = sanitizeImageName(file.originalname);
    const key = `${s3Path}${Date.now()}-${sanitizedFilename}.webp`;
    let { buffer, mimetype } = file;
    // Convert to WebP if not already WebP
    if (mimetype !== "image/webp") {
        try {
            buffer = yield convertToWebP(file.buffer);
            mimetype = "image/webp";
            // Validate that the conversion was successful
            const isWebP = yield validateWebP(buffer);
            if (!isWebP) {
                throw new appError_1.default("Failed to convert image to WebP", 500);
            }
        }
        catch (error) {
            console.error("Error converting to WebP:", error);
            throw new Error("Failed to convert image to WebP");
        }
    }
    else {
        console.log("Image is already in WebP format");
    }
    const params = {
        Bucket: environment_1.config.aws.S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
    };
    try {
        const command = new client_s3_1.PutObjectCommand(params);
        const s3Response = yield s3Config_1.default.send(command);
        return {
            ETag: s3Response.ETag,
            Location: `https://${environment_1.config.aws.S3_BUCKET_NAME}.s3.${environment_1.config.aws.REGION}.amazonaws.com/${key}`,
            Key: key,
            Bucket: environment_1.config.aws.S3_BUCKET_NAME,
            mimetype: mimetype,
            size: buffer.length,
        };
    }
    catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error(`Failed to upload file with error: ${error}`);
    }
});
exports.default = uploadToS3;
