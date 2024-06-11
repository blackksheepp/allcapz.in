import { useSession } from '@/app/providers/Session'
import { GetOrders, OrderType } from '@/app/utils/database/orders';
import React, { useEffect, useState } from 'react'
import Order from './Order';

export const Orders = () => {
    const { session } = useSession();
    
    const [orders, setOrders] = useState<OrderType[]>([]);
    useEffect(() => {
        if (session) {
            GetOrders(session.email).then((orders) => {
                if (orders) setOrders(orders)
            })
        }
    }, [session])

    return (
        <div className="w-full h-full flex flex-col pl-vw-14 pr-vw-10 gap-3">
            <div className="flex flex-col gap-vw-1">
                <p className="text-lgTo2xl font-retro text-accent">Hey, {session?.name}</p>
                <p className="text-xsTosm font-ibm text-accent">Here are your orders</p>
            </div>
            <div className="w-full min-h-[600px] min-h-100 border-[3px] border-dashed border-[#c4c4c4]">
                {orders.length > 0 ? (
                    <div className="mt-7 w-full flex flex-col items-center">
                        <div className="w-[90%] h-[1px] bg-accent opacity-50 relative"></div>
                        {[].concat(...Array(3).fill(orders)).flatMap((order: OrderType, index: number) => {
                            return (
                                <div key={index} className="w-full flex flex-col items-center">
                                    <Order order={order}/>
                                    <div className="w-[90%] h-[1px] bg-accent opacity-50"></div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                        <div className="w-full h-full grid place-items-center">
                            <div className="flex flex-col gap-3 items-center justify-center">
                                <p className="text-2xl font-retro text-accent">No Orders Made Yet</p>
                                <button className="btn px-8 py-1.5">
                                    <p className="font-retro text-center text-[16px]">
                                        SHOP NOW
                                    </p>
                                </button>
                            </div>
                        </div>
                )}
            </div>
        </div>
    )
}

