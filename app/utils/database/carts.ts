"use server"
import prisma from "@/lib/prisma";
import { ProductType } from "./collections";
import { useSession } from "@/app/Providers/Session";

export interface CartType {
    user: string;
    products: ProductType[]
}

export const AddToCart = async (user: string, product: ProductType) => {
    try {
        const cart = await GetCart(user);
        if (cart) {
            await prisma.carts.update({
                where: {
                    user: user
                },
                data: {
                    products: {
                        push: product
                    }
                }
            })
        } else {
            await prisma.carts.create({
                data: {
                    user: user,
                    products: [product]
                }
            })
        }
        return true;
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
            cart.products = cart.products.filter((p) => p.title != product.title);
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
            return cart;
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
                if (p.title == product.title) {
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
            return cart.products.filter(x => x.title == product.title)[0];
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
                if (p.title == product.title) {
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
            return cart.products.filter(x => x.title == product.title)[0];
        }
    } catch (error) {
        console.log(error);
    }
}