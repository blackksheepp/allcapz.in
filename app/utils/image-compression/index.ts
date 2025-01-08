"use server"

import sharp from "sharp";

export const CompressImage = async (inputBuffer: ArrayBuffer) => {
    return await sharp(inputBuffer).avif({
        quality: 20,
    }).toBuffer();
}

export const DecompressImage = async (inputBuffer: ArrayBuffer) => {
    return await sharp(inputBuffer).toFormat('png').toBuffer();
}