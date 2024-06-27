"use server"
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_S3_BUCKET;

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


export const StoreImage = async (Body: Buffer, Key: string) => {
    try {
        await s3.send(new PutObjectCommand({
            Bucket,
            Key,
            Body
        }))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const DeleteImage = async (Key: string) => {
    try {
        await s3.send(new DeleteObjectCommand({
            Bucket,
            Key
        }))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


