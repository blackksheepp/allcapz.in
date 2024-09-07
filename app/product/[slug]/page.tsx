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
import { useSession } from "@/app/providers/Session";
import { BackgroundTexture } from "@/app/components/TextureOverlay";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/app/utils/store/cartStore";
import { useLoginStore } from "@/app/utils/store/loginStore";
import { GetImage } from "@/app/components";


export default function Product({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductType>();
  const [zoom, setZoom] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [size, setSize] = useState<boolean>(true);
  const sizes = ["Small", "Medium"];
  const [selectSize, setSelectSize] = useState<string>(sizes[1]);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const { showCart, setCart } = useCartStore((state) => state);
  const { showLogin } = useLoginStore((state) => state);
  const { setIsFull } = useCartStore((state) => state);
  const { session } = useSession();
  const addToCart = async () => {
    if (product) {
      product.size = selectSize;
      product.quantity = 1;
      let success;
      if (session) {
        success = await AddToCart(session.email, product);
      } else {
        success = await AddToCartCookies(product);
      }

      if (success) {
        setIsFull(true);
        setCart(true);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const url = atob(decodeURIComponent(params.slug));
      const [title, collection] = url.split(".");
      const resp = await GetProductByTitle(collection, title);
      resp && setProduct(resp);
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
  }, [params.slug, setCart]);

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, [])
  
  return (
    <>
      <div
        className="absolute z-80 w-full h-[110%] min-h-[700px] overflow-y-hidden"
        onClick={() => {
          setZoom(false);
        }}
      >
        <BackgroundTexture />
        <div className={`w-full h-full max-h-max flex items-center blur-[100px] justify-center transition-all ease-linear duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-0 '} ${(!showLogin && !showCart) && "animate-spin-slow"}`}>
            <Image
              src={GetImage(product?.id!)}
              alt={product?.title!}
              width={0}
              height={0}
              sizes="5vw"
              className={`${mobile ? `h-1/2 w-auto rotate-[90deg]` : `w-1/2`} transition-all ease-linear duration-[2000ms] ${isTransitioning ? `${mobile ? `scale-[300%] rotate-[0deg]` : `scale-[220%] rotate-[90deg]`}` : ''}`}
              onClick={() => { }}
            />
        </div>
      </div>
      <Cart />
      <Auth />
      <div
        className={`absolute w-full ${showLogin || showCart || zoom ? `transition-all delay-${zoom ? "50" : "500"} duration-${zoom ? "50" : "200"} ease-in blur-lg pointer-events-none ` : `transition-all delay-${zoom ? "50" : "200"} duration-${zoom ? "50" : "200"} ease-in blur-none`
          }`}
      >
        <div>
          <div className="absolute w-full" style={{ top: mobile ? 10 : 20 }}>
            <Navbar />
          </div>
          <div className="absolute w-full h-screen mt-vw-20-min@md xl:mt-vw-5 2xl:mt-0 flex lg:flex-row md:flex-row flex-col justify-center gap-vw-16-min@sm  mb-vw-10">
            <div className="relative place-self-center lg:w-[400px] md:w-[400px] lg:min-w-[400px] md:min-w-[400px] w-full lg:h-[500px] md:h-[500px] h-[300px] grid place-items-center">
                <>
                  <Image
                  src={GetImage(product?.id!)}
                    alt={""}
                    width={0}
                    height={0}
                    sizes="10vh"
                    // onClick={() => setZoom(true)}
                    className="absolute mt-6 mr-6 lg:h-[500px] md:h-[500px] h-[300px] w-auto blur-[0px]"
                    priority
                  />
                  <Image
                  src={GetImage(product?.id!)}
                    alt={""}
                    width={0}
                    height={0}
                    sizes="10vh"
                    // onClick={() => setZoom(true)}
                    className="absolute mt-3 mr-3 lg:h-[500px] md:h-[500px] h-[300px] w-auto blur-[0px]"
                    priority
                  />
                  <Image
                  src={GetImage(product?.id!)}
                    alt={""}
                    width={0}
                    height={0}
                    sizes="50vh"
                    // onClick={() => setZoom(true)}
                    className="absolute lg:h-[500px] md:h-[500px] h-[300px] w-auto"
                    priority
                  />
                </>
            </div>
            <div className="text-accent font-retro lg:h-[520px] md:h-[500px] lg:w-[400px] md:w-[400px] w-[250px] flex flex-col items-center justify-between gap-vw-10-min@xs place-self-center">
              <div className="flex flex-col self-center gap-3">
                <div className="flex flex-col items-center gap-3">
                  <p className="lg:text-4xl md:text-4xl text-2xl text-center">{product?.title}</p>
                  <hr className="w-36" />
                </div>
                <div className="text-center">
                  <p className="lg:text-2xl md:text-2xl text-lg  font-retro">
                    {product?.price.toFixed(2)}
                  </p>

                </div>
              </div>
              <p className="text-start lg:text-lg md:text-lg text-sm font-ibm mt-10">
                <div className="mt-2 lg:text-lg md:text-lg text-sm font-ibm font-[600] flex w-full flex-row justify-start items-center">
                  {
                    size ? (<div className="flex flex-row items-center justify-center">
                      <p className="lg:w-[130px] md:w-[130px] w-[105px]">Select Size:</p>
                      {sizes.flatMap((size, index) => (
                        <p
                          key={index}
                          onClick={() => { setSelectSize(size); setSize(false) }}
                          className="cursor-pointer ml-2"
                        >
                          {size}{index !== sizes.length - 1 && ","}
                        </p>
                      ))}
                    </div>) : (<>
                      <p onClick={() => setSize(!size)} className="cursor-pointer">Size: {selectSize}</p>
                    </>)
                  }
                  <Image
                    onClick={() => setSize(!size)}
                    src={GetImage("img/drop.svg")}
                    alt="trash"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ filter: "invert(1) hue-rotate(180deg)" }}
                    className={`w-[25px] cursor-pointer opacity-90 ${size ? "hidden" : "rotate-[270deg]"}`}
                  />
                </div>
                <br />
                16.4×24 inches (Small)
                <br />
                27.8×39.4 inches (Medium)
                <br />
               <br /><br />
                ENG // 120 g/m² Paper Digital Color Printing.
                <br />
                Limited Edition Serialized and Signed by the Author.


              </p>
              <button className="mt-10 btn w-full h-bh font-retro text-black"
                onClick={() => { addToCart() }}>
                ADD TO CART
              </button>
            </div>
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
              src={GetImage(product?.id!)}
              alt={""}
              width={0}
              height={0}
              sizes="80vw"
              className={`${mobile ? "w-full h-auto" : "w-auto h-full"} cursor-pointer`}
            />
          </div>
        </div>
      )}
    </>
  );
}
