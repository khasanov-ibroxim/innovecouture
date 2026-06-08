"use client"
import React from 'react';
import header from "@/assets/sustainability/sus_header/dikim2.jpg"
import Image from "next/image";

interface SusHeaderProps {
    dict: {
        title: string;
    };
}

const SusHeader = ({ dict }: SusHeaderProps) => {
    return (
        <div className={"flex flex-col justify-center items-center gap-4 pt-18 px-2"}>
            <h1 className={"text-3xl uppercase text-center"}>{dict.title}</h1>
            <Image src={header} alt={"asd"} className={"w-full md:h-[500px] md:object-cover object-contain"} />
        </div>
    );
};

export default SusHeader;