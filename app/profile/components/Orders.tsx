import { useSession } from '@/app/providers/Session'
import React from 'react'

export const Orders = () => {
    const { session } = useSession();
    return (
        <div className="w-full h-full flex flex-col pl-vw-14 pr-vw-10 gap-3">
            <div className="flex flex-col gap-1">
                <p className="text-2xl font-retro text-accent">Hey, {session?.name}</p>
                <p className="text-sm font-ibm text-accent">Here are your orders</p>
            </div>
            <div className="w-full min-h-[600px] min-h-100 border-[3px] border-dashed border-[#c4c4c4] grid place-items-center">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <p className="text-2xl font-retro text-accent">No Orders Made Yet</p>
                    <button className="btn px-8 py-1.5">
                        <p className="font-retro text-center text-[16px]">
                            SHOP NOW
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

