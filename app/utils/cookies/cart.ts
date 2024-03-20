"use server"
import { cookies } from "next/headers";
import { ProductType } from "../database/collections";
import { CartType } from "../database/carts";

export interface CartCookieType {
    products: ProductType[];
}

export const AddToCartCookies = async (product: ProductType) => {
    const cartCookie = cookies().get("cart")
    var cart: CartCookieType | null = null;

    if (cartCookie?.value) {
        cart = JSON.parse(cartCookie.value);
        cart?.products.push(product)
    } else {
        cart = {
            products: [product]
        }
    }

    const response = cookies().set("cart", JSON.stringify(cart), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 Days,
        sameSite: true
    })
    
    return response.has("cart");
}

export const GetCartFromCookies = async () => {
    return cookies().get("cart")?.value;
}

export const ClearSessionCookie = async () => {
    cookies().delete("session");
}