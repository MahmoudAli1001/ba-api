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
exports.ImageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const environment_1 = require("../config/environment");
const uploadFile_1 = __importDefault(require("../middlewares/uploadFile"));
const appError_1 = __importDefault(require("../utils/appError"));
const s3Config_1 = __importDefault(require("../config/s3Config"));
class ImageService {
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, uploadFile_1.default)(file);
                return result.Location;
            }
            catch (error) {
                console.error("Error uploading image to S3:", error);
                throw new appError_1.default("Failed to upload image", 500);
            }
        });
    }
    deleteImage(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteParams = {
                Bucket: environment_1.config.aws.S3_BUCKET_NAME,
                Key: key,
            };
            try {
                const command = new client_s3_1.DeleteObjectCommand(deleteParams);
                yield s3Config_1.default.send(command);
            }
            catch (error) {
                console.error("Error deleting image from S3:", error);
                throw new appError_1.default("Failed to delete image", 500);
            }
        });
    }
    getImageUrl(key) {
        return `https://${environment_1.config.aws.S3_BUCKET_NAME}.s3.${environment_1.config.aws.REGION}.amazonaws.com/${key}`;
    }
    getKeyFromUrl(url) {
        const baseUrl = `https://${environment_1.config.aws.S3_BUCKET_NAME}.s3.${environment_1.config.aws.REGION}.amazonaws.com/`;
        return url.replace(baseUrl, "");
    }
}
exports.ImageService = ImageService;
exports.default = new ImageService();
