"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "../Providers/Session";
import { ProductType } from "../utils/database/collections";
import { CartType, GetCart } from "../utils/database/carts";
import { CartCookieType, GetCartFromCookies } from "../utils/cookies/cart";


const CheckoutProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className="w-[55%] flex flex-row items-center justify-between py-5">
      <div className="flex flex-row gap-0 items-center">
        <Image
          src={product.image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-[90px] h-auto self-start ml-2 shadow-lg"
        />
        <div className="flex flex-col">
          <p className="text-background font-retro text-2xl px-4">{product.title}</p>
          <p className="text-[#424242] font-ibm font-bold text-[16px] px-4">Size: {product.size}</p>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <p className="text-background font-retro text-[20px] px-4">₹{product.price * (product.quantity || 1)}</p>
        <p className="text-[#424242] font-ibm font-bold text-[12px] px-4">{product.price} x {product.quantity}</p>
      </div>
    </div>
  )
}

export default function Product({ params }: { params: { slug: string } }) {
  const [mobile, setMobile] = useState(false);

  const sections = ["Cart", "Summary", "Shipping", "Payment", "Review"];
  const [active, setActive] = useState<string[]>(sections.slice(0, 1));

  const [fname, setFname] = useState<string>("")
  const [lname, setLname] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [postalCode, setPostalCode] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  const [cart, setCart] = useState<CartType | CartCookieType | null>(null);

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
    })();
  }, [cart]);

  const { session } = useSession();
  useEffect(() => {
    window.addEventListener("resize", () => setMobile(window.innerWidth < 640));
    return () => {
      window.removeEventListener("resize", () => setMobile(window.innerWidth < 640));
    }
  }, []);


  const Next = ({ active }: { active: boolean }) => {
    return <Image
      src={active ? "/img/arrow-active.svg" : "/img/arrow.svg"}
      alt="show"
      width={0}
      height={0}
      sizes="100vw"
      className="w-[20px] h-auto"
    />
  }

  const Prev = () => {
    return <Image
      src={"/img/arrow.svg"}
      alt="show"
      width={0}
      height={0}
      sizes="100vw"
      className="w-[25px] h-auto rotate-[180deg]"
    />
  }

  return (
    <div className="absolute w-full h-full flex flex-row">
      <div className="w-[55%] h-full py-20 flex justify-end">
        <div className="w-[90%] h-full flex items-end pr-20 flex-col">

          <Link href="/">
            <Image
              src="/img/LOGO NEW.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-vw-14-min@lg-max@xl"
            />
          </Link>

          <div className="font-ibm text-[#c4c4c4] text-sm flex flex-row pt-5 gap-2">
            {sections.flatMap((section, index) => {
              return <><p className={`${active.includes(section) && "text-accent"}`}>{section}</p>{index < sections.length - 1 && <Next active={active.includes(section)} />}</>
            })}
          </div>

          <div className="w-[55%] h-[1px] my-7 bg-accent opacity-50"></div>

          <form className="w-[60%] font-ibm text-accent flex flex-col items-end gap-2">
            <div className="flex flex-row w-full justify-between items-baseline">
              <label className="text-[14px] text-green-600">Change Email?</label>
              <label className="text-2xl">Contact</label>
            </div>
            <input className={`w-full bg-transparent rounded-[2px] outline-none px-3 py-3 placeholder:text-sm border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-accent text-accent text-lg placeholder:text-gray ${session?.email && `pointer-events-none text-[#a4a4a4]`}`} placeholder="Your Email" value={session?.email || undefined} />
          </form>

          <form className="w-[60%] pt-10 font-ibm text-accent flex flex-col items-end gap-8">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between items-baseline">
                <label className="text-[14px] text-green-600">Change Address?</label>
                <label className="text-2xl">Shipping Address</label>
              </div>

              <label className={`flex flex-col justify-center w-full text-[12px] pl-4 py-2 rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4] pointer-events-none`}>
                Country
                <input className={`w-full bg-transparent outline-none  placeholder:text-sm text-[16px] placeholder:text-gray pointer-events-none text-accent`} placeholder="Country" value={"India"} />
              </label>

            </div>
            <div className="w-full flex flex-row gap-4">
              <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${fname ? `py-1` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
                {fname && "First Name"}
                <input placeholder={"First Name"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={fname} onChange={(e) => setFname(e.target.value)} />
              </label>

              <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${lname ? `py-1` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
                {lname && "Last Name"}
                <input placeholder={"Last Name"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={lname} onChange={(e) => setLname(e.target.value)} />
              </label>
            </div>

            <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${address ? `py-2` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
              {address && "Address"}
              <input placeholder={"Address"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>

            <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${street ? `py-2` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
              {street && "Apartment, Landmark, Street"}
              <input placeholder={"Apartment, Landmark, Street"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={street} onChange={(e) => setStreet(e.target.value)} />
            </label>

            <div className="w-full flex flex-row gap-4">
              <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${postalCode ? `py-1` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
                {postalCode && "Postal Code"}
                <input placeholder={"Postal Code"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </label>

              <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${city ? `py-2` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
                {city && "City"}
                <input placeholder={"City"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
            </div>

            <label className={`flex flex-col justify-center w-full text-[12px] pl-4 ${phone ? `py-2` : `py-4`} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4]`}>
              {phone && "Phone Number"}
              <input placeholder={"Phone Number"} className={`w-full bg-transparent outline-none placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4] pointer-events-none text-accent`} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <div className="w-full flex flex-row items-center justify-between py-2 font-ibm text-accent text-sm">
              <div className="flex flex-row items-center ">
                <Prev />
                <p className="">Return to Cart</p>
              </div>
              <button className="bg-accent text-background py-2.5 px-4 rounded-sm font-[500]">
                Continue to Shipping
              </button>
            </div>
          </form>


        </div>
      </div>
      <div className="w-[45%] h-full bg-accent py-20 pl-16">
        {cart && cart.products && cart.products.length > 0 && (
          <div>
            {cart.products.flatMap((product, index) => (
              <CheckoutProduct
                key={index}
                product={product}
              />
            ))}
            <div className="w-[55%] h-[1px] mt-7 bg-background opacity-50"></div>
            <div className="w-[55%] font-ibm font-[500]">
              <div className="w-full pt-3 flex flex-row justify-between items-baseline">
                <p className="">Subtotal</p>
                <p>₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
              </div>
              <div className="pt-1 w-full flex flex-row justify-between items-baseline">
                <p>Shipping</p>
                <p className="text-[12px]">(Calculated at next step)</p>
              </div>
              <div className="py-5 text-xl w-full flex flex-row justify-between items-baseline">
                <p>Total</p>
                <p>INR ₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
              </div>
            </div>
            <div className="w-[55%] h-[1px] mb-7 bg-background opacity-50"></div>

          </div>
        )}

      </div>
    </div>
  );
}
