import { useSession } from '@/app/providers/Session'
import React, { FC } from 'react'
import { useRouter } from 'next/navigation';
import { ProductType } from '@/app/utils/database/collections';
import Image from 'next/image';
import { OrderType } from '@/app/utils/database/orders';
import ProductPreview from '@/app/profile/components/ProductPreview';

interface ProductsProps {
    order: OrderType
}

export const Products: FC<ProductsProps> = ({ order }) => {
    const { session } = useSession();
    const date = new Date(order.confirmedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const router = useRouter();

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
                                    <p className="text-smTolg">₹{order?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                                </div>
                                <div className="pt-vw-1 w-full flex flex-row justify-between items-baseline text-accent">
                                    <p className="text-smTolg">Shipping</p>
                                    <p className="text-xsTosm">₹0</p>
                                </div>
                                <div className="py-vw-4 text-xl w-full flex flex-row justify-between items-baseline text-accent">
                                    <p className="text-lgTo2xl">Total</p>
                                    <p className="text-lgTo2xl">INR ₹{order?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
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

