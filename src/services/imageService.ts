import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { config } from "../config/environment";
import uploadFile from "../middlewares/uploadFile";
import AppError from "../utils/appError";
import s3Client from "../config/s3Config";

export class ImageService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const result = await uploadFile(file);
      return result.Location;
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw new AppError("Failed to upload image", 500);
    }
  }

  async deleteImage(key: string): Promise<void> {
    const deleteParams = {
      Bucket: config.aws.S3_BUCKET_NAME,
      Key: key,
    };

    try {
      const command = new DeleteObjectCommand(deleteParams);
      await s3Client.send(command);
    } catch (error) {
      console.error("Error deleting image from S3:", error);
      throw new AppError("Failed to delete image", 500);
    }
  }

  getImageUrl(key: string): string {
    return `https://${config.aws.S3_BUCKET_NAME}.s3.${config.aws.REGION}.amazonaws.com/${key}`;
  }

  getKeyFromUrl(url: string): string {
    const baseUrl = `https://${config.aws.S3_BUCKET_NAME}.s3.${config.aws.REGION}.amazonaws.com/`;
    return url.replace(baseUrl, "");
  }
}

export default new ImageService();
