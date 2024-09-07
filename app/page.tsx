"use client";

import React, { Suspense } from "react";
import { useState, useEffect } from "react";


import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Shop";
import { useCartStore } from "./utils/store/cartStore";
import { useLoginStore } from "./utils/store/loginStore";
import Preloader from "./components/Preloader";
import { useMiscStore } from "./utils/store/miscStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "./providers/Session";
import { RedirectUri } from "./utils/auth";


const HomePage = () => {
  const { showLogin } = useLoginStore((state) => state);
  const { showCart } = useCartStore((state) => state);
  const { preloader } = useMiscStore((state) => state);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    var redirect = searchParams.get("redirect");
    if (redirect) {
      const data = JSON.parse(atob(redirect)) as RedirectUri;
      
      if (data.auth) {
        if (data.user !== session?.email) {
          return
        }
      }

      if (data.type === "order") {
        router.push("/" + data.uri);
      } 
    }
  }, [searchParams, session]);

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, [])
  
  return (
    <>
      {preloader && loading && <Preloader setLoading={setLoading} />}
      <div>
        <Cart />
        <Auth />
        <div className={` w-full ${showCart || showLogin ? `transition-all ${showLogin ? "delay-0 duration-0" : "delay-500 duration-200"}  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
          <Navbar />
          <Hero />
          <Products />
        </div>
      </div>
    </>
  )
};

export default HomePage;
