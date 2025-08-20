"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const environment_1 = require("./environment");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: environment_1.config.cloudinary.CLOUD_NAME,
    api_key: environment_1.config.cloudinary.API_KEY,
    api_secret: environment_1.config.cloudinary.API_SECRET,
});
// Validate configuration
if (!environment_1.config.cloudinary.CLOUD_NAME) {
    console.warn("CLOUDINARY_CLOUD_NAME environment variable is not set");
}
if (!environment_1.config.cloudinary.API_KEY) {
    console.warn("CLOUDINARY_API_KEY environment variable is not set");
}
if (!environment_1.config.cloudinary.API_SECRET) {
    console.warn("CLOUDINARY_API_SECRET environment variable is not set");
}
exports.default = cloudinary_1.v2;
