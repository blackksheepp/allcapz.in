"use server"

import sharp from "sharp";

export const CompressImage = async (inputBuffer: ArrayBuffer) => {
    return await sharp(inputBuffer).toFormat('heif', {
        quality: 30,
        compression: 'av1',
    }).toBuffer();
}
