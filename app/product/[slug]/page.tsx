"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/app/providers/Session";
import { useCartStore } from "@/app/utils/store/cartStore";
import { useLoginStore } from "@/app/utils/store/loginStore";
import { GetImage } from "@/app/components";
import { AddToCart } from "@/app/utils/database/carts";
import { AddToCartCookies } from "@/app/utils/cookies/cart";
import { GetProductByTitle, ProductType } from "@/app/utils/database/collections";
import Cart from "@/app/components/Cart";
import Auth from "@/app/components/Auth";
import Navbar from "@/app/components/Navbar";
import { BackgroundTexture } from "@/app/components/TextureOverlay";

const SIZES = ["Small", "Medium"] as const;
type Size = typeof SIZES[number];

export default function Product({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductType>();
  const [mobile, setMobile] = useState(false);
  const [size, setSize] = useState(true);
  const [selectSize, setSelectSize] = useState<Size>(SIZES[1]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const { showCart, setCart, setIsFull } = useCartStore();
  const { showLogin } = useLoginStore();
  const { session } = useSession();

  const addToCart = async () => {
    if (!product) return;

    const updatedProduct = { ...product, size: selectSize, quantity: 1 };
    const success = session
      ? await AddToCart(session.email, updatedProduct)
      : await AddToCartCookies(updatedProduct);

    if (success) {
      setIsFull(true);
      setCart(true);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const url = atob(decodeURIComponent(params.slug));
        const [title, collection] = url.split(".");
        const resp = await GetProductByTitle(collection, title);
        if (resp) {
          setProduct(resp);
          // Preload the image
          const img = new window.Image();
          img.src = GetImage(resp.id);
          img.onload = () => {
            setImageLoaded(true);
            // Start transition after image is loaded
            requestAnimationFrame(() => {
              setIsTransitioning(true);
            });
          };
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    const handleResize = () => setMobile(window.innerWidth < 640);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCart(false);
    };
    const preventContext = (event: Event) => event.preventDefault();

    loadProduct();
    handleResize();

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('contextmenu', preventContext);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('contextmenu', preventContext);
    };
  }, [params.slug, setCart]);

  const productImage = product?.id ? GetImage(product.id) : '';

  // Prepare animation classes based on loading state
  const imageAnimationClass = `
    ${mobile ? 'h-1/2 w-auto' : 'w-1/2'}
    transition-transform ease-linear duration-[2000ms]
    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
    ${isTransitioning && imageLoaded
        && `${mobile ? "scale-[300%]" : "scale-[220%]"} rotate-90`
    }
  `.trim();

  return (
    <>
      <div className="absolute z-80 w-full h-[110%] min-h-[700px] overflow-y-hidden">
        <BackgroundTexture />
        <div
          className={`
            w-full h-full max-h-max flex items-center justify-center
            transition-[filter,opacity] ease-linear duration-1000
            ${imageLoaded ? 'blur-[100px] opacity-100' : 'blur-0 opacity-0'}
            ${(!showLogin && !showCart) && "animate-spin-slow"}
          `}
        >
          {productImage && (
            <Image
              src={productImage}
              alt={product?.title || ''}
              width={0}
              height={0}
              sizes={mobile ? "100vw" : "50vw"}
              className={imageAnimationClass}
              priority
              loading="eager"
              onLoadingComplete={() => {
                requestAnimationFrame(() => {
                  setImageLoaded(true);
                });
              }}
            />
          )}
        </div>
      </div>

      <Cart />
      <Auth />

      <div className={`absolute w-full ${showLogin || showCart || zoom ? 'blur-lg pointer-events-none' : ''
        }`}>
        <div className="absolute w-full" style={{ top: mobile ? 10 : 20 }}>
          <Navbar />
        </div>

        <div className="absolute w-full h-screen mt-vw-20-min@md xl:mt-vw-5 2xl:mt-0 flex lg:flex-row md:flex-row flex-col justify-center gap-vw-16-min@sm mb-vw-10">
          {/* Product Image */}
          <div className="relative place-self-center lg:w-[400px] md:w-[400px] lg:min-w-[400px] md:min-w-[400px] w-full lg:h-[500px] md:h-[500px] h-[300px] grid place-items-center">
            {productImage && (
              <>
                {[6, 3, 0].map((offset) => (
                  <Image
                    key={offset}
                    src={productImage}
                    alt={product?.title || ''}
                    width={0}
                    height={0}
                    sizes="50vh"
                    className={`absolute lg:h-[500px] md:h-[500px] h-[300px] w-auto ${offset > 0 ? `mt-${offset} mr-${offset} blur-[0px]` : ''
                      }`}
                    priority={offset === 0}
                  />
                ))}
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="text-accent font-retro lg:h-[520px] md:h-[500px] lg:w-[400px] md:w-[400px] w-[250px] flex flex-col items-start justify-between gap-vw-10-min@xs place-self-center">
            {product && (
              <>
                <div className="flex flex-col self-center gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <p className="lg:text-4xl md:text-4xl text-2xl text-center">{product.title}</p>
                    <hr className="w-36" />
                  </div>
                  <div className="text-center">
                    <p className="lg:text-2xl md:text-2xl text-lg font-retro text-green-400">
                      <span className="lg:text-xl text-red-400 line-through">699.00</span>{' '}
                      {product.price.toFixed(2)}{' '}
                      <span className="text-sm lg:text-sm font-ibm">(SALE)</span>
                    </p>
                  </div>
                </div>

                <div className="text-start lg:text-lg md:text-lg text-sm font-ibm mt-10">
                  <div className="mt-2 lg:text-lg md:text-lg text-sm font-ibm font-[600] flex w-full flex-row justify-start items-center">
                    {size ? (
                      <div className="flex flex-row items-center justify-center">
                        <p className="lg:w-[130px] md:w-[130px] w-[105px]">Select Size:</p>
                        {SIZES.map((sizeOption, index) => (
                          <p
                            key={sizeOption}
                            onClick={() => {
                              setSelectSize(sizeOption);
                              setSize(false);
                            }}
                            className="cursor-pointer ml-2"
                          >
                            {sizeOption}{index !== SIZES.length - 1 && ","}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p onClick={() => setSize(true)} className="cursor-pointer">
                        Size: {selectSize}
                      </p>
                    )}
                    {!size && (
                      <Image
                        onClick={() => setSize(true)}
                        src={GetImage("img/drop.svg")}
                        alt="size selector"
                        width={25}
                        height={25}
                        className="cursor-pointer opacity-90 rotate-[270deg]"
                        style={{ filter: "invert(1) hue-rotate(180deg)" }}
                      />
                    )}
                  </div>

                  <div className="flex flex-col mt-4">
                    <div className="flex flex-row items-center">
                      <p className="w-[200px]">8.3×11.7 inches</p>
                      <p>(Small)</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="w-[200px]">11.7×16.5 inches</p>
                      <p>(Medium)</p>
                    </div>
                  </div>

                  <p className="mt-4">
                    ENG // 300 gsm Paper
                    <br />Digital Color Print
                    <br />Glossy Finish
                    <br /><br />
                    Limited Edition Serialized.
                  </p>
                </div>

                <button
                  className="mt-10 btn w-full h-bh font-retro text-black"
                  onClick={addToCart}
                >
                  ADD TO CART
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {zoom && (
        <div
          className="absolute z-80 w-full h-screen"
          onClick={() => setZoom(false)}
        >
          <div className="h-full max-h-max flex items-center justify-center">
            {productImage && (
              <Image
                src={productImage}
                alt={product?.title || ''}
                width={0}
                height={0}
                sizes="80vw"
                className={`${mobile ? "w-full h-auto" : "w-auto h-full"} cursor-pointer`}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}