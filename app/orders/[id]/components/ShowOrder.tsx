import { OrderType, UpdateOrderStatus } from '@/app/utils/database/orders'
import React, { useEffect, useState } from 'react'
import ProductPreview from '@/app/profile/components/ProductPreview'
import { AddressType, GetAddress } from '@/app/utils/database/addresses'
import { useSession } from '@/app/providers/Session'
import Link from 'next/link'
import { CreateCustomOrder } from '@/app/utils/shipping/shiprocket'
import { useRouter } from 'next/navigation'
export const ShowOrder = ({ order }: { order: OrderType }) => {
    const { session } = useSession();

    const statusColors: Record<string, string> = {
        "processing": "#FFD600",
        "shipping": "#02CD2F",
        "delivered": "#a4a4a4"
    }

    const currentStatus = [];
    for (let i = 0; i < Object.keys(statusColors).length; i++) {
        currentStatus.push(Object.keys(statusColors)[i]);
        if (Object.keys(statusColors)[i] === order.status) break;
    }

    const confirmedAt = new Date(order.confirmedAt)
    const orderedOn = confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const edd = new Date(confirmedAt.getTime() + (5 * 24 * 60 * 60 * 1000));
    const deliveryBy = edd.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const address = order.address;

    const supportEmail = "support@allcapz.com";
    const supportPhone = "+91 " + "1234567890";

    const router = useRouter();
    const handleShipping = () => {
        if (order.status === "processing") {
            CreateCustomOrder(order).then((url) => {
                if (url) {
                    UpdateOrderStatus(order.id, "shipping")
                    window.open(url, "_blank");
                }
            })
        }
    }
    return (
        <div className="w-full h-full flex flex-col mt-vw-20 md:mt-vw-10 xl:mt-vw-20 gap-vw-2.5">
            <div className="w-full md:h-[600px] flex flex-col lg:flex-row items-end px-vw-14 gap-vw-14-min@lg">
                <div className="w-full h-full flex flex-col justify-between py-vw-6-min@lg px-vw-6-min@md border-[3px] border-dashed border-[#c4c4c4] ">

                    <div className="w-full flex flex-row items-center justify-between">
                        <p className="text-lgToxl font-ibm font-[500] text-accent select-text">#{order.id.replace("order_", "")}</p>
                        <p className="text-smTolg text-end font-ibm font-[500] text-[#a4a4a4]">{orderedOn}</p>
                    </div>
                    <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>

                    <div className="w-full flex flex-col gap-vw-5 md:gap-0 md:flex-row px-vw-4-max@md justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-lgToxl font-ibm font-[500] text-white">Contact Details</p>
                            <div className="flex flex-col">
                                <p className="text-smTolg font-ibm font-[500] text-accent">{address?.fname + " " + address?.lname}</p>
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{session?.email}</p>
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.phone}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-lgToxl font-ibm font-[500] text-white text-end">Shipping Address</p>
                            </div>
                            <div className="flex flex-col md:text-end">
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.street}</p>
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.address}</p>
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.postalCode}, {address?.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>

                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full flex flex-row items-center justify-between">
                            <p className="text-lgToxl font-ibm font-[500] text-white">Order Status</p>
                            <p className="text-smTolg font-ibm font-[400] text-[#a4a4a4]">EDD: {deliveryBy}</p>
                        </div>

                        <div className="mt-4 mx-vw-4-max@md text-smTolg lg:text-lgToxl flex flex-col md:flex-row items-center justify-center gap-vw-4 text-[#a4a4a4] font-ibm">
                            <p className="text-accent">Confirmed</p>
                            <p className='text-accent rotate-[90deg] md:rotate-0'>&gt;</p>
                            <p className="text-[#FFD600]">Processing</p>
                            <p className="rotate-[90deg] md:rotate-0">&gt;</p>
                            <p>Shipping</p>
                            <p className="rotate-[90deg] md:rotate-0">&gt;</p>
                            <p>Delivered</p>
                        </div>

                    </div>

                    <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>
                    
                    <Link target='_blank' href={`https://dashboard.razorpay.com/app/payments/${order.payment_id}`}>
                        <p className="text-xsTosm font-ibm mx-vw-20-max@md mt-3 py-1.5 text-accent text-center font-[600] bg-[#2563EB] dropshadow text-smToLg active:-mb-1 active:-mr-1">
                            View Payment on Razorpay
                        </p>
                    </Link>
                    
                    <p onClick={handleShipping} className="cursor-pointer text-xsTosm font-ibm mx-vw-20-max@md mt-3 py-1.5 text-accent text-center font-[600] bg-[#735AE5] dropshadow text-smToLg active:-mb-1 active:-mr-1">
                        Confirm Shipping via Shiprocket
                    </p>

                    <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>

                </div>

                <div className="w-full h-full border-[3px] border-dashed border-[#c4c4c4] mb-10 lg:mb-0">
                    <p className="text-lgTo2xl py-4 px-vw-14-max@md font-ibm font-[500] text-white">Product Summary</p>
                    <div className="w-full px-vw-14-max@md">
                        {order && order.products && order.products.length > 0 && (
                            <div>
                                <div className="lg:max-h-[320px] overflow-scroll">
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
                                        <p className="text-smTolg text-end">₹{order?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                                    </div>
                                    <div className="pt-vw-1 w-full flex flex-row justify-between items-baseline text-accent">
                                        <p className="text-smTolg">Shipping</p>
                                        <p className="text-xsTosm">₹0</p>
                                    </div>
                                    <div className="py-vw-4 text-lgToxl w-full flex flex-row justify-between items-baseline text-accent">
                                        <p className="text-lgToxl">Total</p>
                                        <p className="text-smTolg">INR ₹{order?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] mb-vw-10 bg-white"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
