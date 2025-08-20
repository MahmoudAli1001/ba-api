"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const cloudinaryUpload_1 = __importStar(require("../utils/cloudinaryUpload"));
const appError_1 = __importDefault(require("../utils/appError"));
class ImageService {
    uploadImage(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, cloudinaryUpload_1.default)(file, folder);
                return result.secure_url;
            }
            catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
                throw new appError_1.default("Failed to upload image", 500);
            }
        });
    }
    deleteImage(publicIdOrUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // If it's a URL, extract the public_id
                const publicId = publicIdOrUrl.includes('cloudinary.com')
                    ? (0, cloudinaryUpload_1.getPublicIdFromUrl)(publicIdOrUrl)
                    : publicIdOrUrl;
                yield (0, cloudinaryUpload_1.deleteFile)(publicId);
            }
            catch (error) {
                console.error("Error deleting image from Cloudinary:", error);
                throw new appError_1.default("Failed to delete image", 500);
            }
        });
    }
    getImageUrl(publicId) {
        // For Cloudinary, we don't need to construct URLs manually
        // The upload function already returns the full URL
        return publicId;
    }
    getKeyFromUrl(url) {
        // Extract public_id from Cloudinary URL
        return (0, cloudinaryUpload_1.getPublicIdFromUrl)(url);
    }
}
exports.ImageService = ImageService;
exports.default = new ImageService();
