"use client";
import React, { useEffect, useState } from "react";

import Cart from "@/app/components/Cart";
import Auth from "@/app/components/Auth";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useSession } from "@/app/Providers/Session";


export default function Product({ params }: { params: { slug: string } }) {
  const [cart, setCart] = useState(false);
  const [login, setLogin] = useState(false);


  return (
    <>
      <Cart onClick={() => setCart(!cart)} showCart={cart} />
      <Auth onClick={() => setLogin(!login)} showLogin={login} />
      <div
        className={`absolute w-full ${login || cart  ? `transition-all delay-500 duration-200 ease-in blur-lg pointer-events-none ` : `transition-all delay-200 duration-200 ease-in blur-none`
          }`}
      >
        <Navbar onCart={() => setCart(!cart)} onLogin={() => setLogin(!login)} />
      </div>
    </>
  );
}
