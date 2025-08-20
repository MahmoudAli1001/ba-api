import dotenv from 'dotenv';
dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/business-arabic",
  jwtSecret: process.env.JWT_SECRET || "",
  maxImageSize: 5 * 1024 * 1024,
  cloudinary: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    API_KEY: process.env.CLOUDINARY_API_KEY || "",
    API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    FOLDER: process.env.CLOUDINARY_FOLDER || "business-arabic-api",
  },
};
