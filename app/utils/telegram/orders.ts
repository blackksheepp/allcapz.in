"use server"
import { bot } from "."
import { GetAddress } from "../database/addresses"
import { GetOrder } from "../database/orders"
import { InputMediaPhoto } from "node-telegram-bot-api"
import { GetImage } from "../../components"

export const SendOrderConfirmedMessage = async (orderId: string) => {
    const order = await GetOrder(orderId);
    
    if (order) {
        const date = order.confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });    
        const address = await GetAddress(order.address);
        if (!address) return

        const caption = `<b>Products</b>
${order.products.map((product) => {
            return `<code>${product.title} (${product.size[0] || "M"}) x ${product.quantity}</code>`;
        }).join("\n")}

<b>Price</b> ₹<code>${order.pricing.totalAmount}</code>

<b>Shipping</b>
<code>${address.fname} ${address.lname}</code>
<code>${address.street}</code>
<code>${address.address}</code>
<code>${address.postalCode} ${address.city}</code>

<b>Contact</b>
<code>${order.user}</code>
<code>+91 ${address.phone}</code>

<a href="https://allcapz.in/?orderId=${order.id}"><b>View Order</b></a>
<b>${order.status[0].toUpperCase() + order.status.substring(1)}</b>
<b>${date}</b>
`;

        const productImages: InputMediaPhoto[] = await Promise.all(
            order.products.flatMap(async (product) => {
                return {
                    type: "photo",
                    media: await GetImage(product.id),
                    caption,
                    parse_mode: "HTML"
                }
            })
        )

        await bot.sendMediaGroup(
            process.env.TELEGRAM_CHANNEL || "",
            productImages,
        );
    }
}

