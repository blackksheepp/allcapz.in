import React from 'react'
import Image from "next/image";
import { ProductType } from "@/app/utils/database/collections";
import { GetImage } from '@/app/components';

const ProductPreview = ({ product }: { product: ProductType }) => {
    return (
        <div className="w-full flex flex-row items-start justify-between py-vw-2">
            <div className="flex flex-row lg:gap-0 gap-2 items-start">
                <Image
                    src={GetImage(product.id)}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[60px] md:w-[80px] lg:w-[90px] h-auto self-start ml-vw-1 shadow-lg"
                />
                <div className="flex flex-col gap-vw-0.5">
                    <p className="text-accent font-retro text-smTolg px-vw-2">{product.title}</p>
                    {!product.hide && <p className="text-[#a4a4a4] font-ibm font-bold text-xsTosm px-vw-2">Size: {product.size}</p>}
                </div>
            </div>
            <div className="flex flex-col text-center">
                <p className="text-accent font-retro text-smTolg px-vw-2">₹{product.price * (product.quantity || 1)}</p>
                <p className="text-[#a4a4a4] font-ibm font-bold text-xsTosm px-vw-2">{product.price} x {product.quantity}</p>
            </div>
        </div>
    )
}

export default ProductPreview;
