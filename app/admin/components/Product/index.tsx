import { ObjectElement } from "../Common";
import Image from "next/image";
import { ProductType } from "@/database/collections";
import { DelProduct } from "@/app/utils/db";
export interface ProductElement extends ObjectElement {
  product: ProductType;
  collectionName: string;
  setZoom: (imgUrl: string) => void;
}

export const Product: React.FC<ProductElement> = ({
  product,
  collectionName,
  refresh,
  rename,
  isDragging,
  dragHandle,
  setZoom,
}) => {
  return (
    <div
      className={`text-accent font-retro flex flex-row items-center justify-between border-accent border-b-[3px] h-itmh px-itmg2 ${
        isDragging ? "border-[3px] bg-black" : ""
      }`}
    >
      <div className="flex flex-row justify-between products-baseline w-full">
        <div className="flex flex-row gap-itmg items-center">
          <Image
            src="/img/drag.png"
            alt="drag"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-drgb cursor-pointer"
            {...dragHandle}
          />

          <Image
            src={product?.image}
            alt=" "
            width={0}
            height={0}
            sizes="100vw"
            className="w-itmim h-auto cursor-pointer"
            onClick={() => {
              setZoom(product?.image);
            }}
          />
          <div className="flex flex-col gap-1 lg:gap-0">
            <p className="text-itmn">{product?.title}</p>
            <p className="text-itmd text-gray-400">{product?.size}</p>
            <p className="text-itmd text-gray-400">{product?.price}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <Image
            src="/img/edit.png"
            alt="edit"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-edtb cursor-pointer"
            onClick={() => {
              rename(product?.title);
            }}
          />
          <Image
            src="/img/trash.svg"
            alt="trash"
            width={0}
            height={0}
            sizes="100vw"
            className="w-edtb h-auto cursor-pointer"
            onClick={() => {
              if (product) DelProduct(collectionName, product.title);
              refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
};
