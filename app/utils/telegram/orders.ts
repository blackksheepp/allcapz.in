"use server"
import { bot } from "."
import { GetAddress } from "../database/addresses"
import { GetOrder } from "../database/orders"
import { InputMediaPhoto } from "node-telegram-bot-api"
import { GetImage } from "../../components"
import axios from "axios"
import path from "path"
import { unlinkSync, writeFileSync } from "fs"
import { DecompressImage } from "../image-compression"
import { RedirectUri } from "../auth"

export const SendOrderConfirmedMessage = async (orderId: string) => {
    const order = await GetOrder(orderId);

    if (order) {
        const date = order.confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
        const address = order.address;
        if (!address) return

        const caption = `<b>Order Confirmed</b>
<code>${'#' + order.id.replace("order_", "")}</code>        
        
<b>Products</b>
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

<a href="https://allcapz.in/orders/${order.id.replace("order_", "")}"><b>View Order</b></a>
<b>${order.status[0].toUpperCase() + order.status.substring(1)}</b>
<b>${date}</b>
`;

        const imagePaths = await downloadImages(order.products.flatMap((product) => GetImage(product.id)));
        const productImages: InputMediaPhoto[] = imagePaths.slice(0, 8).flatMap((path, index) => {
            return {
                type: "photo",
                media: path,
                caption: index === 0 ? caption : undefined,
                parse_mode: "HTML"
            }
        })

        bot.sendMediaGroup(
            process.env.TELEGRAM_CHANNEL || "",
            productImages,
        ).then(() => {
            deleteImages(imagePaths);
        })
    }
}


async function downloadImages(urls: string[]): Promise<string[]> {
    const downloadPromises = urls.map(async (url, index) => {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const filename = `image_${index + 1}.jpg`;
            const filePath = path.join(__dirname, filename);
            const image = await DecompressImage(
                Buffer.from(response.data, 'binary')
            );

            writeFileSync(filePath, image);
            return filePath;
        } catch (error) {
            console.error(`Error downloading ${url}: ${error}`);
            return null;
        }
    });

    const results = await Promise.all(downloadPromises);
    return results.filter(filePath => filePath !== null) as string[];
}

function deleteImages(filePaths: string[]): void {
    filePaths.forEach(filePath => {
        try {
            unlinkSync(filePath);
        } catch (error) {
            console.error(`Error deleting ${filePath}: ${error}`);
        }
    });
}
