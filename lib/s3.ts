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

const uploadFile = async (data: File | null) => {
    try {
        if (data) {
            const formData = new FormData();
            formData.append('file', data);
    
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
    
            const result: {
                message: string,
                data: {
                    url: string
                },
                error: string
            } = await response.json();
    
            if (response.ok) {
                return result.data.url;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}

export { Bucket, s3, s3Config, uploadFile as uploadFoto};
