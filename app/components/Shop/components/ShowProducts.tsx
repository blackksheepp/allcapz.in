import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ProductType } from "@/app/utils/database/collections";
import { Polaroid } from "./Polaroid";
import Link from "next/link";

interface ProductsProps {
  products: ProductType[];
  collection: string;
}

export const ShowProducts: React.FC<ProductsProps> = ({ products, collection }) => {
  const transitions = useTransition(products, {
    key: (product: ProductType) => product,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 250, tension: 100 },
  });

  return (
    <div>
      <div className="font-retro text-gray-400 text-lg flex flex-row gap-7 justify-center items-baseline">
        <div className="  my-vw-14-min@sm-max@lg grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-vw-20">
          {transitions((styles, item) => (
            <Link href={`/product/${btoa(item.title + "." + collection)}`}>
              <animated.p style={styles}>
                <Polaroid title={item.title} url={item.image} />
              </animated.p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
