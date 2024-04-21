"use server";

import { Product } from "@prisma/client";

export const verifyPassword = async (inputPassword: string) => {
  if (inputPassword == "saul") {
    return true;
  } else {
    return false;
  }
};

const Razorpay = require("razorpay");
const shortid = require("shortid")

export const getRazorpayData = async (products: Product[], user:string, price: number) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
  });

  const product = products.map((product) => product.title).join(", ");
  const payment_capture = 1;
  const amount = price * 100;
  const currency = "INR";
  const options = {
    amount: (amount).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      paymentFor: `${product}`,
      userId: user,
      productId: btoa(product)
    }
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response)
    return {
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    }
  } catch (err) {
    console.log(err);
  }
} 