"use client";
import React, { useEffect, useState } from "react";
import { WithAuth } from "../components/WithAuth";
import Cart from "../components/Cart";
import Auth from "../components/Auth";
import { useCartStore } from "../utils/store/cartStore";
import { useLoginStore } from "../utils/store/loginStore";
import Navbar from "../components/Navbar";
import PreviewOrder from "../profile/components/PreviewOrder";
import { GetOrder, GetOrders, OrderType } from "../utils/database/orders";
import { GetUsers } from "../utils/database/users";
import { useRouter } from "next/navigation";

function Orders() {
    const { showCart } = useCartStore((state) => state);
    const { showLogin } = useLoginStore((state) => state);

    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        (async () => {
            const users = await GetUsers();
            const getOrders: OrderType[] = [];

            if (users) {
                for (const user of users) {
                    const userOrders = await GetOrders(user.email);
                    if (userOrders) {
                        getOrders.push(...userOrders);
                    }
                }
            }
            setOrders(getOrders.sort((a, b) => {
                return b.confirmedAt.getTime() - a.confirmedAt.getTime();
            }));
        })();
    }, []);

    const router = useRouter();
    const handleClick = (order: OrderType) => {
        router.push("/orders/"+order.id.replace("order_", ""));
    }

    return (
        <WithAuth>
            <div>
                <div className="absolute z-50">
                    <Cart />
                    <Auth />
                </div>
                <div className={`absolute w-full h-full top-3 md:top-5  ${showCart || showLogin ? `transition-all delay-500 duration-200  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
                    <div>
                        <Navbar showProfile={false} />
                    </div>

                    <div className="w-full h-[85%] py-14 grid ">
                        <div className="w-full h-full flex flex-col pl-vw-14 pr-vw-10 gap-3">
                            <div className="w-full min-h-[600px] h-full overflow-scroll border-[3px] border-dashed border-[#c4c4c4]">
                                {orders && orders.length > 0 && orders.flatMap((order: OrderType, i: number) => {
                                    return (
                                        <div key={i} className="w-full flex flex-col items-center" onClick={() => handleClick(order)}>
                                            <div className="w-[95%] cursor-pointer my-2">
                                                <PreviewOrder order={order} />
                                            </div>
                                            <div className="w-[95%] h-[1px] bg-accent opacity-50"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WithAuth>
    );
}

export default Orders;