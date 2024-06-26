"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import { useCartStore } from '../utils/store/cartStore';
import { Orders } from './components/Orders';
import { ShowOrder } from './components/ShowOrder';
import { PersonalInformation } from './components/PersonalInformation';
import { useSession } from '../providers/Session';
import { useRouter, useSearchParams } from 'next/navigation';
import Addresses from './components/Addresses';
import { GetOrder, OrderType } from '../utils/database/orders';

export default function Profile() {
    const { showCart } = useCartStore((state) => state);
    const { session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [manageAddress, setManageAddress] = useState(false);

    useEffect(() => {
        if (!session) {
            router.push("/");
        } else {
            if (searchParams.get("manageAddress") == "true") {
                console.log("called")
                setManageAddress(true)
            }
            else setManageAddress(false)
        }
    }, [session, router, searchParams])


    useEffect(() => {
        if (!searchParams.get("manageAddress")) {
            if (manageAddress) {
                console.log("called 2")
                router.push("/profile?manageAddress=true")
            }
        }
    }, [manageAddress, router, searchParams])

    const [order, setOrder] = useState<OrderType | null>(null);
    useEffect(() => {
        if (searchParams.get("order")) {
            GetOrder(searchParams.get("order")!).then((order) => {
                if (order) setOrder(order)
            })
        } else {
            setOrder(null)
        }
    }, [searchParams])
    return (
        <div className="h-full overflow-y-hidden">
            <div className="absolute z-50">
                <Cart />
            </div>
            <div className={`absolute w-full h-full flex flex-col top-3 md:top-5  ${showCart ? `transition-all delay-500 duration-200  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
                    <Navbar showProfile={false} />
                {!order ? (<div className="w-full py-vw-14-min@lg-max@xl">
                    {!manageAddress ? (
                        <div className="w-full grid grid-cols-1 lg:mt-0 lg:grid-cols-2">
                            <Orders />
                            <PersonalInformation setManageAddress={setManageAddress} />
                        </div>
                    ) : (
                        <div className="grid place-items-center">
                            <Addresses />
                        </div>
                    )}
                </div>) : (
                    <ShowOrder order={order} />
                )}
            </div>
        </div>
    )
}

