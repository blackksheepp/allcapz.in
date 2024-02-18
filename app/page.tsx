"use client";

import React from "react";
import { useState } from "react";

import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Shop";

const HomePage = () => {
  var [cart, setCart] = useState(false);

  return (
    <div>
      {cart && <Cart onClick={() => setCart(!cart)} showCart={cart} />}
      <div className={` w-full ${cart ? "blur-lg pointer-events-none " : "blur-none"}`}>
        <Navbar onClick={() => setCart(!cart)} />
        <Hero />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
