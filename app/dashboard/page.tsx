"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    CollectionType,
    CreateCollection,
    CreateProduct,
    GetCollections,
    ProductType,
    ReOrder,
    RenameCollection,
    RenameProduct,
    SaveImage,
    DelCollection,
    DelProduct
} from "@/app/utils/database/collections";


const Product = ({ data: { image, title, price }, refresh, hide, collection }: { data: ProductType, refresh: () => void, hide: () => void, collection: string }) => {
    return (
        <div className="w-full flex flex-row items-center justify-between py-3">
            <div className="w-full flex flex-row lg:gap-10 md:gap-10 gap-1 lg:px-6 md:px-6">
                <div className="w-[30px] flex flex-col gap-1 items-center justify-center">
                    <Image
                        src="/img/upvote.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        className="w-auto lg:h-7 md:h-5 h-4 cursor-pointer"
                    />
                    <Image
                        src="/img/upvote.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        className="w-auto lg:h-7 md:h-5 h-4 rotate-[180deg] cursor-pointer"
                    />
                </div>

                <div className="lg:w-full md:w-full w-vw-150-max@sm mr-vw-10 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-vw-10">
                        <Image
                            src={image}
                            alt="productimg"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="lg:w-[75px] md:w-[65px] w-[45px] h-auto cursor-pointer"
                        />

                        <p className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm">{title}</p>
                    </div>
                    <p className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm">{price}</p>
                </div>
            </div>

            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-5 md:gap-5 gap- pr-vw-7">
                <p className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Edit</p>
                <p onClick={() => { DelProduct(collection, title); hide(); refresh(); }} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Remove</p>
            </div>

        </div>
    )
};

const NewProduct = ({ refresh, hide, collection }: { refresh: () => void, hide: () => void, collection: string }) => {
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductImageUrl, setNewProductImageUrl] = useState("");
    const [newProductImage, setNewProductImage] = useState<File | null>(null);

    const [takeInputTitle, setTakeInputTitle] = useState(false);
    const [takeInputPrice, setTakeInputPrice] = useState(false);
    const [takeInputImage, setTakeInputImage] = useState(false);

    useEffect(() => {
        if (newProductImage) {
            console.log("yes new")
            const form = new FormData();
            form.append("photo", newProductImage);
            SaveImage(form).then(url => {
                console.log("URL", url)
                if (url) {
                    setNewProductImageUrl(url);
                    setTakeInputImage(true);
                }
            })

          
        }
    }, [newProductImage])


    const finalAddProduct = async () => {
        if (newProductTitle !== "" && newProductPrice !== "" && newProductImageUrl !== "") {
            const response = await CreateProduct(
                newProductTitle,
                newProductImageUrl,
                Number(newProductPrice),
                "M",
                collection
            );
            if (response) {
                hide();
                refresh();
            }
        }
    };
    return (
        <div className="w-full flex flex-row items-center py-3 pl-2">
            <div className="flex flex-row items-center gap-0 md:gap-vw-5 ">
                <div className="relative lg:w-[75px] md:w-[65px] w-[45px] grid place-items-center">
                    {!takeInputImage && <label className="absolute text-center font-ibm font-[500] pointer-events-none text-xsTosm">Upload Image</label>}
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        onChange={(event) => {
                            if (event.target.files) setNewProductImage(event.target.files[0]);
                        }}
                        className="w-full h-full absolute hidden"
                    />
                    <Image
                        onClick={() => document.getElementById('file-input')?.click()}
                        src={newProductImageUrl || "/img/placeholder.png"}
                        alt="productimg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto cursor-pointer"
                    />
                </div>
                {takeInputTitle ? (
                    <textarea
                        value={newProductTitle}
                        onChange={(e) => setNewProductTitle(e.target.value)}
                        className="w-24 md:w-48 text-center bg-transparent placeholder:text-accent  outline-none px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                        placeholder={!takeInputTitle ? "Title" : ""}
                    />
                ) : (
                    <div
                        onClick={() => setTakeInputTitle(true)}
                        className="underline cursor-pointer px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                    >
                        Title
                    </div>
                )}
                {takeInputPrice ? (
                    <input
                        type="text"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="w-vw-10 bg-transparent placeholder:text-accent  outline-none px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                        placeholder={!takeInputPrice ? "Price" : ""}
                    />
                ) : (
                    <div
                        onClick={() => setTakeInputPrice(true)}
                        className="underline cursor-pointer px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                    >
                        Price
                    </div>
                )}
                <div className="flex flex-col min-[415px]:flex-row gap-1 min-[415px]:gap-vw-5">
                    <p onClick={finalAddProduct} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Add</p>
                    <p onClick={hide} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Remove</p>
                </div>
            </div>
        </div>
    )

}

interface CollectionProps {
    data: CollectionType,
    deleteCollection: (name: string) => Promise<void>,
    refresh: () => void
}

