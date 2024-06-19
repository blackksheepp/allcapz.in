"use server"
import prisma from "@/lib/prisma";
import { ProductType } from "./collections";
import { SendOrderConfirmedMessage } from "../telegram/orders";

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
    confirmedAt: Date;
    status: string;
    user: string;
    products: ProductType[];
    pricing: PriceType;
    shipping?: ShippingType;
    address: string;
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


export const UpdateOrder = async (order: OrderType) => {
    try {
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: order,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}