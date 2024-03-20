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