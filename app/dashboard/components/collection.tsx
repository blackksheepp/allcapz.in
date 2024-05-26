import { CollectionType, CreateCollection, ReOrderProduct, RenameCollection } from "@/app/utils/database/collections";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { NewProduct, Product } from "./product";

interface CollectionProps {
    data: CollectionType,
    deleteCollection: (name: string) => Promise<void>,
    refresh: () => void,
    upvote: () => void,
    downvote: () => void,
}


export const Collection: React.FC<CollectionProps> = ({ data: { name, products }, deleteCollection, refresh, upvote, downvote }) => {
    const newProductRef = useRef<HTMLDivElement>(null);
    const [addNewProduct, setAddNewProduct] = useState(false);

    useEffect(() => {
        if (addNewProduct) {
            newProductRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [addNewProduct]);

    const addProduct = () => {
        setAddNewProduct(true);
        newProductRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(name);
    const renameCollection = () => {
        if (newName !== "") {
            RenameCollection(name, newName).then(() => {
                refresh();
                setRename(false);
            })
        }
    };

    const handleUpvoteProduct = (index: number) => {
        if (products) {
            if (index > 0) {
                console.log(index, "INDEXX UP")

                const newProducts = [...products];
                [newProducts[index], newProducts[index - 1]] = [newProducts[index - 1], newProducts[index]];
                ReOrderProduct(name, newProducts).then(() => refresh())
            }
        } 
    };

    const handleDownvoteProduct = (index: number) => {

        if (products) {
            if (index < products.length - 1) {
                const newProducts = [...products];
                [newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
                ReOrderProduct(name, newProducts).then(() => refresh())
            }
        }
    };

    return (
        <div className="w-full lg:px-6 md:px-6 px-2 pt-4">
            {/* Collection Heading */}
            <div className="w-full flex flex-col sm:flex-row gap-vw-5 sm:items-center mb-vw-4">
                <div className="flex flex-row items-center sm:justify-center">
                    {rename ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className=" bg-transparent px-2 placeholder:text-accent text-accent font-ibm font-[500] text-lgTo2xl outline-none border-b border-accent mr-3 text-start"
                            size={newName.length ?? 5}
                        />
                    ) : (
                        <p className="px-2 text-accent font-ibm font-[500] text-lgTo2xl mr-3">{name}</p>
                    )}
                    <Image
                        src="/img/edit2.svg"
                        alt="logo"
                        width={20}
                        height={20}
                        className="w-auto lg:h-5 md:h-4 h-3 cursor-pointer"
                        onClick={() => setRename(!rename)}
                    />
                </div>

                <div className="flex flex-row gap-vw-5 px-2">
                    <div className="w-[30px] flex flex-row gap-1 items-center justify-center">
                        <Image
                            onClick={upvote}
                            src="/img/upvote.svg"
                            alt="logo"
                            width={20}
                            height={20}
                            className="w-auto lg:h-7 md:h-5 h-4 cursor-pointer"
                        />
                        <Image
                            onClick={downvote}
                            src="/img/upvote.svg"
                            alt="logo"
                            width={20}
                            height={20}
                            className="w-auto lg:h-7 md:h-5 h-4 rotate-[180deg] cursor-pointer"
                        />
                    </div>

                    <p
                        onClick={rename ? renameCollection : addProduct}
                        className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2 py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow"
                    >
                        {rename ? "Save" : "Add"}
                    </p>
                    <p
                        onClick={rename ? () => setRename(false) : () => deleteCollection(name)}
                        className="active:mt-[2px] active:mr-[2px] duration-50 cursor-pointer font-ibm text-xs md:text-[16px] font-[600] grid place-items-center px-2 py-0.5 bg-[#c4c4c4] text-background border-black border-[1px] dropshadow"
                    >
                        {rename ? "Cancel" : "Remove"}
                    </p>
                </div>
            </div>

            {/* Products */}
            {products?.map((p, i) => (
                <Product
                    data={p}
                    key={i}
                    refresh={refresh}
                    hide={() => setAddNewProduct(false)}
                    collection={name}
                    upvote={() => { handleUpvoteProduct(i) }}
                    downvote={() => { handleDownvoteProduct(i) }}
                />
            ))}
            {addNewProduct && (
                <div ref={newProductRef}>
                    <NewProduct
                        collection={name}
                        refresh={refresh}
                        hide={() => setAddNewProduct(false)}
                    />
                </div>
            )}
        </div>
    );
};


export const NewCollection = ({ refresh, hide }: { refresh: () => void, hide: () => void }) => {
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
                        placeholder={"Name"}
                        size={newCollection.length}
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
