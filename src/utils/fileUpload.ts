import { PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { config } from "../config/environment";

import AppError from "./appError";
import s3Client from "../config/s3Config";

interface File {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}

interface UploadResponse {
    ETag: string;
    Location: string;
    Key: string;
    Bucket: string;
    mimetype: string;
    size: number;
}

const removeExtension = (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, "");
};

const sanitizeImageName = (filename: string): string => {
    return removeExtension(filename.replace(/[^a-zA-Z0-9.-]/g, "_"));
};

const convertToWebP = async (buffer: Buffer): Promise<Buffer> => {
    return await sharp(buffer).webp({ quality: 80 }).toBuffer();
};

const validateWebP = async (buffer: Buffer): Promise<boolean> => {
    const metadata = await sharp(buffer).metadata();
    return metadata.format === "webp";
};

const uploadToS3 = async (file: File, s3Path: string = ""): Promise<UploadResponse> => {
    if (!file.buffer || !file.originalname || !file.mimetype) {
        throw new AppError("Invalid file (type not recognized)", 400);
    }

    if (file.buffer.length > config.maxImageSize) {
        throw new AppError(`File size exceeds the limit of ${config.maxImageSize / 1024 / 1024} MB`, 400);
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
            buffer = await convertToWebP(file.buffer);
            mimetype = "image/webp";
            // Validate that the conversion was successful
            const isWebP = await validateWebP(buffer);
            if (!isWebP) {
                throw new AppError("Failed to convert image to WebP", 500);
            }
        } catch (error) {
            console.error("Error converting to WebP:", error);
            throw new Error("Failed to convert image to WebP");
        }
    } else {
        console.log("Image is already in WebP format");
    }

    const params = {
        Bucket: config.aws.S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
    };

    try {
        const command = new PutObjectCommand(params);
        const s3Response: PutObjectCommandOutput = await s3Client.send(command);
        return {
            ETag: s3Response.ETag!,
            Location: `https://${config.aws.S3_BUCKET_NAME}.s3.${config.aws.REGION}.amazonaws.com/${key}`,
            Key: key,
            Bucket: config.aws.S3_BUCKET_NAME,
            mimetype: mimetype,
            size: buffer.length,
        };
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error(`Failed to upload file with error: ${error}`);
    }
};

export default uploadToS3;
