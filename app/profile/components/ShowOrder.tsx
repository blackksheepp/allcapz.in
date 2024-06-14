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

  console.log(currentStatus, "currentStatus")
  const confirmedAt = new Date(order.confirmedAt)
  const orderedOn = confirmedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const edd = new Date(confirmedAt.getTime() + (5 * 24 * 60 * 60 * 1000));
  const deliveryBy = edd.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const [address, setAddress] = useState<AddressType | null>(null);
  useEffect(() => {
    GetAddress(order.address).then((resp) => {
      if (resp) setAddress(resp);
    })
  })

  const supportEmail = "support@allcapz.com";
  const supportPhone = "+91 " + "1234567890";

  return (
    <div className="w-full h-[80%] grid place-items-center">
      <div className="w-[85%] flex flex-col gap-vw-2.5">
        <div className="w-full flex flex-col">
          <p className="text-lgTo2xl font-retro text-accent">Order Details</p>
          <p className="text-xsTosm font-ibm text-accent">This page will update as your order progresses</p>
        </div>
        <div className="w-full  flex flex-col lg:flex-row items-center gap-10 justify-between">
          <div className="w-full lg:w-[48%] min-h-[600px] pt-vw-3 pl-vw-4 h-full border-[3px] border-dashed border-[#c4c4c4] ">

            <p className="text-lg  font-ibm font-[500] text-accent mb-vw-4">Order ID: #{order.id.replace("order_", "")}</p>

            <div className="w-[85%] h-[1px] bg-white"></div>

            <div className="w-full flex flex-col text-xl font-ibm font-[500] text-accent gap-3 py-vw-3">
              <div className="w-full flex flex-row items-center">
                <p className={`text-[#C95050]`}>&gt; Confirmed On</p>
                <p>: {orderedOn}</p>
              </div>
              <div className="w-full flex flex-row items-center">
                <p className={`text-[${currentStatus.includes("processing") ? statusColors["processing"] : "#a4a4a4"}]`}>&gt; Processing</p>
                <p>: In Progress</p>
              </div>
              <div className="w-full flex flex-row items-center">
                <p className={`text-[${currentStatus.includes("shipping") ? statusColors["shipping"] : "#a4a4a4"}]`}>&gt; Shipping</p>
                <p>: Pending</p>
              </div>
              <div className="w-full flex flex-row items-center">
                <p className={`text-[${currentStatus.includes("delivered") ? statusColors["delivered"] : "#a4a4a4"}]`}>&gt; Delivered</p>
                <p>: Expected by {deliveryBy}</p>
              </div>
            </div>

            <div className="w-[85%] h-[1px] bg-white"></div>

            <div className="w-full flex flex-row justify-between py-vw-3">
              <div className="w-full flex flex-col gap-2">
                <p className="text-xl font-ibm font-[500] text-white">Contact Details</p>
                <div className="flex flex-col">
                  <p className="text-lg font-ibm font-[500] text-accent">{address?.fname + " " + address?.lname}</p>
                  <p className="text-lg font-ibm text-[#a4a4a4]">{session?.email}</p>
                  <p className="text-lg font-ibm text-[#a4a4a4]">{address?.phone}</p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div>
                  <p className="text-xl font-ibm font-[500] text-white">Shipping Address</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-ibm text-[#a4a4a4]">{address?.street}</p>
                  <p className="text-lg font-ibm text-[#a4a4a4]">{address?.address}</p>
                  <p className="text-lg font-ibm text-[#a4a4a4]">{address?.postalCode}, {address?.city}</p>
                  <p className="text-lg font-ibm text-[#a4a4a4]">India</p>
                </div>
              </div>
            </div>

            <div className="w-[85%] h-[1px] bg-white"></div>

            <div className="w-full flex flex-col gap-2 pt-vw-3">
              <div>
                <p className="text-xl font-ibm font-[500] text-white">Customer Support</p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-ibm text-[#a4a4a4]">{supportEmail}</p>
                <p className="text-lg font-ibm text-[#a4a4a4]">{supportPhone}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[48%] h-auto lg:h-[600px] border-[3px] border-dashed border-[#c4c4c4]">
            <p className="text-2xl pt-vw-4 pl-vw-4 font-ibm font-[500] text-white">Product Summary</p>
            <div className="w-full pb-vw-7 px-vw-7 pt-vw-4">
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
      </div>
    </div >
  )
}
