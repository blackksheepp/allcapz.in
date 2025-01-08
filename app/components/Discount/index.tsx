import React, { useEffect, useState } from 'react'

const Discount = () => {
    const [showDiscounts, setShowDiscounts] = useState<boolean>(false);

    return (
        <>
            <div className="absolute z-[400] top-[80px] sm:top-[90px] md:top-[100px] lg:top-[150px] -left-5">
                <button onClick={() => setShowDiscounts(!showDiscounts)} className="btn px-10 lg:px-14 py-2 lg:py-2.5">
                    <p className="font-retro text-center text-xsTolg">
                        Discounts
                    </p>
                </button>
            </div>

            {showDiscounts && (
                <div className="absolute z-[300] w-full h-screen grid place-items-center">
                    <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] h-[550px] lg:h-[500px] bg-black bg-opacity-90 backdrop-blur-xl border-accent border-4 shadow-[5px_5px_0px_0px_rgba(70,70,70)]">

                        <div className="h-full flex flex-col items-center justify-between pt-10 pb-8">
                            <p className="font-retro text-green-500 text-center text-lgTo2xl">Bundle Deal Discounts</p>

                            <ul className="flex flex-col items-center gap-10">
                                <li className="font-ibm text-smTolg px-8 text-center text-white">Get ₹150 off on purchase of 2 posters</li>
                                <li className="font-ibm text-smTolg px-8 text-center text-white">Get ₹250 off on purchase of 3 posters</li>
                                <li className="font-ibm text-smTolg px-8 text-center text-white">Get ₹100 off on each poster on purchase of more than 3 posters</li>
                            </ul>

                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="font-ibm text-smTolg text-center px-4 text-red-500">Limited time offer! <br />Grab before it&apos;s gone!</p>
                                <button onClick={() => setTimeout(() => setShowDiscounts(false), 500)} className="btn px-8 py-1 font-retro">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Discount