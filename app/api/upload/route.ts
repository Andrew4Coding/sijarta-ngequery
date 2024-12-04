import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import { s3, Bucket } from "@/lib/s3"

export async function POST(req: Request) { 
    let isDebug = false;
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        isDebug = true;
    
        const Body = (await file.arrayBuffer()) as Buffer;

        const response = await s3.send(new PutObjectCommand({
            Bucket,
            Key: file.name,
            Body,
        }))

        if (response.$metadata.httpStatusCode !== 200) {
            throw new Error("Failed to upload file");
        }
        return new Response(
            JSON.stringify({
                message: "Success",
                data: {
                    url: `https://${Bucket}.s3.${process.env.AWS_REGION as string}.amazonaws.com/${file.name}`
                }
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    catch (e: any) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: e.message,
                isDebug: isDebug
            }),
            { status: 500 }
        );
    }
}