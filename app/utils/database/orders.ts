"use server"
import prisma from "@/lib/prisma";
import { ProductType } from "./collections";
import { SendOrderConfirmedMessage } from "../telegram/orders";
import { AddressType } from "./addresses";

export interface PriceType {
    totalAmount: number;
    shippingCost: number;
    taxAmount: number;
    discount: number;
    subtotal: number;
}

export interface ShippingType {
    method: string;
    trackingId: string;
    estimatedDeliveryDate: Date;
}

export interface OrderType {
    id: string;
    payment_id: string;
    confirmedAt: Date;
    status: string;
    user: string;
    products: ProductType[];
    pricing: PriceType;
    shipping?: ShippingType;
    address: AddressType;
}

export const CreateOrder = async (order: OrderType) => {
    try {
        await prisma.order.create({
            data: order,
        }).then(() => {
            SendOrderConfirmedMessage(order.id);
        });
    } catch (error) {
        console.log(error, "order");
        return false;
    }
};

export const GetOrder = async (id: string) => {
    try {
        return await prisma.order.findUnique({
            where: {
                id
            }
        }) as OrderType;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export const GetOrders = async (user: string) => {
    try {
        return await prisma.order.findMany({
            where: {
                user
            }
        }) as OrderType[];
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const UpdateOrderStatus = async (id: string, status: string) => {
    try {
        await prisma.order.update({
            where: {
                id,
            },
            data: {
                status
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const UpdateEDD = async (id: string, estimatedDeliveryDate: Date) => {
    try {
        const existingProduct = await prisma.order.findUnique({
            where: {
                id
            }
        })

        if (existingProduct && existingProduct.status !== "delivered") {
            const resp = await prisma.order.update({
                where: {
                    id,
                },
                data: {
                    shipping: {
                        method:existingProduct.shipping?.method || "Shiprocket",
                        trackingId: existingProduct.shipping?.trackingId || "",
                        estimatedDeliveryDate: estimatedDeliveryDate
                    }
                },
            });
            console.log(resp);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}