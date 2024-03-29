"use server"
import prisma from "@/lib/prisma";

export interface CollectionType {
    name: string;
    products: ProductType[];
}

export interface ProductType {
    image: string;
    title: string;
    price: number;
    size: string;
    quantity?: number | null;
}

export const CreateCollection = async (name: string) => {
    try {
        await prisma.collections.create({
            data: {
                name: name,
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

export const DelCollection = async (name: string) => {
    try {
        await prisma.collections.delete({
            where: {
                name: name,
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
    title: string,
    image: string,
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
                            image: image,
                            title: title,
                            price: price,
                            size: size,
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

export const DelProduct = async (collection: string, title: string) => {
    try {
        const products = (
            await prisma.collections.findFirst({
                where: {
                    name: collection,
                },
            })
        )?.products;

        const product = (products?.filter((product) => product.title == title))![0];

        await prisma.collections.update({
            where: {
                name: collection,
            },
            data: {
                products: {
                    set: products?.filter((product) => product.title != title),
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const RenameProduct = async (
    collection: string,
    oldProductTitle: string,
    newProductTitle: string
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
            if (product.title = oldProductTitle) {
                product.title = newProductTitle;
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
export const ReOrder = async (
    objects: (CollectionType | ProductType)[],
    collection: string | false
) => {
    if (collection) {
        return await ReOrderProduct(collection, objects as ProductType[]);
    } else {
        return await ReOrderCollections(objects as CollectionType[]);
    }
};

export const GetProductByTitle = async (collection: string, title: string) => {
    try {
        const c = await prisma.collections.findFirst({
            where: {
                name: collection,
            },
        });
        let i: ProductType[] | undefined = c?.products.filter((i) => i.title == title);
        let product = i?.at(0);
        return product ? product : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const SaveImage = async (form: FormData) => {
    const res = await fetch("https://graph.org/upload", {
        method: "POST",
        body: form,
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);

    const url = `https://graph.org${json[0].src}`;
    return url;
};
