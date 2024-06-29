"use client"
import Cart from '@/app/components/Cart';
import Navbar from '@/app/components/Navbar';
import { GetOrder, OrderType } from '@/app/utils/database/orders';
import { useCartStore } from '@/app/utils/store/cartStore';
import { useEffect, useState } from 'react';
import { ShowOrder } from './components/ShowOrder';

export default function Order({ params }: { params: { id: string } }) {
    const id = params.id;
    const { showCart } = useCartStore((state) => state);

    const [order, setOrder] = useState<OrderType>();
    useEffect(() => {
        console.log(id, "order");
        GetOrder('order_'+id).then((order) => {
            if (order) setOrder(order)
        })
    }, [id])

    return id && (
        <div className="h-full overflow-y-hidden">
            <div className="absolute z-50">
                <Cart />
            </div>
            <div className={`absolute w-full h-full flex flex-col top-3 md:top-5 ${showCart ? `transition-all delay-500 duration-200 ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
                <Navbar showProfile={false} />
                {order ? (
                    <ShowOrder order={order}></ShowOrder>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    )
}