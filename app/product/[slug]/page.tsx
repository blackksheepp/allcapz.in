"use client";
import React, { useEffect, useState } from "react";

import { GetProductByTitle } from "@/app/utils/db";
import { ProductType } from "@/database/collections";

import Cart from "@/app/components/Cart";
import Auth from "@/app/components/Auth";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { TextureOverlay } from "@/app/components/TextureOverlay";


export default function Product({ params }: { params: { slug: string } }) {
  const [cart, setCart] = useState(false);
  const [login, setLogin] = useState(false);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [zoom, setZoom] = useState(false);
  const [mobile, setMobile] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    (async () => {
      const url = atob(decodeURIComponent(params.slug));
      const [title, collection] = url.split(".");
      const product = await GetProductByTitle(collection, title);
      setProduct(product);
    })();

    setMobile(window.innerWidth < 640);
    setTimeout(() => setIsTransitioning(true), 100)
  }, [params.slug]);

  return (
    <>
      <div
        className="absolute z-80 w-full h-screen min-h-[700px] overflow-y-hidden"
        onClick={() => {
          setZoom(false);
        }}
      >
        <div className={`w-full h-full max-h-max flex items-center blur-[100px] justify-center transition-all ease-linear duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0 '}`}>
          <Image
            src={product?.image!}
            alt={product?.title!}
            width={0}
            height={0}
            sizes="100vw"
            className={`${mobile ? `h-1/2 w-auto rotate-[90deg]` : `w-1/2`} transition-all ease-linear duration-300 ${isTransitioning ? `${mobile ? `scale-[200%] rotate-[0deg]` : `scale-[160%] rotate-[90deg]`}` : ''}`}
            onClick={() => { }}
          />
        </div>
      </div>
      <TextureOverlay />
      <Cart onClick={() => setCart(!cart)} showCart={cart} />
      <Auth onClick={() => setLogin(!login)} showLogin={login} />
      <div
        className={`absolute w-full inset-y-0  ${cart || zoom ? `transition-all delay-${zoom ? "50" : "500"} duration-${zoom ? "50" : "200"} ease-in blur-lg pointer-events-none ` : `transition-all delay-${zoom ? "50" : "200"} duration-${zoom ? "50" : "200"} ease-in blur-none`
          }`}
      >
        <Navbar onCart={() => setCart(!cart)} onLogin={() => setLogin(!login)} />
        <div className="flex lg:flex-row md:flex-row flex-col justify-center gap-vw-16-min@sm mx-vw-52 mt-vw-16-min@lg mb-10">
          <div className="relative top-0 lg:w-[400px] md:w-[400px] lg:min-w-[400px] md:min-w-[400px] w-full lg:h-[500px] md:h-[500px] h-[300px] grid place-items-center">

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
              onClick={() => { }}>
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
