import { useSession } from '@/app/providers/Session'
import { GetOrders, OrderType } from '@/app/utils/database/orders';
import React, { useEffect, useState } from 'react'
import PreviewOrder from './PreviewOrder';
import { useRouter } from 'next/navigation';

export const Orders = () => {
    const { session } = useSession();
    const router = useRouter();

    const [orders, setOrders] = useState<OrderType[]>([]);
    const setOrder = (order: OrderType) => {
        router.push("/profile?order="+order.id)
    }

    useEffect(() => {
        if (session) {
            GetOrders(session.email).then((orders) => {
                if (orders) {
                    const sortedOrders = orders.sort((a, b) => {
                        return b.confirmedAt.getTime() - a.confirmedAt.getTime();
                    })
                    setOrders(sortedOrders)
                }
            })
        }
    }, [session])

    return (
        <div className="w-full flex flex-col pl-vw-14 pr-vw-10 gap-3">
            <div className="flex flex-col gap-vw-1">
                <p className="text-lgTo2xl font-retro text-accent">Hey, {session?.name}</p>
                <p className="text-xsTosm font-ibm text-accent">Here are your orders</p>
            </div>
            <div className="w-full h-[600px] overflow-scroll border-[3px] border-dashed border-[#c4c4c4]">
                {orders.length > 0 ? (
                    <div className="mt-7 w-full flex flex-col items-center">
                        <div className="w-[90%] h-[1px] bg-accent opacity-50 relative"></div>
                        {orders.flatMap((order: OrderType, index: number) => {
                            return (
                                <div key={index} className="w-full flex flex-col items-center">
                                    <div className="w-[95%] cursor-pointer" onClick={() => setOrder(order)}>
                                        <PreviewOrder order={order} />
                                    </div>
                                    <div className="w-[90%] h-[1px] bg-accent opacity-50"></div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="w-full h-full grid place-items-center">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <p className="text-lgTo2xl font-retro text-accent">No Orders Made Yet</p>
                            <button className="btn px-8 py-1.5">
                                <p className="font-retro text-center text-xsTosm">
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

