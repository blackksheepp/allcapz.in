"use client";
import React, { useEffect, useState } from "react";
import { CartTransition } from "@/layouts/CartTransition";
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

    if (showCart) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };

  }, [showCart, mobile]);

  return (
    <CartTransition animate={showCart} mobile={mobile}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <TextureOverlay />
        <div className="w-full flex flex-row items-center justify-between px-7 pt-8">
          <p className="text-accent font-retro text-xl">
            CART
          </p>
          <button
            className="btn w-[85px] h-[35px] font-retro text-black"
            style={{ fontSize: "14px" }}
            onClick={onClick}
          >
            CLOSE
          </button>
        </div>
        <div className="z-10 w-full h-screen flex flex-col items-center justify-center">
          <p className="text-accent font-retro text-sm box-border w-full h-[400px] grid place-items-center">Nothing to see here.</p>
        </div>
      </div>
    </CartTransition>
  );
};

export default Cart;
