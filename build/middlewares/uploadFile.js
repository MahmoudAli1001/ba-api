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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const environment_1 = require("../config/environment");
// Multer configuration for memory storage
const storage = multer_1.default.memoryStorage();
// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
// Multer middleware configuration
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: environment_1.config.maxImageSize, // 5MB limit
    },
});
// Upload file to Cloudinary function
const uploadFile = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert buffer to base64
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        // Upload options
        const uploadOptions = {
            folder: folder || environment_1.config.cloudinary.FOLDER,
            resource_type: 'auto',
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            transformation: [
                { quality: 'auto:good' },
                { fetch_format: 'auto' }
            ]
        };
        // Upload to Cloudinary
        const result = yield cloudinaryConfig_1.default.uploader.upload(base64String, uploadOptions);
        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
            url: result.url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes
        };
    }
    catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
});
exports.default = uploadFile;
