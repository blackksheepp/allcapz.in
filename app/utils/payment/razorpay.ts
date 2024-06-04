"use server"
import { Product } from "@prisma/client";
const Razorpay = require("razorpay");
const shortid = require("shortid")

export const CreateRazorpayPayment = async (products: Product[], user: string, price: number) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_KEY,
    });

    const payment_capture = 1;
    const amount = price * 100;
    const currency = "INR";
    const options = {

        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: products.flatMap((p) => p.title),
            user: user,
            productId: products.flatMap((p) => p.id),
        }
    };

    try {
        const response = await razorpay.orders.create(options);
        return {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }
    } catch (err) {
        console.log(err);
    }
}

export const GetRazorpayPayment = async (id: string) => {
    try {
        return new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_KEY,
        }).payments.fetch(id)
    } catch (error) {
        console.log(error);
        return null;
    }
}