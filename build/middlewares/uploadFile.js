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
const environment_1 = require("../config/environment");
const s3Config_1 = __importDefault(require("../config/s3Config"));
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: environment_1.config.aws.S3_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        const command = new client_s3_1.PutObjectCommand(params);
        const response = yield s3Config_1.default.send(command);
        return {
            ETag: response.ETag,
            Location: `https://${environment_1.config.aws.S3_BUCKET_NAME}.s3.${environment_1.config.aws.REGION}.amazonaws.com/${params.Key}`,
            Key: params.Key,
            Bucket: environment_1.config.aws.S3_BUCKET_NAME,
        };
    }
    catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
});
exports.default = uploadFile;
