import { useSession } from '@/app/providers/Session'
import { AddressType, GetAddress } from '@/app/utils/database/addresses'
import { OrderType } from '@/app/utils/database/orders'
import { GetRazorpayPayment } from '@/app/utils/payment'
import { useSearchParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'

interface DetailsProps {
    order: OrderType
}

export const Details: FC<DetailsProps> = ({ order }) => {
    const { session } = useSession();
    var date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    const edd = date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    const searchParams = useSearchParams();
    const [address, setAddress] = useState<AddressType | null>(null);
    useEffect(() => {
        const addressId = searchParams.get("addressId");
        if (addressId) {
            GetAddress(addressId).then((address) => {
                if (address) setAddress(address);
            })
        }
    }, [])

    const [razorpayPayment, setRazorpayPayment] = useState<any | null>(null);
    useEffect(() => {
        const paymentId = searchParams.get("paymentId");
        setTimeout(() => {
            if (paymentId) {
                GetRazorpayPayment(paymentId).then((payment) => {
                    setRazorpayPayment(payment);
                })
            }
        }, 500)
    }, [])

    const supportEmail = "support@allcapz.com";
    const supportPhone = "+91 " + "1234567890";

    return (
        <div className="w-full h-full flex flex-col pr-vw-14 pl-vw-10 gap-3">
            <div className="flex flex-col gap-1 items-end">
                <p className="text-3xl font-retro text-[#FFD600]">Processing</p>
                <p className="text-lg font-ibm text-accent">Order Status</p>
            </div>
            <div className="w-full h-full border-[3px] border-dashed border-[#c4c4c4] flex flex-col py-10 px-14 gap-6">
                <div className="w-full flex flex-row items-center justify-between">
                    <p className="text-xl font-ibm font-[500] text-white">Estimated Delivery</p>
                    <p className="text-lg font-ibm font-[400] text-[#FFD600]">{edd}</p>
                </div>

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

                <div className="w-full flex flex-row items-center justify-between">
                    <p className="text-xl font-ibm font-[500] text-white">Payment Method</p>
                    <p className="text-lg font-ibm font-[400] text-[#a4a4a4]">{razorpayPayment?.method.toUpperCase()}</p>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <div>
                        <p className="text-xl font-ibm font-[500] text-white">Customer Support</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-ibm text-[#a4a4a4]">{supportEmail}</p>
                        <p className="text-lg font-ibm text-[#a4a4a4]">{supportPhone}</p>
                        <p className="font-ibm text-[#a4a4a4]">(If you want to change your details, call us asap.)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

