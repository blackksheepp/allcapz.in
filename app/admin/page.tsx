"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import withAuth from "./components/WithAuth";
import { FitTexture } from "../components/TextureOverlay";

import { ObjectElement } from "./components/Common";
import { CollectionElement, Collection } from "./components/Collection";
import { ProductElement, Product } from "./components/Product";

import { CollectionForm } from "./components/Collection/Form";
import { ProductForm } from "./components/Product/Form";
import { DNDList } from "./components/DNDList";
import { DropResult, Draggable } from "react-beautiful-dnd";
import { CollectionType, ProductType } from "@/database/collections";
import {
  CreateCollection,
  CreateProduct,
  GetCollections,
  GetProducts,
  ReOrder,
  RenameCollection,
  RenameProduct,
  SaveImage,
} from "@/app/utils/database/collections";

const Admin = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [objectName, setObjectName] = useState<string>("");

  const [productImage, setProductImage] = useState<string>("");
  const [productTitle, setProductTitle] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productSize, setProductSize] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState<boolean>(false);

  const [haveObjects, setHaveObjects] = useState<boolean>(true);
  const [objectElement, setObjectElement] = useState<
    CollectionElement[] | ObjectElement[] | ProductElement[] | null
  >(null);

  const [Rename, setRename] = useState(false);
  const [oldObjectName, setOldObjectName] = useState("");

  const [collectionName, setCollectionName] = useState("");
  const showCollections = () => {
    return collectionName == "";
  };

  const saveImage = async () => {
    if (imageFile) {
      const form = new FormData();
      form.append("photo", imageFile);
      const url = await SaveImage(form);
      await CreateProduct(
        productTitle,
        url!,
        Number(productPrice),
        productSize,
        collectionName!
      );
      setProductTitle("");
      setProductPrice("");
    }

    return true;
  };

  const loadProducts = (collection: string) => {
    setCollectionName(collection);
  };

  useEffect(() => {
    renderObjects(true);
  }, [collectionName]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedObjects = Array.from(objectElement!);
    const [removed] = reorderedObjects.splice(result.source.index, 1);
    reorderedObjects.splice(result.destination.index, 0, removed);

    setObjectElement(reorderedObjects);
    await renderObjects(
      await ReOrder(
        reorderedObjects.map((object) => {
          if ((object as CollectionElement).collection) {
            return (object as CollectionElement).collection;
          }
          return (object as ProductElement).product;
        }),
        collectionName
      )
    );
  };

  const renderObjects = async (show: boolean | undefined) => {
    if (!show) return;

    let objects: (CollectionType | ProductType)[] | null;
    collectionName == ""
      ? await GetCollections()
      : await GetProducts(collectionName!);

    let objectElements;
    if (showCollections()) {
      objects = await GetCollections();
      objectElements = objects?.map((o, i) => {
        return { key: i.toString(), collection: o } as CollectionElement;
      });
    } else {
      objects = await GetProducts(collectionName!);
      objectElements = objects?.map((o, i) => {
        return { key: i.toString(), product: o } as ProductElement;
      });
    }

    setHaveObjects(objects ? objects.length > 0 : false);
    if (objectElements) {
      setObjectElement(objectElements);
    }
  };

  const createNewObject = async () => {
    await renderObjects(
      showCollections() ? await CreateCollection(objectName) : await saveImage()
    );
    setObjectName("");
  };

  const renameOldObject = async () => {
    var newObjectName = objectName;

    const k = showCollections()
      ? await RenameCollection(oldObjectName, newObjectName)
      : await RenameProduct(collectionName, oldObjectName, newObjectName);

    console.log(k);
    await renderObjects(k);
    setObjectName("");
  };

  const refresh = () => {
    renderObjects(true);
  };

  const rename = (oldObjectName: string) => {
    setOldObjectName(oldObjectName);
    setShowForm(true);
    setRename(true);
  };

  const handleZoom = (imgUrl: string) => {
    setZoom(!zoom);
    setProductImage(imgUrl);
  };
  return (
    <div>
      <div className={`${zoom ? "z-0 blur-lg" : ""}`}>
        <div
          className={`absolute w-full h-screen flex items-center justify-center flex-col gap-3 ${
            showForm ? "blur-sm" : "blur-0"
          }`}
        >
          <p className="font-retro text-accent text-[35px] dropshadow ">
            Manage Store
          </p>

          <div className="shadow-[6px_6px_0px_0px_rgba(70,70,70)] w-[80%] min-h-[80%] overflow-y-auto border-accent border-4 mb-10">
            {collectionName ? (
              <div className="font-retro text-accent text-2xl py-3 border-b-[3px] flex flex-row justify-between pl-5 pr-7">
                <p>{collectionName}</p>
                <p
                  className="text-sm flex items-center pt-1 cursor-pointer"
                  onClick={() => {
                    setCollectionName("");
                  }}
                >
                  Back
                </p>
              </div>
            ) : (
              <></>
            )}
            {haveObjects ? (
              <DNDList onDragEnd={onDragEnd}>
                {objectElement?.map((product, index) => (
                  <Draggable
                    key={product.key}
                    draggableId={product.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        {showCollections() ? (
                          <Collection
                            key={product.key}
                            collection={
                              (product as CollectionElement).collection
                            }
                            refresh={refresh}
                            rename={rename}
                            loadProducts={loadProducts}
                            isDragging={snapshot.isDragging}
                            dragHandle={provided.dragHandleProps}
                          />
                        ) : (
                          <Product
                            key={product.key}
                            product={(product as ProductElement).product}
                            collectionName={collectionName}
                            refresh={refresh}
                            rename={rename}
                            isDragging={snapshot.isDragging}
                            dragHandle={provided.dragHandleProps}
                            setZoom={handleZoom}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              </DNDList>
            ) : (
              <div className="w-full">
                <p className="font-retro italic text-gray-300 text-xs max-w-max mx-auto mt-4">
                  No Collections Yet...
                </p>
              </div>
            )}
            {/* Create Collection Button */}
            <button
              className="btn w-auto h-auto font-retro text-black flex flex-row gap-1 px-4 py-3 mx-auto my-6 items-center justify-center"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              <Image
                src="/img/add.svg"
                alt="show"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[18px] h-auto"
              />
              <p className="font-retro text-black text-[15px]">
                {collectionName ? "Add Products" : "Create New Collection"}
              </p>
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="absolute w-full h-screen z-30 grid place-items-center">
            <div className="absolute w-[80%] max-w-[400px] bg-black overflow-y-visible border-accent border-4 shadow-[6px_6px_0px_0px_rgba(70,70,70)]">
              <FitTexture />
              <div
                className="w-full max-w-max ml-auto mr-2 mt-3 mb-5 cursor-pointer"
                style={{ filter: "drop-shadow(1.5px 1.5px rgb(70, 70, 70))" }}
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                <Image
                  src="/img/close.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[15px] h-auto"
                />
              </div>
              {showCollections() ? (
                <CollectionForm
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (Rename) {
                      renameOldObject();
                      setRename(false);
                    } else {
                      createNewObject();
                    }
                    setShowForm(!showForm);
                  }}
                  objectName={objectName}
                  setObjectName={setObjectName}
                  Rename={Rename}
                />
              ) : (
                <ProductForm
                  onSubmit={(event) => {
                    event.preventDefault(); // Prevents the default form submission behavior
                    if (Rename) {
                      renameOldObject();
                      setRename(false);
                    } else {
                      createNewObject();
                    }
                    setShowForm(!showForm);
                  }}
                  setImageFile={setImageFile}
                  productTitle={productTitle}
                  setProductTitle={setProductTitle}
                  productPrice={productPrice}
                  setProductPrice={setProductPrice}
                  productSize={productSize}
                  setProductSize={setProductSize}
                  Rename={Rename}
                />
              )}{" "}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {zoom ? (
        <div
          className="absolute z-40 w-full h-screen"
          onClick={() => {
            setZoom(false);
          }}
        >
          <div className="h-full max-h-max flex items-center justify-center">
            <Image
              src={productImage}
              alt="productimg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-itmz h-auto cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default withAuth(Admin);
