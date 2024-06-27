"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/app/providers/Session";
import { CartType, GetCart } from "@/app/utils/database/carts";
import { CartCookieType, GetCartFromCookies } from "@/app/utils/cookies/cart";
import { useCartStore } from "@/app/utils/store/cartStore";
import { useLoginStore } from "@/app/utils/store/loginStore";
import { useRouter } from "next/navigation";
import { GetImage } from "..";

interface NavbarProps {
  showProfile?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ showProfile = true }) => {
  const router = useRouter();
  const { session, logout } = useSession();
  const [scroll, setScroll] = useState(false);
  const { isFull } = useCartStore((state) => state);
  const { switchCart } = useCartStore((state) => state);

  const { showLogin, setLogin } = useLoginStore((state) => state);
  useEffect(() => {
    (async () => {
      var cart: CartType | CartCookieType | null = null;
      if (session) {
        cart = await GetCart(session.email);
      } else {
        const cartCookie = await GetCartFromCookies();
        if (cartCookie) {
          cart = JSON.parse(cartCookie);
        }
      }
    })()
  }, [session])

  useEffect(() => {
    const scrollCallback = () => {
      setScroll(window.scrollY > 30);
    }

    document.addEventListener("scroll", scrollCallback)

    return () => {
      document.removeEventListener("scroll", scrollCallback);
    }
  }, [scroll])


  return (
    <>
      <nav style={{ top: scroll ? 0 : 20 }} className={`sticky z-40 ${scroll && `transition-all ease-in-out duration-[500ms] lg:bg-transparent bg-[#1b1b1bc7] lg:border-none border-accent border-b-[1px]`}`}>
        <div className="w-full flex flex-row items-center justify-between px-vw-14 py-vw-8-max@sm">
          <Link href="/">
            <Image
              src={GetImage("img/logo-low.svg")}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-vw-12-min@lg-max@xl"
            />
          </Link>
          <div className="flex flex-row items-center lg:gap-5 md:gap-4 sm:gap-3 gap-2">
            {showProfile && <div className="text-accent font-retro cursor-pointer" onClick={() => { session ? router.push("/profile") : setLogin(true) }}>
              <p className="lg:text-[14px] text-[11px]">Hey, {session ? session.name : "Login"}</p>
              <p className="lg:text-[10px] text-[8px]">{session ? "Your Profile" : "Or Sign Up"}</p>
            </div>}
            <Image
              src={GetImage(isFull ? "img/full-cart.svg" : "img/cart.svg")}
              alt="cart"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-vw-10-min@lg-max@xl cursor-pointer"
              onClick={switchCart}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
