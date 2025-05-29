"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const environment_1 = require("./environment");
if (!environment_1.config.aws.REGION) {
    throw new Error("AWS_REGION environment variable is not set");
}
const s3Client = new client_s3_1.S3Client({
    region: environment_1.config.aws.REGION,
    credentials: {
        accessKeyId: environment_1.config.aws.ACCESS_KEY_ID,
        secretAccessKey: environment_1.config.aws.SECRET_ACCESS_KEY,
    },
});
exports.default = s3Client;
