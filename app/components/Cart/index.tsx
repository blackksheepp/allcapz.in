"use client";
import React, { useEffect, useState } from "react";
import { CartTransition } from "@/layouts/CartTransition";
import { FitTexture } from "../TextureOverlay";
import { CartType, GetCart } from "@/app/utils/database/carts";
import { CartCookieType, GetCartFromCookies } from "@/app/utils/cookies/cart";
import { useSession } from "@/app/Providers/Session";
import Image from "next/image";
const Cart = ({
  showCart,
  onClick,
}: {
  showCart: boolean;
  onClick: React.MouseEventHandler;
}) => {
  const [mobile, setMobile] = useState(false);
  const [cart, setCart] = useState<CartType | CartCookieType | null>(null);
  const { session } = useSession();

  useEffect(() => {
    (async () => {
      if (session) {
        setCart(await GetCart(session.email))
      } else {
        const cartCookie = await GetCartFromCookies();
        if (cartCookie) {
          setCart(JSON.parse(cartCookie))
        }
      }
    })()

    setMobile(window.innerWidth < 640);

    if (showCart) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }


    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCart, mobile, session]);

  return (
    <CartTransition animate={showCart} mobile={mobile}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <FitTexture />
        <div className="w-full flex flex-row items-center justify-between px-10 pt-8">
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
        <div className="z-10 w-full h-screen flex flex-col mt-10">
          {cart ? (<div className="w-full flex flex-col gap-5 items-start justify-center">
            {cart.products.flatMap(product => {
              return <div className="w-full flex flex-row justify-center gap-5 px-10">
                <div className="w-full flex flex-row justify-center gap-5"><Image
                  src={product.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[90px] h-auto self-start opacity-90"
                />
                  <div className="w-full py-1 flex flex-col justify-between gap-2 text-accent opacity-80 font-retro text-sm">
                    <div className="flex flex-col gap-2"><p>{product.title}</p>
                      <p>{product.price.toFixed(2)}</p></div>
                    <p className="text-[20px]"> - 1 + </p>
                  </div></div>
                <Image
                  src="/img/trash.svg"
                  alt="trash"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[25px] cursor-pointer mb-4 mr-2 opacity-90"
                  onClick={() => { }}
                />
              </div>
            })}
          </div>) : <p className="text-accent font-retro text-sm box-border w-full h-[400px] grid place-items-center">Nothing to see here.</p>}
        </div>
      </div>
    </CartTransition>
  );
};

export default Cart;
