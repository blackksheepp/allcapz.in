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

                cart.products = cart.products.map((p) => {
                    if (p.id == product.id) {
                        p.quantity = quantity
                    }
                    return p
                })
            } else {
                cart.products.push(product)
            }
        }
    } else {
        cart = {
            products: [product]
        }
    }  

    const response = cookies().set("cart", JSON.stringify(cart), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 Days,
        sameSite: "strict"
    })

    return response.has("cart");
}

export const GetCartFromCookies = async () => {
    return cookies().get("cart")?.value;
}

export const ClearSessionCookie = async () => {
    cookies().delete("session");
}

export const RemoveFromCartCookies = async (product: ProductType) => {
    const cartCookie = await GetCartFromCookies();
    if (cartCookie) {
        const cart: CartType = JSON.parse(cartCookie)
        if (cart.products) {
            cart.products = cart.products.filter((p) => {
                if (p.id === product.id) {
                    if (p.size === product.size) {
                        return false;
                    }
                }
                return true;
            });

            const response = cookies().set("cart", JSON.stringify(cart), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "strict"
            })
            return cart;
        }

    }
}

export const IncreaseQntyCookies = async (product: ProductType) => {
    const cartCookie = await GetCartFromCookies();
    if (cartCookie) {
        const cart: CartType = JSON.parse(cartCookie)
        if (cart.products) {
            cart.products = cart.products.map((p) => {
                if (p.id === product.id && p.size === product.size) {
                    if (p.quantity) {
                        p.quantity = p.quantity + 1;
                    }
                }
                return p;
            });

            cookies().set("cart", JSON.stringify(cart), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "strict"
            })

            return cart.products.filter(x => x.title == product.title)[0];
        }
    }
}

export const DecreaseQntyCookies = async (product: ProductType) => {
    const cartCookie = await GetCartFromCookies();
    if (cartCookie) {
        const cart: CartType = JSON.parse(cartCookie)
        if (cart.products) {
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

            cookies().set("cart", JSON.stringify(cart), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "strict"
            })

            return cart.products.filter(x => x.title == product.title)[0];
        }
    }
}


export const ClearCartCookies = async () => {
    cookies().delete("cart");
}
