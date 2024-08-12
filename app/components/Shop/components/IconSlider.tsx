"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { title } from "process";
import { useMiscStore } from "@/app/utils/store/miscStore";
import Image from "next/image";

interface IconSliderProps {
  icons: string[];
  titles: string[];
  active: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const IconSlider: React.FC<IconSliderProps> = ({ icons, titles, active, setActive }) => {
  var settings = {
    autoplay: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    arrows: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '5px',

  };
  const showIcons = [icons, icons, icons].flat(2);
  const showTitles = [titles, titles, titles].flat(2);

  const { setShowTransition } = useMiscStore((state) => state);
  return (
    <div className="lg:w-[600px] md:w-[500px] w-[400px]">
      <Slider {...settings}>
        {showIcons.flatMap((icon, index) => {
          return (
            <div className="px-10">
              <Image
              src={icon}
              alt="icon"
              width={100}
              height={100}
              sizes="100vh"
              className={`min-w-[150px] h-auto cursor-pointer ${active === showTitles[index] ? "opacity-100" : "grayscale"}`}
              onClick={() => { setActive(showTitles[index]); setShowTransition(true) }}
            />
            </div>
            
          )
        })}
      </Slider>
    </div>
  );
}
