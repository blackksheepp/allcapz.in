import { OrderType } from '@/app/utils/database/orders'
import React, { useEffect, useState } from 'react'
import ProductPreview from './ProductPreview'
import { AddressType, GetAddress } from '@/app/utils/database/addresses'
import { useSession } from '@/app/providers/Session'
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

  const orderedOn = order.confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const edd = order.shipping?.estimatedDeliveryDate || new Date(order.confirmedAt.getTime() + (7 * 24 * 60 * 60 * 1000));
  const deliveryBy = edd.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const address = order.address;

  const supportEmail = "support@allcapz.com";
  const supportPhone = "+91 " + "1234567890";

  return (
    <div className="w-full h-full flex flex-col mt-vw-10 gap-vw-2.5">

      <div className="w-full flex flex-col pl-vw-14 py-2 lg:py-1">
        <p className="text-smTolgTo2xl font-retro text-accent">Order Details</p>
        <p className="text-xsTosm font-ibm text-accent">This page will update as your order progresses</p>
      </div>

      <div className="w-full md:h-[600px] flex flex-col lg:flex-row items-end px-vw-14 gap-vw-14-min@lg">
        <div className="w-full h-full py-vw-6-min@lg px-vw-6-min@md border-[3px] border-dashed border-[#c4c4c4] ">

          <p className="text-lgToxl font-ibm font-[500] text-accent">Order ID: #{order.id.replace("order_", "")}</p>

          <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>
          <div className="w-full flex flex-col gap-vw-5-min@lg items-center px-vw-4-max@md">
            <div className="w-full justify-between flex flex-row items-baseline">
              <p className="text-lgToxl font-ibm font-[500] text-white">Order Status</p>
              <p className="md:items-center flex flex-col md:gap-2 md:flex-row text-smTolg font-ibm font-[500] text-accent text-end">
                <p>Arriving</p>
                <p>{deliveryBy}</p>
              </p>
            </div>

            <div className="text-smTolg lg:text-lgToxl flex flex-col md:flex-row md:gap-3 items-center justify-center text-[#a4a4a4] font-ibm">
              <p className="text-[#e95555]">Confirmed</p>
              <p className='text-accent rotate-[90deg] md:rotate-0'>&gt;</p>
              <p className="text-[#FFD600]">Processing</p>
              <p className="rotate-[90deg] md:rotate-0">&gt;</p>
              <p className={["shipping", "delivered"].includes(order.status) ? "text-[#30ae39]" : ""}>Shipping</p>
              <p className="rotate-[90deg] md:rotate-0">&gt;</p>
              <p className={order.status === "delivered" ? "text-[#5b92ff]" : ""}>Delivered</p>
            </div>

            <p className="self-start text-xsTosm font-ibm text-accent">&gt; Tracing ID will be provided once the order has Processed</p>

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
                <p className="text-lgToxl font-ibm font-[500] text-white">Shipping Address</p>
              </div>
              <div className="flex flex-col md:text-end">
                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.street}</p>
                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.address}</p>
                <p className="text-smTolg font-ibm text-[#a4a4a4]">{address?.postalCode}, {address?.city}</p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white my-vw-6-min@lg-max@xl opacity-[40%]"></div>

          <div className="w-full flex flex-col gap-1 px-vw-4-max@md">
            <div>
              <p className="text-lgToxl font-ibm font-[500] text-white">Customer Support</p>
            </div>
            <div className="flex flex-col">
              <p className="text-smTolg font-ibm text-[#a4a4a4]">{supportEmail}</p>
              <p className="text-smTolg font-ibm text-[#a4a4a4]">{supportPhone}</p>
            </div>
          </div>
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
                    <p className="text-smTolg">₹{order?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
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
