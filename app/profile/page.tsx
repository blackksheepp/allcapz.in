"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import { useCartStore } from '../utils/store/cartStore';
import { Orders } from './components/Orders';
import { PersonalInformation } from './components/PersonalInformation';
import { useSession } from '../providers/Session';
import { useRouter } from 'next/navigation';
import Addresses from './components/Addresses';

export default function Profile() {
    const { showCart } = useCartStore((state) => state);
    const { session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push("/");
        }
    }, [session, router])

    const [manageAddress, setManageAddress] = useState(false);
    return (
        <div>
            <div className="absolute z-50">
                <Cart />
            </div>
            <div className={`absolute w-full h-full top-3 md:top-5  ${showCart ? `transition-all delay-500 duration-200  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
                <Navbar showProfile={false} />
                <div className="w-full h-full mt-vw-20">
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
                </div>
            </div>
        </div>
    )
}