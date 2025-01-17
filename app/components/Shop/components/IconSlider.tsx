"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { useMiscStore } from "@/app/utils/store/miscStore";
import Image from "next/image";

interface IconSliderProps {
  icons: string[];
  titles: string[];
  active: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const IconSlider: React.FC<IconSliderProps> = ({
  icons,
  titles,
  active,
  setActive,
}) => {
  const settings = {
    autoplay: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    arrows: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "5px",
  };

  const showIcons = [icons, icons, icons].flat(2);
  const showTitles = [titles, titles, titles].flat(2);

  const { setShowTransition } = useMiscStore((state) => state);




  return (
    <div className="xl:w-[800px] lg:w-[650px] md:w-[500px] sm:w-[470px] w-[350px]">
      <Slider {...settings}>
        {showIcons.flatMap((icon, index) => {
          return (
            <div key={`${icon}-${index}`} className="px-4 flex justify-center items-center">
              <Image
                src={icon}
                alt="icon"
                width={150}
                height={150}
                sizes="100vw"
                className={`lg:min-w-[165px] min-w-[40px] cursor-pointer ${active === showTitles[index] ? "opacity-100" : "solid-gray"
                  }`}
                onClick={() => {
                  setActive(showTitles[index]);
                  setShowTransition(true);
                }}
                priority
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
