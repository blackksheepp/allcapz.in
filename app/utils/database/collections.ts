"use server"
import prisma from "@/lib/prisma";
import { CompressImage } from "../image-compression";
import { GetImage } from "../../components";
import { DeleteImage, StoreImage } from "../s3";
import { appendFile, readFile } from "fs";
const bson = require('bson');
export interface CollectionType {
    icon: string;
    name: string;
    products: ProductType[];
}

export interface ProductType {
    id: string;
    title: string;
    price: number;
    size: string;
    quantity?: number | null;
    collection: string
}

export const CreateCollection = async (name: string, icon: string) => {
    try {
        await prisma.collections.create({
            data: {
                icon,
                name,
                products: [],
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const GetCollections = async () => {
    try {
        return await prisma.collections.findMany({});
    } catch (error) {
        return null;
    }
};

export const DeleteCollection = async (name: string) => {
    try {
        return await prisma.collections.delete({
            where: {
                name
            },
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const RenameCollection = async (
    oldCollectionName: string,
    newCollectionName: string
) => {
    try {
        await prisma.collections.update({
            where: {
                name: oldCollectionName,
            },
            data: {
                name: newCollectionName,
            },
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const ReOrderCollections = async (collections: CollectionType[]) => {
    try {
        await prisma.collections.deleteMany({});
        await prisma.collections.createMany({
            data: [...collections],
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const CreateProduct = async (
    id: string,
    title: string,
    price: number,
    size: string,
    collection: string
) => {
    try {
        await prisma.collections.update({
            where: {
                name: collection,
            },
            data: {
                products: {
                    push: [
                        {
                            id,
                            title,
                            price,
                            size,
                            collection,
                        },
                    ],
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const GetProducts = async (collection: string) => {
    try {
        const c = await prisma.collections.findFirst({
            where: {
                name: collection,
            },
        });
        return c ? c.products : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const DeleteProduct = async (collection: string, title: string) => {
    try {
        const products = (
            await prisma.collections.findFirst({
                where: {
                    name: collection,
                },
            })
        )?.products;

        const id = products?.filter((p) => p.title == title)[0].id;
        if (id) {
            DeleteImage(id);
        }

        await prisma.collections.update({
            where: {
                name: collection,
            },
            data: {
                products: {
                    set: products?.filter((p) => p.title != title),
                },
            },
        });

    } catch (error) {
        console.log(error);
    }
};

export const EditProduct = async (
    collection: string,
    oldProductTitle: string,
    newProductTitle: string,
    newPrice: number
) => {
    try {
        var products = (
            await prisma.collections.findFirst({
                where: {
                    name: collection,
                },
            })
        )?.products;
        products = products?.map((product) => {
            if (product.title === oldProductTitle) {
                product.title = newProductTitle;
                product.price = newPrice;
            }
            return product
        });
        await prisma.collections.update({
            where: {
                name: collection,
            },
            data: {
                products: {
                    set: products,
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const ReOrderProduct = async (collection: string, products: ProductType[]) => {
    try {
        await prisma.collections.update({
            where: {
                name: collection,
            },
            data: {
                products: {
                    set: products,
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const GetProductByTitle = async (collection: string, title: string) => {
    try {
        const c = await prisma.collections.findFirst({
            where: {
                name: collection,
            },
        });
        let i: ProductType[] | undefined = c?.products.filter((i) => i.title === title);
        let product = i?.at(0);
        return product ? product : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const SaveImage = async (form: FormData) => {
    const inputBuffer = await (form.get('file') as File).arrayBuffer()
    const outputBuffer = await CompressImage(inputBuffer);
    const id: string = new bson.ObjectId().toString();
    const stored = await StoreImage(outputBuffer, id + ".avif");
    const url = GetImage(id);
    return { url, id };
};

