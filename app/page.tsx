"use client";

import React from "react";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Shop";
import { useCartStore } from "./utils/store/cartStore";
import { useLoginStore } from "./utils/store/loginStore";


const HomePage = () => {
  const { showLogin } = useLoginStore((state) => state);
  const { showCart } = useCartStore((state) => state);
  console.log(showCart, showLogin, "page")
  return (
    <div>
      <Cart />
      <Auth />
      <div className={` w-full ${showCart || showLogin ? `transition-all ${showLogin ? "delay-0 duration-0" : "delay-500 duration-200"}  ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
        <Navbar />
        <Hero />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
