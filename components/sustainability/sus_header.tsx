"use client"
import React from 'react';
import header from "@/assets/sustainability/sus_header/imgi_26_GettyImages-1068216038.jpg"
import Image from "next/image";


const SusHeader = () => {
    return (
        <div className={"flex flex-col justify-center items-center gap-4 pt-18 px-2"}>
            {/*<span>Продумано до основы </span>*/}
            <h1 className={"text-3xl uppercase text-center"}>Продумано до основы </h1>
            <Image src={header} alt={"asd"} className={"w-full md:h-[500px] md:object-cover object-contain"} />
        </div>
    );
};

export default SusHeader;