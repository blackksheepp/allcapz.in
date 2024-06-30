import React from "react";
import ImageSlider from "./components/ImageSlider";

const Hero = () => {
  return (
    <div className="mt-vw-10-min@lg-max@xl w-full bg-transparent py-vw-2.5-max@xl grid place-items-center">
      <div className="w-vw-300-max@sm mx-auto md:scale-[120%] lg:scale-[140%]">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Hero;
