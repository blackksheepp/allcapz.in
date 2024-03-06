"use client";
import React, { useEffect, useState } from "react";
import { PageTransitionLayout } from "@/layouts/PageTransitionLayout";
import { TextureOverlay } from "../TextureOverlay";

const Cart = ({
  showCart,
  onClick,
}: {
  showCart: boolean;
  onClick: React.MouseEventHandler;
}) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 640);

    // if (showCart) {
    //   document.body.classList.add("overflow-hidden");
    // } else {
    //   document.body.classList.remove("overflow-hidden");
    // }

    // return () => {
    //   document.body.classList.remove("overflow-hidden");
    // };
    
  }, [mobile]);

  return (
      <PageTransitionLayout animate={showCart} mobile={mobile}>
      <div className="w-full h-screen flex items-center justify-between">
        <TextureOverlay />  
        <div className="z-10 w-full h-full py-vw-12-min@xl flex flex-col items-center justify-between mx-auto inset-x-0 max-w-max">
          <p className="text-accent font-retro text-2xl">
            CART
          </p>
          <p className="text-accent font-retro lg:text-xl md:text-xl text-lg">Nothing to see here.</p>
          <button
            className="btn w-[300px] h-[40px] font-retro text-black"
            onClick={onClick}
          >
            CLOSE
          </button>
        </div>
      </div>
    </PageTransitionLayout>
  );
};

export default Cart;
