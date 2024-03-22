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

  const [size, setSize] = useState<boolean>(false);
  const sizes = ["Small", "Medium", "Large"];

  const [x, setX] = useState("0");
  const removeProduct = () => {
    setX("100%");
    setTimeout(() => onClick(), 2000)
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
      transition={{ duration: 0.8, type: "keyframes" }}
    >
      <div className="w-full flex flex-row justify-center gap-5 px-5">
        <div className="bg-[#c7c7c7] border-black border-[1px] shadow-[5px_5px_0px_0px_rgba(70,70,70)] pt-3 pb-2 w-full flex flex-row justify-center gap-5"><Image
          src={stateProduct.image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-[90px] h-auto self-start ml-2 shadow-lg"
        />
          <div className="w-full py-1 flex flex-col justify-between text-black opacity-80 font-ibm font-[600] text-sm">
            <div className="flex flex-col gap-2">
              <p>{stateProduct.title}</p>
              <p onClick={() => setSize(!size)} className="cursor-pointer">Size: {size ? (<div className="flex flex-col py-2">
                {sizes.map((size, index) => (
                  <p onClick={() => {product.size=size; setStateProduct(product)}} className="cursor-pointer" key={index}>{size}</p>
                ))}
              </div>) : (stateProduct.size)}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 bg-[#c7c7c7] text-black w-20 dropshadow border-black border-[1px] mb-1">
              <p onClick={decreaseQnty} className="font-retro  font-[400] cursor-pointer text-[28px] border-black border-r-[2px] px-[4px] py-[1px]">-</p>
              <p className="text-[14px]  px-[1px]">{stateProduct.quantity}</p>
              <p onClick={increaseQnty} className="font-retro  font-[400] cursor-pointer text-[20px] border-black border-l-[2px] px-[3px] py-[1px]">+</p>
            </div>
          </div>
          <div className="flex h-full flex-row items-center justify-center opacity-80">
            <div className="w-[2px] h-full bg-[#333333]"/>
            <div className="flex flex-col h-full justify-between pt-1 pb-2">
              <p className="font-ibm text-sm font-[600] text-center mx-4">Price<br/>{(stateProduct.price*stateProduct.quantity!).toFixed(2)}</p>
              <p onClick={removeProduct} className="cursor-pointer font-ibm text-sm font-[600] text-center mx-4 px-2 py-[1px] bg-red-700 text-accent border-black border-[1px] dropshadow">Remove</p>
            </div>
          </div>
          </div>
        
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
          <div
            className="w-[85px] h-[30px] border-black border-[1px] dropshadow font-ibm font-[800] text-black bg-[#c7c7c7] cursor-pointer flex items-center justify-center"
            style={{ fontSize: "14px" }}
            onClick={onClick}
          >
            CLOSE
          </div>
        </div>
        <div className="z-10 w-full h-screen flex flex-col mt-10">
          {cart && cart.products.length > 0 ? (<div className="w-full flex flex-col gap-5 items-start justify-center">
            {cart.products.map((product) => {
              return <CartProduct key={product.title} product={product} onClick={() => { setProductToRemove(product) }} />
            })}
          </div>) : <p className="text-accent font-retro text-sm box-border w-full h-[400px] grid place-items-center">Nothing to see here.</p>}
        </div>
          {cart && cart.products.length > 0 && 
            <p className="w-full h-[55px] flex items-center justify-center bg-green-500 text-xl text-black font-ibm font-[600]">Checkout</p>
          }
      </div>
    </CartTransition>
  );
};

export default Cart;

