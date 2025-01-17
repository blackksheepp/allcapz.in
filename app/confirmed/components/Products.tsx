import { useSession } from '@/app/providers/Session'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ProductType } from '@/app/utils/database/collections';
import Image from 'next/image';
import { OrderType } from '@/app/utils/database/orders';
import ProductPreview from '@/app/profile/components/ProductPreview';
import { availDiscount, getDiscount } from '@/app/components/Cart';

interface ProductsProps {
    order: OrderType
}

export const Products: FC<ProductsProps> = ({ order }) => {
    const date = new Date(order.confirmedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const [subTotal, setSubTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [discountDesc, setDiscountDesc] = useState("");

    useEffect(() => {
        
        if (order.products) {
            setSubTotal(order.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0) || 0);
            const nPosters = order.products.reduce((a, b) => a + (b.quantity || 0), 0)
            const disc = getDiscount(nPosters, subTotal);

            setDiscount(disc.discount);
            setDiscountDesc(disc.description);
        }
    }, [order, subTotal])
    
    return (
        <div className="w-full h-full flex flex-col px-vw-20-max@md lg:pl-vw-14 lg:pr-vw-10 gap-3">
            <div className="flex flex-col gap-1">
                <p className="text-xlTo3xl font-retro text-accent">Order Confirmed</p>
                <p className="text-smTolg font-ibm text-accent">
                    #{order.id.replace("order_", "")} - {date}
                </p>
            </div>
            <div className="w-full h-full border-[3px] border-dashed border-[#c4c4c4] flex flex-col py-vw-10 px-vw-14">
                <p className="text-lgTo2xl font-ibm font-[500] text-white">Product Summary</p>
                <div className="w-full">
                    {order && order.products && order.products.length > 0 && (
                        <div>
                            <div className="max-h-[400px] overflow-scroll">
                                {order.products.flatMap((product, index) => (
                                    <ProductPreview
                                        key={index}
                                        product={product}
                                    />
                                ))}
                            </div>
                            {order.products.length > 3 && (
                                <p className="pt-3 text-[#a4a4a4] font-ibm">Scroll for more...</p>
                            )}
                            <div className="w-full h-[1px] mt-4 bg-white"></div>
                            <div className="w-full font-ibm font-[500] text-accent">
                                <div className="w-full pt-vw-4 flex flex-row justify-between items-baseline">
                                    <p className="text-smTolg">Subtotal</p>
                                    <p className="text-smTolg">₹{subTotal}</p>
                                </div>

                                {discountDesc && (
                                    <div>
                                        <div className="w-full pt-vw-1 flex flex-row justify-between items-baseline">
                                            <p className="text-smTolg">Discount</p>
                                            <p className="text-smTolg text-red-500">-₹{discount}</p>
                                        </div>

                                        <p className="my-0.5 py-1 opacity-90 font-secondary text-xs border-[1px] border-accent text-accent w-full px-4 text-center ">{discountDesc}.</p>
                                    </div>
                                )}

                                <div className="pt-vw-1 w-full flex flex-row justify-between items-baseline">
                                    <p className="text-smTolg">Shipping</p>
                                    <p className="text-xsTos text-xs">{"₹0"}</p>
                                </div>
                                <div className="py-vw-4 text-xl w-full flex flex-row justify-between items-baseline">
                                    <p className="text-lgTo2xl">Total</p>
                                    <p className="text-lgTo2xl text-green-500">INR ₹{availDiscount(order.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0))}</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] mb-vw-7 bg-white"></div>

                        </div>
                    )}
                </div>
           </div>
        </div>
    )
}