const Collection: React.FC<CollectionProps> = ({ data: { name, products }, deleteCollection, refresh }) => {
    const newProductRef = useRef<HTMLDivElement>(null);
    const [addNewProduct, setAddNewProduct] = useState(false);
    useEffect(() => {
        if (addNewProduct) {
            if (newProductRef.current) {
                newProductRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [addNewProduct])

    const addProduct = () => {
        setAddNewProduct(true)
        if (addNewProduct) {
            if (newProductRef.current) {
                newProductRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    return (
        <div className="w-full lg:px-6 md:px-6 px-2 pt-4">
            {/* Collection Heading */}
            <div className="w-full flex flex-row gap-vw-5 items-center mb-vw-4">
                <p className="px-2 text-accent font-ibm font-[500] text-lgTo2xl">{name}</p>
                <div className="w-[30px] flex flex-row gap-1 items-center justify-center">
                    <Image
                        src="/img/upvote.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        className="w-auto lg:h-7 md:h-5 h-4 cursor-pointer"
                    />
                    <Image
                        src="/img/upvote.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        className="w-auto lg:h-7 md:h-5 h-4 rotate-[180deg] cursor-pointer"
                    />
                </div>

                <p onClick={addProduct} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2  py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Add</p>
                <p onClick={() => { deleteCollection(name) }} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2 py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">Remove</p>

            </div>

            {/* Products */}
            {products?.map((p, i) => {
                return <Product data={p} key={i} refresh={refresh} hide={() => { setAddNewProduct(false) }}  collection={name}/>
            })}
            {addNewProduct && <div ref={newProductRef}>
                <NewProduct collection={name} refresh={refresh} hide={() => { setAddNewProduct(false) }} />
            </div>}
        </div>
    )
};


const NewCollection = ({ refresh, hide }: { refresh: () => void, hide: () => void }) => {
    const [newCollection, setNewCollection] = useState("");
    const [takeInput, setTakeInput] = useState(false);

    const finalAddCollection = async () => {
        if (newCollection !== "") {
            const response = await CreateCollection(newCollection);
            if (response) {
                hide();
                refresh();
            }
        }
    };

    return (
        <div className="w-full lg:px-6 md:px-6 px-2 py-4 pt-5">
            <div className="w-full flex flex-row gap-vw-5 items-center mb-vw-4">
                {takeInput ? (
                    <input
                        type="text"
                        value={newCollection}
                        onChange={(e) => setNewCollection(e.target.value)}
                        className="bg-transparent placeholder:text-accent  outline-none px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                        placeholder={!takeInput ? "Enter Collection Name" : ""}
                    />
                ) : (
                    <div
                        onClick={() => setTakeInput(true)}
                        className="underline cursor-pointer px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                    >
                        Name
                    </div>
                )}
                <div className="flex flex-col min-[320px]:flex-row gap-1 min-[320px]:gap-vw-5">
                    <p
                        onClick={finalAddCollection}
                        className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2 h-[24px] lg:h-[28px] bg-[#c4c4c4] text-background border-black border-[1px] dropshadow"
                    >
                        Add
                    </p>
                    <p onClick={hide} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2 h-[24px] lg:h-[28px] bg-[#c4c4c4] text-background border-black border-[1px] dropshadow">
                        Remove
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [collection, setCollection] = useState<CollectionType[] | null>(null);
    const refresh = () => GetCollections().then((data) => {
        setCollection(data);
    });

    useEffect(() => {
        refresh();
    }, [])

    const deleteCollection = async (name: string) => {
        await DelCollection(name);
        const updateCollection = collection?.filter((c) => c.name != name);
        updateCollection && setCollection(updateCollection);
    }

    const newCollectionRef = useRef<HTMLDivElement>(null);
    const [addNewCollection, setAddNewCollection] = useState(false);
    useEffect(() => {
        if (addNewCollection) {
            if (newCollectionRef.current) {
                newCollectionRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [addNewCollection])

    const addCollecion = () => {
        setAddNewCollection(true)
        if (addNewCollection) {
            if (newCollectionRef.current) {
                newCollectionRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-between py-vw-10-min@xl">

            {/* Title */}
            <p className="text-accent text-t2xlTo4xl font-retro">Manage Stores</p>


            {/* Store */}
            <div className="w-[85%] h-[80%] flex flex-col items-center my-vw-5">
                {/* Store Title */}
                <div className="w-full min-h-10 bg-[#c4c4c4] flex items-center flex-row gap-vw-7-max@sm">
                    <p className="text-background text-xl pl-3 font-ibm font-[600]">Store</p>
                    <p onClick={addCollecion} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[22px] lg:h-[24px] bg-background text-accent border-black border-[1px] dropshadow">Add Collection</p>
                </div>

                {/* Collections */}
                <div className="w-full border-[3px] border-dashed border-[#c4c4c4] overflow-y-scroll">
                    <div className="w-full bg-[#c4c4c425]">
                        {collection?.flatMap((c, i) => {
                            return (
                                <div className="flex flex-col items-center lg:pt-2 md:lg:pt-2">
                                    <Collection refresh={refresh} data={c} key={i} deleteCollection={deleteCollection} />
                                    {i !== collection?.length - 1 && <div className="w-[97%]  mt-5 h-[1px] bg-[#c4c4c4]"></div>}

                                    {i === collection.length - 1 && addNewCollection && (
                                        <div className="w-full flex flex-col items-center" ref={newCollectionRef}>
                                            <div className="w-[97%] mt-5 h-[1px] bg-[#c4c4c4]"></div>
                                            <NewCollection refresh={refresh} hide={() => setAddNewCollection(false)} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>

            {/* Logo */}
            <Link href="/">
                <Image
                    src="/img/LOGO NEW.png"
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-vw-16-min@md-max@xl"
                />
            </Link>
        </div>
    )
}
