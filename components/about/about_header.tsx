"use client"
import React from 'react';
import header from "@/assets/about/about_header/imgi_21_pedro-vit-nxssxDuytMA-unsplash-scaled.jpg"
import Image from "next/image";


const AboutHeader = () => {
    return (
        <div className={"flex flex-col justify-center items-center gap-4 pt-18 px-2"}>
            <span>О нас</span>
            <h1 className={"text-3xl uppercase text-center"}>Диалог между прошлым и настоящим</h1>
            <Image src={header} alt={"asd"} className={"w-full md:h-[500px] md:object-cover object-contain"} />
        </div>
    );
};

export default AboutHeader;