"use client";
import React, { useEffect, useState } from "react";
import { CartTransition } from "@/layouts/CartTransition";
import { FitTexture } from "../TextureOverlay";
import { CartType, DecreaseQnty, GetCart, IncreaseQnty, RemoveFromCart } from "@/app/utils/database/carts";
import { CartCookieType, DecreaseQntyCookies, GetCartFromCookies, IncreaseQntyCookies, RemoveFromCartCookies } from "@/app/utils/cookies/cart";
import Image from "next/image";
import { ProductType } from "@/app/utils/database/collections";
import { useSession } from "@/app/Providers/Session";
import { motion, useMotionValue } from 'framer-motion';

const CartProduct = ({ product, onClick }: { product: ProductType, onClick: () => void }) => {
    const [stateProduct, setStateProduct] = useState(product);

  const [x, setX] = useState("0");
  const removeProduct = () => {
    setX("100%");
    onClick();
  };

  const { session } = useSession();

  const decreaseQnty = async () => {
    var updatedProduct: ProductType | undefined = undefined;
    if (session) {
      updatedProduct = await DecreaseQnty(session?.email, stateProduct);
    } else {
      updatedProduct = await DecreaseQntyCookies(stateProduct);
    }
    if (updatedProduct) {
      setStateProduct(updatedProduct);
    }
  }


  const increaseQnty = async () => {
    var updatedProduct: ProductType | undefined = undefined;
    if (session) {
      updatedProduct = await IncreaseQnty(session?.email, stateProduct);
    } else {
      updatedProduct = await IncreaseQntyCookies(stateProduct);
    }
    if (updatedProduct) {
      setStateProduct(updatedProduct);
    }
  }


  return (
    <motion.div
      initial={{ opacity: 1, x: x, width: "100%" }}
      animate={{ opacity: 1, x: x, width: "100%" }}
      exit={{ opacity: 0, x: x, width: "100%" }}
      transition={{ duration: 1, type: "tween" }}
    >
      <div className="w-full flex flex-row justify-center gap-5 px-10">
        <div className="w-full flex flex-row justify-center gap-5"><Image
          src={stateProduct.image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-[90px] h-auto self-start opacity-90"
        />
          <div className="w-full py-1 flex flex-col justify-between gap-2 text-accent opacity-80 font-retro text-sm">
            <div className="flex flex-col gap-2"><p>{stateProduct.title}</p>
              <p>{stateProduct.price.toFixed(2)}</p></div>
            <div className="flex flex-row items-center justify-center gap-2 bg-accent text-black w-20 dropshadow mb-1">
              <p onClick={decreaseQnty} className="cursor-pointer text-[32px] border-black border-x-[2px] px-[4px] py-[2px]">-</p>
              <p className="text-[17px]  px-[2px]">{stateProduct.quantity}</p>
              <p onClick={increaseQnty} className="cursor-pointer text-[22px] border-black border-x-[2px] px-[3px] py-[2px]">+</p>
            </div>
          </div></div>
        <Image
          src="/img/trash.svg"
          alt="trash"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[25px] cursor-pointer mb-4 mr-2 opacity-90"
          onClick={removeProduct}
        />
      </div>
    </motion.div>
  )
}
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

  const [productToRemove, setProductToRemove] = useState<ProductType | null>(null);

  const removeFromCart = async (product: ProductType) => {
    if (productToRemove) {
      var updatedCart: CartType | undefined = undefined;

      if (session) {
        updatedCart = await RemoveFromCart(session.email, productToRemove);
      } else {
        updatedCart = await RemoveFromCartCookies(productToRemove);
      }

      if (updatedCart) {
        setProductToRemove(null)
        return updatedCart
      }
    }
  }

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

      if (productToRemove) {
        const updatedCart = await removeFromCart(productToRemove);
        if (updatedCart) {
          setCart(updatedCart)
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
  }, [showCart, mobile, session, productToRemove]);

  return (
    <CartTransition animate={showCart} mobile={mobile}>
      <div className="w-full h-full flex flex-col items-center justify-center overflow-y-scroll">
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
          {cart && cart.products.length > 0 ? (<div className="w-full flex flex-col gap-5 items-start justify-center">
            {cart.products.map((product) => {
              return <CartProduct key={product.title} product={product} onClick={() => { setProductToRemove(product) }} />
            })}
          </div>) : <p className="text-accent font-retro text-sm box-border w-full h-[400px] grid place-items-center">Nothing to see here.</p>}
        </div>
      </div>
    </CartTransition>
  );
};

export default Cart;

