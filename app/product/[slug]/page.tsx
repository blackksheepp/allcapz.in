"use client";
import React, { useEffect, useState } from "react";

import { GetProductByTitle } from "@/app/utils/db";
import { ProductType } from "@/database/collections";

import Cart from "@/app/components/Cart";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";


export default function Product({ params }: { params: { slug: string } }) {
  const [cart, setCart] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [zoom, setZoom] = useState(false);
  
  useEffect(() => {
    (async () => {
      const url = atob(decodeURIComponent(params.slug));
      const [title, collection] = url.split(".");
      const product = await GetProductByTitle(collection, title);
      setProduct(product);
    })();
  }, [params.slug]);

  return (
    <>
      {cart && <Cart onClick={() => setCart(!cart)} showCart={cart} />}
      <div
        className={`absolute w-full pb-20 ${
          cart || zoom ? "blur-lg pointer-events-none " : "blur-none"
        }`}
      >
        <Navbar onClick={() => setCart(!cart)} />
        <div className="flex flex-row justify-center gap-16 mx-52 pt-20">
          <div className="relative top-0 right-0 w-full">
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute top-4 right-4   w-auto h-[500px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute top-3 right-3   w-auto h-[500px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute top-2 right-2   w-auto h-[500px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute top-1 right-1  w-auto h-[500px]"
            />
            <Image
              src={product?.image!}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="100vh"
              onClick={() => setZoom(true)}
              className="absolute top-0 right-0 w-auto h-[500px]"
            />
          </div>
          <div className="text-accent font-retro h-[500px] flex flex-col items-center justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-3">
                <p className="text-4xl text-center">{product?.title}</p>
                <hr className="w-36" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-retro">
                  {product?.price.toFixed(2)}
                </p>
                <p className="font-ibm">(Regular Size)</p>
              </div>
            </div>
            <p className="text-lg font-ibm mt-10">
              ENG // 27.8×39.4 inches
              <br />
              120 g/m² Magistra Deluxe Blueback paper Digital Color Printing
              <br />
              Limited Edition Serialized and Signed by the Author
              <br />
            </p>
            <button className="mt-10 btn w-full h-bh font-retro text-black">
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
              className="w-auto h-full cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
}
