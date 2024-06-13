"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    CollectionType,
    GetCollections,
    DeleteCollection,
    ReOrderCollections
} from "@/app/utils/database/collections";
import { Collection, NewCollection } from "./components/Collection";
import { WithAuth } from "../components/WithAuth";


export default function Dashboard() {
    const [collections, setCollections] = useState<CollectionType[] | null>(null);
    const refresh = () => GetCollections().then((data) => {
        setCollections(data);
    });

    useEffect(() => {
        refresh();
    }, [])

    const deleteCollection = async (name: string) => {
        await DeleteCollection(name);
        const updateCollection = collections?.filter((c) => c.name != name);
        updateCollection && setCollections(updateCollection);
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

    const handleUpvote = (index: number) => {
        if (collections) {
            if (index > 0) {
                const newCollections = [...collections];
                [newCollections[index], newCollections[index - 1]] = [newCollections[index - 1], newCollections[index]];
                ReOrderCollections(newCollections).then(
                    () => setCollections(newCollections)
                )
            }
        }
    };

    const handleDownvote = (index: number) => {
        if (collections) {
            if (index < collections.length - 1) {
                const newCollections = [...collections];
                [newCollections[index], newCollections[index + 1]] = [newCollections[index + 1], newCollections[index]];
                ReOrderCollections(newCollections).then(
                    () => setCollections(newCollections)
                )
            }
        }
    };

    return (
        <WithAuth>
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
                    <div className="w-full border-[3px] border-dashed border-[#c4c4c4 border-t-0 overflow-y-scroll">
                        <div className="w-full bg-[#c4c4c415] pb-10">
                            {collections ? collections.flatMap((c, i) => {
                                return (
                                    <div className="flex flex-col items-center lg:pt-2 md:lg:pt-2">
                                        <Collection refresh={refresh} data={c} key={i} deleteCollection={deleteCollection} upvote={() => handleUpvote(i)} downvote={() => handleDownvote(i)} />
                                        {i !== collections?.length - 1 && <div className="w-[97%]  mt-5 h-[1px] bg-accent"></div>}

                                        {i === collections.length - 1 && addNewCollection && (
                                            <div className="w-full flex flex-col items-center" ref={newCollectionRef}>
                                                <div className="w-[97%] mt-5 h-[1px] bg-accent"></div>
                                                <NewCollection refresh={refresh} hide={() => setAddNewCollection(false)} />
                                            </div>
                                        )}
                                    </div>
                                )
                            }) : (addNewCollection && <div className="w-full flex flex-col items-center" ref={newCollectionRef}>
                                <div className="w-[97%] mt-5 h-[1px] bg-accent"></div>
                                <NewCollection refresh={refresh} hide={() => setAddNewCollection(false)} />
                            </div>)}
                            {collections?.length === 0 && addNewCollection && <div className="w-full flex flex-col items-center" ref={newCollectionRef}>
                                <NewCollection refresh={refresh} hide={() => setAddNewCollection(false)} />
                            </div>}  
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/img/logo-high.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-vw-16-min@md-max@xl"
                    />
                </Link>
            </div>
        </WithAuth>
    )
}
