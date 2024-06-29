import { OrderType } from '@/app/utils/database/orders'
import { GetImage } from '@/app/components';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


const PreviewOrder = ({ order: { id, products, status, confirmedAt } }: { order: OrderType }) => {
    
    const images = products.map((product) => GetImage(product.id)).slice(0, 2);

    const PRODUCT_NAMES_LENGTH = 20;
    var productNames = "";
    for (let i = 0; i < products.length; i++) {
        productNames += products[i].title;

        if (productNames.length >= PRODUCT_NAMES_LENGTH) {
            productNames = productNames.substring(0, PRODUCT_NAMES_LENGTH);
            if (productNames.endsWith(", ")) {
                productNames = productNames.substring(0, productNames.length - 2);
            }

            productNames += ".. ";
            if (products.length - 1 > i) {
                productNames += `+${products.length - i - 1}`;
            }
            break;
        } else {
            if (i < products.length - 1) {
                productNames += ", ";
            }
        }
    }

    var size = products.map((product) => product.size).reduce(
        (avgSize, productSize) => avgSize === productSize ? avgSize : "Various Sizes",
        products[0].size
    )

    const statusColor: Record<string, string> = {
        processing: "#02CD2F",
        shipping: "#FFD600",
        delivered: "#929292",
    }

    const date = confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "numeric", year: "numeric" });
    return (
        <div className="w-full px-4 py-3">
            <div className="w-full md:px-vw-1 py-3 flex flex-row items-center justify-between">
                <div className="flex flex-row gap-vw-5-min@sm items-center">
                    <div className="relative">
                        <Image
                            src={images[0]}
                            alt="order-product"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={`w-[70px] h-auto ${images.length > 1 ? "rotate-[5deg]" : ""}`}
                        />
                        {images.length > 1 && (
                            <Image
                                src={images[1]}
                                alt="order-product"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="absolute z-10 top-0 left-0 w-[70px] h-auto rotate-[-3deg]"
                            />
                        )}
                    </div>
                    <div className=" text-accent font-ibm">
                        <p className="text-smTolg">{'#' + id.replace('order_', '')}</p>
                        <p className="text-lgToxl">{productNames}</p>
                        <p className="text-[#a4a4a4] text-xxsTosm">{products.length} Posters • {size}</p>
                    </div>
                </div>
                <div className=" text-accent font-ibm flex flex-col items-end">
                    <p className="text-smTolg" style={{ color: statusColor[status] }}>{status[0].toUpperCase() + status.slice(1)}</p>
                    <p className="text-xxsTosm text-end">Ordered On {date}</p>
                </div>
            </div>
        </div>
    )
}

export default PreviewOrder