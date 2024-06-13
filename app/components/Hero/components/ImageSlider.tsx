"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function ImageSlider() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        <Image
          src="/img/banner.avif"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
        <Image
          src="/img/banner.avif"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
        <Image
          src="/img/banner.avif"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
      </Slider>
    </div>
  );
}
