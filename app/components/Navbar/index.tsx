"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
interface NavbarProps {
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  const [userName, setUserName] = useState<string>("");

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
            <Link
              className="text-accent font-retro"
              href={userName ? "/profile" : "/login"}
            >
              {userName ? (
                <div>
                  <p className="lg:text-[14px]">Hey, {userName}</p>
                  <p className="lg:text-[10px]">Your Profile</p>
                </div>
              ) : (
                <div>
                  <p className="lg:text-[14px]">Hey, Login</p>
                  <p className="lg:text-[10px]">Or Register</p>
                </div>
              )}
            </Link>
            <Image
              src="/img/cart.png"
              alt="cart"
              width={0}
              height={0}
              sizes="100vw"
              className="dropshadow w-auto h-vw-10-min@lg-max@xl cursor-pointer"
              onClick={onClick}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
