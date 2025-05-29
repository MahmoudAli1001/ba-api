import { S3Client } from "@aws-sdk/client-s3";
import { config } from "./environment";

if (!config.aws.REGION) {
  throw new Error("AWS_REGION environment variable is not set");
}
const s3Client = new S3Client({
  region: config.aws.REGION,
  credentials: {
    accessKeyId: config.aws.ACCESS_KEY_ID,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY,
  },
});

export default s3Client;
