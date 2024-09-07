"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { GetImage } from '@/app/components';
import { useMiscStore } from '@/app/utils/store/miscStore';

export const Polaroid = ({ title, id }: { title: string; id: string }) => {
  const { preloader, showPreloader } = useMiscStore((state) => state);

  const handleOnLoad = () => {
    if (preloader) {
      setTimeout(() => showPreloader(false), 1000);
    }
  }
  const image = GetImage(id);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth < 768);
    }
  }, []);
  
  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div style={{rotate: `${getRandomNumber(-4, 4)}deg` }} className="relative w-vw-52-min@xl sm:w-vw-52-min@lg md:w-vw-52-min@xl mb-vw-14-min@md cursor-pointer" >
      <Image
        src={GetImage("img/polaroid-white.avif")}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="absolute w-full h-auto"
        priority
      />
      <div className="pt-vw-3-min@xl sm:pt-vw-3-min@lg md:pt-vw-3-min@xl">
        <div className="box-content w-vw-46-min@xl sm:w-vw-46-min@lg md:w-vw-46-min@xl h-vw-46-min@xl sm:h-vw-46-min@lg md:h-vw-46-min@xl ml-vw-4-min@md  grid place-items-center">
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes={mobile ? "50vw" : "15vw"}
            className="w-full h-auto"
            priority
            onLoad={handleOnLoad}
          />
        </div>
      </div>
      <div className="relative">
        <div className="box-content w-vw-52-min@xl sm:w-vw-52-min@lg md:w-vw-52-min@xl h-vw-25-min@xl sm:h-vw-25-min@lg md:h-vw-25-min@xl font-gloria text-black xl:text-2xl lg:text-xl md:text-xl sm:text-lg  grid place-items-center">
          {title}
        </div>
      </div>
    </div>
  );
};
