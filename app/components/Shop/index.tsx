"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { GetCollections, GetProducts } from "@/app/utils/db";
import {
  CollectionType,
  ProductType,
  getCollections,
} from "@/database/collections";
import { TitleSlide } from "./components/TitleSlide";
import { ShowProducts } from "./components/ShowProducts";

const Products = () => {
  const [collections, setCollections] = useState<CollectionType[]>();
  const [products, setProducts] = useState<ProductType[]>();
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const cls = await GetCollections();
      if (cls) {
        setCollections(cls);
        var actv;
        if (!active) {
          actv = cls[0].name;
          setActive(cls[0].name);
        } else {
          actv = active;
        }
        const itms = await GetProducts(actv);
        if (itms) {
          setProducts(itms);
        }
      }
    })();
  }, [active]);

  return (
    <div className="mt-vw-10-min@lg mx-vw-32">
      <section>
        <div className="font-retro text-xl text-center text-gray-400 py-vw-1.5 flex flex-col gap-1 mx-auto">
          <div className="flex flex-row justify-center items-baseline gap-7">
            {collections ? (
              <TitleSlide
                titles={collections.map((c) => c.name)}
                active={active}
                setActive={setActive}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          {products ? (
            <ShowProducts products={products} collection={active!} />
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
