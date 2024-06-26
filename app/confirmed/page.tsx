"use client"
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import { useCartStore } from '../utils/store/cartStore';
import { Products } from './components/Products';
import { Details } from './components/Details';
import { useSession } from '../providers/Session';
import { useRouter, useSearchParams } from 'next/navigation';
import Auth from '../components/Auth';
import { useLoginStore } from '../utils/store/loginStore';
import { GetOrder, OrderType } from '../utils/database/orders';

export default function Confirmed() {
    const { showCart } = useCartStore((state) => state);
    const { showLogin } = useLoginStore((state) => state);

    const { session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push("/");
        }
    }, [router, session])

    const searchParams = useSearchParams();
    const [order, setOrder] = React.useState<OrderType | null>(null);
    useEffect(() => {
        const orderId = searchParams.get("id")
        if (orderId) {
            GetOrder(orderId).then((order) => {
                if (order) setOrder(order)
            })
        }
    }, [searchParams])


    return (
        <div>
            <div className="absolute z-50">
                <Cart />
                <Auth />
            </div>
            <div className={`absolute w-full h-full top-3 md:top-5  ${showCart || showLogin ? `transition-all delay-500 duration-200  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
                <Navbar />

                <div className="w-full h-[85%] py-vw-14-min@lg-max@xl grid ">
                    {order && (
                        <div className="w-full flex flex-col gap-vw-20 lg:gap-0 lg:grid lg:grid-cols-2 pb-10">
                            <Products order={order} />
                            <Details order={order} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}