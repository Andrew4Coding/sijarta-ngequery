import {
    S3Client
} from "@aws-sdk/client-s3";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const s3Config = {
    bucketName: process.env.AWS_BUCKET_NAME as string,
    region: process.env.AWS_REGION as string,
    accessKeyId: process.env.AWS_ACCESS_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ID as string
}

export { Bucket, s3, s3Config };
