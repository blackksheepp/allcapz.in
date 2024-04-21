"use client";

import React from "react";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Shop";


const HomePage = () => {
  const params = useSearchParams();
  var [cart, setCart] = useState(params.get("cart") === "true");
  var [login, setLogin] = useState(false);

  return (
    <div>
      <Cart onClick={() => setCart(!cart)} showCart={cart} />
      <Auth onClick={() => setLogin(!login)} showLogin={login} />
      <div className={` w-full ${cart || login ? `transition-all delay-${login ? "0" : "500"} duration-${login ? "0" : "200"} ease-in blur-lg pointer-events-none` : `transition-all delay-200 duration-200 ease-in blur-none`}`}>
        <Navbar onCart={() => setCart(!cart)} onLogin={() => setLogin(!login)} />
        <Hero />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
