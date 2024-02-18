"use client";
import React, { useEffect } from "react";
import { PageTransitionLayout } from "@/layouts/PageTransitionLayout";
import { TextureOverlay } from "../TextureOverlay";

const Cart = ({
  showCart,
  onClick,
}: {
  showCart: boolean;
  onClick: React.MouseEventHandler;
}) => {
  
  useEffect(() => {
    if (showCart) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCart]);

  return (
      <PageTransitionLayout animate={showCart}>
      <div className="opacity-[30%]">
        <TextureOverlay />
      </div>
      <div className="w-full h-screen flex items-center justify-between">
        <div className="z-10 w-full flex flex-col items-center justify-between gap-5 mx-auto inset-x-0 max-w-max">
          <p className="text-accent font-retro dropshadow text-lg">
            Whoooooooshhh! Empty.
          </p>
          <button
            className="btn w-bw h-bh font-retro text-black"
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
