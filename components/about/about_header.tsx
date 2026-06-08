"use client"
import React from 'react';
import header from "@/assets/about/about_header/DGH_8444.jpg"
import Image from "next/image";

interface AboutHeaderProps {
    dict: {
        subtitle: string;
        title: string;
    };
}

const AboutHeader = ({ dict }: AboutHeaderProps) => {
    return (
        <div className={"flex flex-col justify-center items-center gap-4 pt-18 px-2"}>
            <span>{dict.subtitle}</span>
            <h1 className={"text-3xl uppercase text-center"}>{dict.title}</h1>
            <Image src={header} alt={"asd"} className={"w-full md:h-[500px] md:object-cover object-contain"} />
        </div>
    );
};

export default AboutHeader;