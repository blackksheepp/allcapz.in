"use client";
import React, { useEffect, useState } from "react";

import { GetProductByTitle } from "@/app/utils/database/collections";
import { ProductType } from "@/app/utils/database/collections";

import Cart from "@/app/components/Cart";
import Auth from "@/app/components/Auth";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { AddToCart } from "@/app/utils/database/carts";
import { AddToCartCookies } from "@/app/utils/cookies/cart";
import { useSession } from "@/app/Providers/Session";
import { BackgroundTexture } from "@/app/components/TextureOverlay";


export default function Product({ params }: { params: { slug: string } }) {
  const [cart, setCart] = useState(false);
  const [login, setLogin] = useState(false);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [zoom, setZoom] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [spin, setSpin] = useState(true);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const { session } = useSession();
  const addToCart = async () => {
    if (product) {
      product.quantity = 1;
      if (session) {
        await AddToCart(session.email, product);
      } else {
        await AddToCartCookies(product);
      }
      setCart(true);
    }
  }

  useEffect(() => {
    (async () => {
      const url = atob(decodeURIComponent(params.slug));
      const [title, collection] = url.split(".");
      const product = await GetProductByTitle(collection, title);
      setProduct(product);
    })();

    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCart(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    setMobile(window.innerWidth < 640);
    setTimeout(() => setIsTransitioning(true), 100)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    }
  }, [params.slug]);

  return (
    <>
      <div
        className="absolute z-80 w-full h-screen min-h-[700px] overflow-y-hidden"
        onClick={() => {
          setZoom(false);
        }}
      >
        <BackgroundTexture />
        <div className={`w-full h-full max-h-max flex items-center blur-[100px] justify-center transition-all ease-linear duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-0 '} ${(!login && !cart) && "animate-spin-slow"}`}>
          <Image
            src={product?.image!}
            alt={product?.title!}
            width={0}
            height={0}
            sizes="100vw"
            className={`${mobile ? `h-1/2 w-auto rotate-[90deg]` : `w-1/2`} transition-all ease-linear duration-1000 ${isTransitioning ? `${mobile ? `scale-[300%] rotate-[0deg]` : `scale-[220%] rotate-[90deg]`}` : ''}`}
            onClick={() => { }}
          />
        </div>
      </div>
      <Cart onClick={() => setCart(!cart)} showCart={cart} />
      <Auth onClick={() => setLogin(!login)} showLogin={login} />
      <div
        className={`absolute w-full ${login || cart || zoom ? `transition-all delay-${zoom ? "50" : "500"} duration-${zoom ? "50" : "200"} ease-in blur-lg pointer-events-none ` : `transition-all delay-${zoom ? "50" : "200"} duration-${zoom ? "50" : "200"} ease-in blur-none`
          }`}
      >
        <Navbar onCart={() => setCart(!cart)} onLogin={() => setLogin(!login)} />
        <div className="flex lg:flex-row md:flex-row flex-col justify-center gap-vw-16-min@sm mx-vw-52 mt-vw-16-max@lg  mb-vw-10">
          <div className="relative place-self-center lg:w-[400px] md:w-[400px] lg:min-w-[400px] md:min-w-[400px] w-full lg:h-[500px] md:h-[500px] h-[300px] grid place-items-center">

            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute mt-6 mr-6 lg:h-[500px] md:h-[500px] h-[300px] w-auto blur-[0px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute mt-3 mr-3 lg:h-[500px] md:h-[500px] h-[300px] w-auto blur-[0px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute lg:h-[500px] md:h-[500px] h-[300px] w-auto"
            />
          </div>
          <div className="text-accent font-retro lg:h-[500px] md:h-[500px] lg:w-[400px] md:w-[400px] w-[250px] flex flex-col items-center justify-between gap-vw-10-min@xs place-self-center">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-3">
                <p className="lg:text-4xl md:text-4xl text-2xl text-center">{product?.title}</p>
                <hr className="w-36" />
              </div>
              <div className="text-center">
                <p className="lg:text-2xl md:text-2xl text-lg  font-retro">
                  {product?.price.toFixed(2)}
                </p>
                <p className="font-ibm lg:text-lg text-xs">(Regular Size)</p>
              </div>
            </div>
            <p className="lg:text-lg md:text-lg text-sm  font-ibm mt-10">
              ENG // 27.8×39.4 inches
              <br />
              120 g/m² Magistra Deluxe Blueback paper Digital Color Printing
              <br />
              Limited Edition Serialized and Signed by the Author
              <br />
            </p>
            <button className="mt-10 btn w-full h-bh font-retro text-black"
              onClick={() => { addToCart() }}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {zoom && (
        <div
          className="absolute z-80 w-full h-screen"
          onClick={() => {
            setZoom(false);
          }}
        >
          <div className="h-full max-h-max flex items-center justify-center">
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vw"
              className={`${mobile ? "w-full h-auto" : "w-auto h-full"} cursor-pointer`}
              onClick={() => { }}
            />
          </div>
        </div>
      )}
    </>
  );
}
