import { CreateProduct, DeleteProduct, EditProduct, ProductType, SaveImage } from "@/app/utils/database/collections";
import { GetImage } from "@/app/components";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductProps {
    data: ProductType;
    refresh: () => void;
    hide: () => void;
    collection: string;
    upvote: () => void;
    downvote: () => void;
}
export const Product: React.FC<ProductProps> = ({ data: { id, title, price }, refresh, hide, collection, upvote, downvote }) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newPrice, setNewPrice] = useState(price);

    const handleEdit = async () => {
        await EditProduct(collection, title, newTitle, newPrice);
        refresh();
        setEditMode(false);
    };

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between py-3">
            <div className="w-full flex flex-row lg:gap-10 md:gap-10 gap-1 lg:px-6 md:px-6 items-center justify-between sm:justify-start">
                <div className="w-full flex flex-row items-center justify-between gap-vw-10">
                    <div className="flex flex-row items-center gap-vw-10">
                        <div className="w-[30px] flex flex-col gap-1 items-center justify-center">
                            <Image
                                onClick={upvote}
                                src={GetImage("img/upvote.svg")}
                                alt="logo"
                                width={0}
                                height={0}
                                className="w-auto lg:h-7 md:h-5 h-4 cursor-pointer"
                            />
                            <Image
                                onClick={downvote}
                                src={GetImage("img/downvote.svg")}
                                alt="logo"
                                width={0}
                                height={0}
                                className="w-auto lg:h-7 md:h-5 h-4 rotate-[180deg] cursor-pointer "
                            />
                        </div>
                        <Image
                            src={GetImage(id)}
                            alt="productimg"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="lg:w-[75px] md:w-[65px] w-[45px] h-auto cursor-pointer"
                        />

                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm outline-none bg-transparent border-b border-accent"
                                    size={newTitle.length}
                                />
                            </>
                        ) : (
                            <>
                                <p className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm">{title}</p>
                            </>
                        )}
                    </div>
                </div>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(parseInt(e.target.value))}
                            className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm outline-none bg-transparent border-b border-accent pr-vw-7 md:pr-0"
                            size={newPrice.toLocaleString().length}
                        />
                    </>
                ) : (
                    <>
                        <p className="font-ibm font-[400] text-accent text-xsTosm lg:text-lg md:text-sm  pr-vw-7 md:pr-0">{price}</p>
                    </>
                )}
            </div>



            <div className="flex flex-row sm:flex-col md:flex-row self-start md:self-auto md:gap-5 sm:gap-0 gap-5 pl-8 pr-vw-7 pt-vw-10 sm:pt-0">
                <p onClick={editMode ? handleEdit : () => setEditMode(true)}
                    className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-accent text-background border-black border-[1px] dropshadow"
                >
                    {editMode ? "Save" : "Edit"}
                </p>
                <p
                    onClick={editMode ? () => { setEditMode(false) } : () => { DeleteProduct(collection, title); hide(); refresh(); }}
                    className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-red-700 text-accent border-black border-[1px] dropshadow"
                >
                    {editMode ? "Cancel" : "Remove"}
                </p>
            </div>
        </div>
    );
};


export const NewProduct = ({ refresh, hide, collection }: { refresh: () => void, hide: () => void, collection: string }) => {
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductImage, setNewProductImage] = useState<File | null>(null);
    const [newProductId, setNewProductId] = useState("");

    const [takeInputTitle, setTakeInputTitle] = useState(false);
    const [takeInputPrice, setTakeInputPrice] = useState(false);
    const [takeInputImage, setTakeInputImage] = useState(false);

    useEffect(() => {
        (async () => {
            if (newProductImage) {
                const form = new FormData();
                form.append("file", newProductImage);
                const { id } = await SaveImage(form)
                setNewProductId(id);
                setTakeInputImage(true);
            }
        })()
    }, [newProductImage])



    const finalAddProduct = async () => {
        if (newProductTitle !== "" && newProductPrice !== "" && newProductId !== "") {
            const response = await CreateProduct(
                newProductId,
                newProductTitle,
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
        <div className="w-full flex flex-col sm:flex-row  items-center justify-between py-3">
            <div className="w-full flex flex-row lg:gap-10 md:gap-10 gap-1 lg:px-6 md:px-6 items-center justify-between sm:justify-start">
                <div className="w-full flex flex-row items-center justify-between gap-vw-10">
                    <div className="flex flex-row items-center gap-vw-10">
                        <div className="w-[30px] flex flex-col gap-1 items-center justify-center">
                            <Image
                                src={GetImage("img/upvote.svg")}
                                alt="logo"
                                width={0}
                                height={0}
                                className="w-auto lg:h-7 md:h-5 h-4 cursor-pointer"
                            />
                            <Image
                                src={GetImage("img/downvote.svg")}
                                alt="logo"
                                width={0}
                                height={0}
                                className="w-auto lg:h-7 md:h-5 h-4 rotate-[180deg] cursor-pointer"
                            />
                        </div>
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
                                src={newProductId ? GetImage(newProductId) : GetImage("img/placeholder.svg")}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto cursor-pointer"
                            />
                        </div>
                        {takeInputTitle ? (
                            <input
                                value={newProductTitle}
                                onChange={(e) => setNewProductTitle(e.target.value)}
                                className="text-start w-24 md:w-48  bg-transparent placeholder:text-accent  outline-none px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                                placeholder={"Title"}
                                size={newProductTitle.length}
                            />
                        ) : (
                            <div
                                onClick={() => setTakeInputTitle(true)}
                                className="underline cursor-pointer px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                            >
                                Title
                            </div>
                        )}
                    </div>
                </div>
                {takeInputPrice ? (
                    <input
                        type="text"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="bg-transparent text-end placeholder:text-accent  outline-none px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                        placeholder={"000"}
                        size={newProductPrice.length}
                    />
                ) : (
                    <div
                        onClick={() => setTakeInputPrice(true)}
                        className="text-end underline cursor-pointer px-2 text-accent font-ibm font-[500] text-xsTo2xl"
                    >
                        Price
                    </div>
                )}
            </div>

            <div className="flex flex-row sm:flex-col md:flex-row self-start md:self-auto md:gap-5 sm:gap-0 gap-5 pl-8 pr-vw-7 pt-vw-10 sm:pt-0">
                <p onClick={finalAddProduct} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-accent text-background border-black border-[1px] dropshadow">Add</p>
                <p onClick={hide} className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs lg:text-[16px] md:text-sm font-[600] grid place-items-center px-2 h-[23px] lg:h-[25px] bg-red-700 text-accent border-black border-[1px] dropshadow">Remove</p>
            </div>

        </div>
    )
};
