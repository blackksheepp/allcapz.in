import React from 'react'
import Image from 'next/image';
import { useImagesStore } from '@/app/utils/store/imagesStore';

export const Polaroid = ({ title, url, collection }: { title: string; url: string, collection: string }) => {
  const { images, loadImage } = useImagesStore((state) => state);

  const handleOnLoad = (url: string) => {
    loadImage(collection, url);
    console.log(images)
  }

  return (
    <div className="relative w-vw-52-min@xl sm:w-vw-52-min@lg md:w-vw-52-min@xl mb-vw-14-min@md rotate-1 cursor-pointer" >
      <Image
        src="/img/polaroid.svg"
        alt="p-1"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute w-full h-auto"
      />
      <div className="pt-vw-3-min@xl sm:pt-vw-3-min@lg md:pt-vw-3-min@xl">
        <div className="box-content w-vw-46-min@xl sm:w-vw-46-min@lg md:w-vw-46-min@xl h-vw-46-min@xl sm:h-vw-46-min@lg md:h-vw-46-min@xl ml-vw-1-min@md sm:ml-vw-1-min@lg md:ml-vw-1-min@xl grid place-items-center">
          <Image
            src={url}
            alt="p-1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            onLoad={() => handleOnLoad(url)}
          />
        </div>
      </div>
      <div className="relative">
        <div className="box-content w-vw-47-min@xl sm:w-vw-47-min@lg md:w-vw-47-min@xl h-vw-12-min@xl sm:h-vw-12-min@lg md:h-vw-12-min@xl  font-indie text-black md:text-2xl sm:text-xl text-2xl grid place-items-center">
          {title}
        </div>
      </div>
    </div>
  );
};
