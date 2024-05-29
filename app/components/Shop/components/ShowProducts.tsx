// import React, { useState, useEffect } from "react";
// import { useTransition, animated } from "@react-spring/web";
// import { ProductType } from "@/app/utils/database/collections";
// import { Polaroid } from "./Polaroid";
// import Link from "next/link";

// interface ProductsProps {
//   products: ProductType[];
//   collection: string;
// }

// export const ShowProducts: React.FC<ProductsProps> = ({ products, collection }) => {
//   const transitions = useTransition(products, {
//     key: (product: ProductType) => product,
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//     config: { duration: 150, tension: 50 },
//   });

//   return (
//     <div>
//       <div className="font-retro text-gray-400 text-lg flex flex-row gap-7 justify-center items-baseline">
//         <div className="  my-vw-14-min@sm-max@lg grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-vw-20">
//           {transitions((styles, item) => (
//             <Link href={`/product/${btoa(item.title + "." + collection)}`}>
//               <animated.p style={styles}>
//                 <Polaroid title={item.title} url={item.image} />
//               </animated.p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ProductType } from "@/app/utils/database/collections";
import { Polaroid } from "./Polaroid";
import Link from "next/link";
import { useImagesStore } from "@/app/utils/store/imagesStore";

interface ProductsProps {
  products: ProductType[];
  collection: string;
}

export const ShowProducts: React.FC<ProductsProps> = ({ products, collection }) => {
  const [showTransition, setShowTransition] = useState(false);
  const hasVisited = localStorage.getItem("hasVisited")

  useEffect(() => {
    if (hasVisited) {
      const value = JSON.parse(hasVisited)
      if (value) setShowTransition(true)
      else {
        setTimeout(() => localStorage.setItem("hasVisited", "true"), 1000);
      }
    } else {
      setTimeout(() => localStorage.setItem("hasVisited", "true"), 1000);
    }

    const handleUnload = () => {
      localStorage.setItem("hasVisited", "false");
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [hasVisited]);

  const { images, setAreLoaded } = useImagesStore((state) => state);
  useEffect(() => {
    const productImages = images?.filter((image) => image.collection === collection);
    if (productImages?.length === products.length) {
      setAreLoaded(true)
    }
  }, [images])

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
        <div className="my-vw-14-min@sm-max@lg grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-vw-20">
          {showTransition ? (
            <>
              {transitions((styles, item, { key }) => {
                return (
                  <Link key={key} href={`/product/${btoa(item.title + "." + collection)}`}>
                    <animated.p style={styles}>
                      <Polaroid title={item.title} url={item.image} collection={collection} />
                    </animated.p>
                  </Link>
                );
              })}
            </>

          ) : (
            <>
              {
                products.length > 0 && products.map((product, index) => {
                  return (
                    <Link key={index + product.title} href={`/product/${btoa(product.title + "." + collection)}`}>
                      <p>
                        <Polaroid title={product.title} url={product.image} collection={collection} />
                      </p>
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
