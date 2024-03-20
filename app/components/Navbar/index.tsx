"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/app/Providers/Session";

interface NavbarProps {
  onCart: () => void;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCart: onCart, onLogin: onLogin }) => {
  const { session, logout } = useSession();
  return (
    <>
      <nav className="sticky top-7 z-40">
        <div className="w-full flex flex-row items-center justify-between px-vw-14 mt-vw-7-min@xl">
          <Link href="/">
            <Image
              src="/img/LOGO.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="dropshadow w-auto h-vw-10-min@lg-max@xl"
            />
          </Link>
          <div className="flex flex-row items-center lg:gap-5 md:gap-4 sm:gap-3 gap-2">
            <div className="text-accent font-retro cursor-pointer" onClick={() => {!session && onLogin()}}>
              <p className="lg:text-[14px] text-[11px]">Hey, {session ? session.name : "Login"}</p>
              <p className="lg:text-[10px] text-[8px]" onClick={() => { session && logout() }}>{session ? "Your Profile" : "Or Sign Up"}</p>
            </div>
            <Image
              src="/img/cart.png"
              alt="cart"
              width={0}
              height={0}
              sizes="100vw"
              className="dropshadow w-auto h-vw-10-min@lg-max@xl cursor-pointer"
              onClick={onCart}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
