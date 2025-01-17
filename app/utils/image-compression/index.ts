"use server"

import sharp from "sharp";

export const CompressImage = async (inputBuffer: ArrayBuffer) => {
    return await sharp(inputBuffer).avif({
        quality: 20,
    }).toBuffer();
}

export const DecompressImage = async (data: any) => {
    return await sharp(data).png({ quality: 20 }).toBuffer();
}