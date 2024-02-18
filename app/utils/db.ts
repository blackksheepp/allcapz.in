"use server";

import {
  CollectionType,
  ProductType,
  createCollection,
  createProduct,
  getCollections,
  getProducts,
  reOrder,
  renameCollection,
  renameProduct,
  delCollection,
  delProduct,
  getProductByTitle,
} from "@/database/collections";

export const CreateCollection = async (name: string) => {
  return await createCollection(name);
};

export const CreateProduct = async (
  title: string,
  image: string,
  price: number,
  size: string,
  collection: string
) => {
  return await createProduct(
    title,
    image,
    price,
    size,
    collection
  );
};

export const GetCollections = async () => {
  return await getCollections();
};
export const GetProducts = async (name: string) => {
  return await getProducts(name);
};

export const ReOrder = async (
  objects: (CollectionType | ProductType)[],
  collection: string | false
) => {
  return await reOrder(objects, collection);
};
export const RenameCollection = async (
  oldCollectionName: string,
  newCollectionName: string
) => {
  return await renameCollection(oldCollectionName, newCollectionName);
};

export const RenameProduct = async (
  collection: string,
  oldProductTitle: string,
  newProductTitle: string
) => {
  return await renameProduct(collection, oldProductTitle, newProductTitle);
};

export const DelCollection = async (name: string) => {
  return await delCollection(name);
};

export const DelProduct = async (collection: string, title: string) => {
  return await delProduct(collection, title);
};

export const SaveImage = async (form: FormData) => {
  const res = await fetch("https://graph.org/upload", {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);

  const url = `https://graph.org${json[0].src}`;
  return url;
};

export const GetProductByTitle = async (collection: string, title: string) => {
  return await getProductByTitle(collection, title);
};
