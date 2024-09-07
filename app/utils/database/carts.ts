"use server"
import prisma from "@/lib/prisma";
import { ProductType } from "./collections";
import { cursorTo } from "readline";

export interface CartType {
    user: string;
    products: ProductType[]
}

export const AddToCart = async (user: string, product: ProductType): Promise<boolean> => {
    try {
        const cart = await GetCart(user);
        let success;
        if (cart) {
            const productExists = cart.products.filter(p => p.id === product.id);
            const diffSizeProduct = !productExists.map(p => p.size).includes(product.size);

            if (!diffSizeProduct) {
                const existingProduct = productExists.filter(p => p.size === product.size)[0];
                let quantity: number;
                if (existingProduct.quantity) {
                    quantity = existingProduct.quantity + 1
                } else {
                    quantity = 1
                }

                success = await prisma.carts.update({
                    where: {
                        user: user,
                    },
                    data: {
                        products: {
                            updateMany: {
                                where: {
                                    id: product.id,
                                    size: product.size
                                },
                                data: {
                                    quantity: quantity
                                }
                            }
                        }
                    }
                })
            } else {
                success = await prisma.carts.update({
                    where: {
                        user: user
                    },
                    data: {
                        products: {
                            push: product
                        }
                    }
                })
            }
        } else {
            success = await prisma.carts.create({
                data: {
                    user: user,
                    products: [product]
                }
            })
        }
        return (success ? true : false)
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const GetCart = async (user: string) => {
    try {
        return await prisma.carts.findFirst({
            where: {
                user: user,
            },
        }) as CartType;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const RemoveFromCart = async (user: string, product: ProductType) => {
    try {
        const cart = await GetCart(user);
        if (cart) {

            cart.products = cart.products.filter((p) => {
                if (p.id === product.id) {
                    if (p.size === product.size) {
                        return false;
                    }
                } 
                return true;
            });

            return await prisma.carts.update({
                where: {
                    user: user
                },
                data: {
                    products: {
                        set: cart.products
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const IncreaseQnty = async (user: string, product: ProductType) => {
    try {
        const cart = await GetCart(user);
        if (cart) {
            cart.products = cart.products.map((p) => {
                if (p.id === product.id && p.size === product.size) {
                    if (p.quantity) {
                        p.quantity = p.quantity + 1;
                    }
                }
                return p;
            });
            await prisma.carts.update({
                where: {
                    user: user
                },
                data: {
                    products: {
                        set: cart.products
                    }
                }
            })
            return cart.products.filter(x => x.id == product.id && x.size == product.size)[0];
        }
    } catch (error) {
        console.log(error);
    }
}

export const DecreaseQnty = async (user: string, product: ProductType) => {
    try {
        const cart = await GetCart(user);
        if (cart) {
            cart.products = cart.products.map((p) => {
                if (p.id == product.id && p.size == product.size) {
                    if (p.quantity) {
                        if (p.quantity - 1 >= 1) {
                            p.quantity = p.quantity - 1
                        };
                    }
                }
                return p;
            });
            
            await prisma.carts.update({
                where: {
                    user: user
                },
                data: {
                    products: {
                        set: cart.products
                    }
                }
            })
            return cart.products.filter(x => x.id == product.id && x.size == product.size)[0];
        }
    } catch (error) {
        console.log(error);
    }
}


// export const UpdateProductSize = async (user: string, product: ProductType, size: string) => {
//     try {
//         const cart = await GetCart(user);
//         if (cart) {
//             cart.products = cart.products.map((p) => {
//                 if (p.id === product.id && p.size === product.size) {
//                     p.size = size
//                 }
//                 return p;
//             });
//             await prisma.carts.update({
//                 where: {
//                     user: user
//                 },
//                 data: {
//                     products: {
//                         set: cart.products
//                     }
//                 }
//             })
//             return cart.products.filter(x => x.id == product.id && x.size == size)[0];
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


export const ClearCart = async (user: string) => {
    try {
        await prisma.carts.update({
            where: {
                user: user
            },
            data: {
                products: {
                    set: []
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}