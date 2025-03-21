import { OrderType, UpdateEDD, UpdateOrderStatus } from '@/app/utils/database/orders'
import React, { useEffect, useState } from 'react'
import ProductPreview from '@/app/profile/components/ProductPreview'
import { AddressType, GetAddress } from '@/app/utils/database/addresses'
import { useSession } from '@/app/providers/Session'
import Link from 'next/link'
import { CreateCustomOrder } from '@/app/utils/shipping/shiprocket'
import { useRouter } from 'next/navigation'
import CustomDatePicker from './DatePicker'
import { availDiscount, getDiscount } from '@/app/components/Cart'
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

    const edd = order.shipping?.estimatedDeliveryDate || new Date(confirmedAt.getTime() + (7 * 24 * 60 * 60 * 1000));
    const deliveryBy = edd.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const address = order.address;

    const supportEmail = "support@allcapz.in";
    const supportPhone = "+91 " + "9910128535";

    const router = useRouter();
    const handleShipping = async () => {
        if (order.status === "processing") {
            const url = await CreateCustomOrder(order);
            if (url) {
                window.open(url, "_blank");
            }
        }
    }

    const handleUpdateStatus = async () => {
        if (order.status === "delivered") return

        if (order.status === "processing") {
            await UpdateOrderStatus(order.id, "shipping")
        } else if (order.status === "shipping") {
            await UpdateOrderStatus(order.id, "delivered")
        }

        window.location.reload();
    }

    const setDeliveryBy = (date: Date | null) => {
        if (date) {
            UpdateEDD(order.id, date).then(() => {
                window.location.reload();
            })
        }
    }

    const updateShippingDetails = async () => {

    }
    

    const [subTotal, setSubTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [discountDesc, setDiscountDesc] = useState("");

    useEffect(() => {
        if (order.products) {
            setSubTotal(order.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0) || 0);
            const disc = getDiscount(order.products);

            setDiscount(disc.discount);
            setDiscountDesc(disc.description);
        }
    }, [order, subTotal])

    return (
        <div className="w-full h-full flex flex-col mt-vw-20 md:mt-vw-10 xl:mt-vw-20 gap-vw-2.5">
            <div className="w-full md:h-[720px] flex flex-col lg:flex-row items-end px-vw-14 gap-vw-14-min@lg">
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
                                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.email}</p>
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
                            <CustomDatePicker deliveryDate={edd} deliveryBy={deliveryBy} setDeliveryBy={setDeliveryBy} />
                        </div>

                        <div className="mt-6 mx-vw-4-max@md text-smTolg lg:text-lgToxl flex flex-col md:flex-row items-center justify-center gap-vw-4 text-[#a4a4a4] font-ibm">
                            <p className="text-[#e95555]">Confirmed</p>
                            <p className='text-accent rotate-[90deg] md:rotate-0'>&gt;</p>
                            <p className="text-[#FFD600]">Processing</p>
                            <p className="rotate-[90deg] md:rotate-0">&gt;</p>
                            <p className={["shipping", "delivered"].includes(order.status) ? "text-[#30ae39]" : ""}>Shipping</p>
                            <p className="rotate-[90deg] md:rotate-0">&gt;</p>
                            <p className={order.status === "delivered" ? "text-[#5b92ff]" : ""}>Delivered</p>
                        </div>

                        <div className="mt-6 w-full px-vw-20-max@md">
                            <p onClick={handleUpdateStatus} className="btn w-full h-auto text-center py-1.5 text-smTolg font-retro">{
                                order.status === "processing" ? "Change to Shipping" : order.status === "shipping" ? "Change to Delivered" : "Order Delivered"
                            }</p>
                        </div>
                    </div>

                    <div className="w-full h-[2px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>

                    <Link target='_blank' href={`https://dashboard.razorpay.com/app/payments/${order.payment_id}`}>
                        <p className="text-xsTosm font-ibm mx-vw-20-max@md mt-3 py-1.5 text-accent text-center font-[600] bg-[#2563EB] dropshadow text-smToLg active:-mb-1 active:-mr-1">
                            View Payment on Razorpay
                        </p>
                    </Link>

                    <p onClick={handleShipping} className="cursor-pointer text-xsTosm font-ibm mx-vw-20-max@md mt-3 py-1.5 text-accent text-center font-[600] bg-[#735AE5] dropshadow text-smToLg active:-mb-1 active:-mr-1">
                        Confirm Shipping via Shiprocket
                    </p>

                    <div className="mt-6 w-full px-vw-20-max@md">
                        <p onClick={updateShippingDetails} className="btn w-full h-auto text-center py-1.5 text-smTolg font-retro">Update Shipping Details</p>
                    </div>

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
                                        <p className="text-smTolg">₹{subTotal}</p>
                                    </div>

                                    {discountDesc && (
                                        <div>
                                            <div className="w-full pt-vw-1 flex flex-row justify-between items-baseline">
                                                <p className="text-smTolg">Discount</p>
                                                <p className="text-smTolg text-red-500">-₹{discount}</p>
                                            </div>

                                            <p className="my-0.5 py-1 opacity-90 font-secondary text-xs border-[1px] border-accent w-full px-4 text-center ">{discountDesc}.</p>
                                        </div>
                                    )}

                                    <div className="pt-vw-1 w-full flex flex-row justify-between items-baseline">
                                        <p className="text-smTolg">Shipping</p>
                                        <p className="text-xsTos text-xs">{"₹0"}</p>
                                    </div>
                                    <div className="py-vw-4 text-xl w-full flex flex-row justify-between items-baseline">
                                        <p className="text-lgTo2xl">Total</p>
                                        <p className="text-lgTo2xl text-green-500">INR ₹{availDiscount(order.products)}</p>
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
