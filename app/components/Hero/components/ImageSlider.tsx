"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { GetImage } from "../..";

export default function ImageSlider() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        <Image
          src={GetImage("img/new-banner.avif")}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
          className=""
          priority
        />
        <Image
          src={GetImage("img/new-banner.avif")}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
          className=""
          priority
        />
        <Image
          src={GetImage("img/new-banner.avif")}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
          className=""
          priority
        />
      </Slider>
    </div>
  );
}
