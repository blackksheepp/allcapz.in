import React, {  useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ProductType } from "@/app/utils/database/collections";
import { Polaroid } from "./Polaroid";
import Link from "next/link";
import { useMiscStore } from "@/app/utils/store/miscStore";
import { GetImage } from "@/app/components";
interface ProductsProps {
  products: ProductType[];
  collection: string;
}

export const ShowProducts: React.FC<ProductsProps> = ({ products, collection }) => {
  const { showTransition } = useMiscStore((state) => state);

  const transitions = useTransition(products, {
    key: (product: ProductType) => product,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150, tension: 100 },
  });


  return (
    <div>
      <div className="font-retro text-gray-400 text-lg flex flex-row gap-7 justify-center items-baseline">
        <div className="my-vw-14-min@sm-max@lg grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-vw-20">
          {showTransition ? (
            <>
              {transitions((styles, item, { key }) => {
                if (item.hide) return;
                return (
                  <Link key={key} href={`/product/${btoa(item.title + "." + collection)}`}>
                    <animated.div style={styles}>
                      <Polaroid title={item.title} id={item.id}/>
                    </animated.div>
                  </Link>
                );
              })}
            </>

          ) : (
            <>
              {
                products.length > 0 && products.map((product, index) => {
                  if (product.hide) return;
                  return (
                    <Link key={index + product.title} href={`/product/${btoa(product.title + "." + collection)}`}>
                      <div>
                        <Polaroid title={product.title} id={product.id} />
                      </div>
                    </Link>
                  )
                })
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};
