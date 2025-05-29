import { PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config/environment";
import s3Client from "../config/s3Config";


const uploadFile = async (file: Express.Multer.File) => {
  const params = {
    Bucket: config.aws.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return {
      ETag: response.ETag,
      Location: `https://${config.aws.S3_BUCKET_NAME}.s3.${config.aws.REGION}.amazonaws.com/${params.Key}`,
      Key: params.Key,
      Bucket: config.aws.S3_BUCKET_NAME,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFile;