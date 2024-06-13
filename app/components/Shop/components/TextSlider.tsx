"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { title } from "process";
import { useTransitionStore } from "@/app/utils/store/transitionStore";

interface TitleSliderProps {
  titles: string[];
  active: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const TextSlider: React.FC<TitleSliderProps> = ({ titles, active, setActive }) => {
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
  const showTitles = [titles, titles, titles].flat(2);

  const { set: setShowTransition } = useTransitionStore((state) => state);
  return (
    <div className="lg:w-[500px] md:w-[400px] w-[300px] text-center">
      <Slider {...settings}>
        {showTitles.flatMap(title => <p onClick={() => { setActive(title); setShowTransition(true) }} className={`${title == active ? "text-accent text-xlTo3xl opacity-100" : "text-gray-400 text-lgTo2xl opacity-60"} cursor-pointer`}>{title}</p>)}
      </Slider>
    </div>
  );
}
