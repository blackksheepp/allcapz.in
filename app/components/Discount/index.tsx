import Image from 'next/image';
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
                    <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] min-h-[550px] lg:min-h-[500px] bg-black bg-opacity-90 backdrop-blur-xl border-accent border-4 shadow-[5px_5px_0px_0px_rgba(70,70,70)]">

                        <div className="h-full flex flex-col items-center justify-between pt-10 pb-8">
                            <div className="flex flex-col items-center justify-center gap-1">
                                <p className="font-retro text-green-400 text-center text-lgTo2xl">Bundle Deal Discounts</p>
                                <p className="font-ibm text-smTolg text-center px-4 text-green-300">Limited time offer! Grab before it&apos;s gone!</p>
                            </div>

                            <ul className="w-full flex flex-col items-center gap-10 mt-14 mb-5">
                                <div className="w-full flex flex-row items-center justify-center">
                                    <div className="w-full flex flex-col items-center justify-center gap-5">
                                        <div className="relative mr-4 rotate-[-10deg]">
                                            <Image
                                                src="https://media.allcapz.in/676d91049acc1cae48df1f8a.avif"
                                                alt=''
                                                width={0}
                                                height={0}
                                                sizes='30vw'
                                                className="w-20 h-auto"
                                            />
                                            <Image
                                                src="https://media.allcapz.in/678a917abb5448552723b30c.avif"
                                                alt=''
                                                width={0}
                                                height={0}
                                                sizes='80vw'
                                                className="w-20 h-auto rotate-[10deg] absolute top-2 left-2"
                                            />
                                        </div>
                                        <li className="font-retro text-smTolg text-center text-white px-">₹150 off, on 2 posters</li>
                                    </div>

                                    <div className="w-full flex flex-col items-center justify-center gap-5">
                                        <div className="relative rotate-[-20deg] mr-8">
                                            <Image
                                                src="https://media.allcapz.in/676d91049acc1cae48df1f8a.avif"
                                                alt=''
                                                width={0}
                                                height={0}
                                                sizes='30vw'
                                                className="w-20 h-auto"
                                            />
                                            <Image
                                                src="https://media.allcapz.in/678a917abb5448552723b30c.avif"
                                                alt=''
                                                width={0}
                                                height={0}
                                                sizes='30vw'
                                                className="w-20 h-auto rotate-[10deg] absolute top-2 left-2"
                                            />
                                            <Image
                                                src="https://media.allcapz.in/678a8f5cbb5448552723b308.avif"
                                                alt=''
                                                width={0}
                                                height={0}
                                                sizes='80vw'
                                                className="w-20 h-auto rotate-[20deg] absolute top-4 left-4"
                                            />
                                        </div>
                                        <li className="font-retro text-smTolg text-center text-white px-">₹250 off, on 3 posters</li>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-center justify-center gap-5">
                                    <div className="relative mr-12 rotate-[-30deg]">
                                        <Image
                                            src="https://media.allcapz.in/676d91049acc1cae48df1f8a.avif"
                                            alt=''
                                            width={0}
                                            height={0}
                                            sizes='30vw'
                                            className="w-20 h-auto"
                                        />
                                        <Image
                                            src="https://media.allcapz.in/678a917abb5448552723b30c.avif"
                                            alt=''
                                            width={0}
                                            height={0}
                                            sizes='30vw'
                                            className="w-20 h-auto rotate-[10deg] absolute top-2 left-2"
                                        />
                                        <Image
                                            src="https://media.allcapz.in/678a8f5cbb5448552723b308.avif"
                                            alt=''
                                            width={0}
                                            height={0}
                                            sizes='30vw'
                                            className="w-20 h-auto rotate-[20deg] absolute top-4 left-4"
                                        />
                                        <Image
                                            src="https://media.allcapz.in/678a979cbb5448552723b30d.avif"
                                            alt=''
                                            width={0}
                                            height={0}
                                            sizes='80vw'
                                            className="w-20 h-auto rotate-[30deg] absolute top-6 left-6"
                                        />
                                    </div>
                                    <li className="font-retro text-smTolg px-8 text-center text-white">₹100 off each, on 3+ posters</li>
                                </div>
                            </ul>

                            <div className="flex flex-col items-center justify-center gap-5">
                                <button onClick={() => setTimeout(() => setShowDiscounts(false), 500)} className="btn px-10 py-1 font-retro">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Discount