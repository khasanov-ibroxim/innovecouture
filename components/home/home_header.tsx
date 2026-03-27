"use client"
import React from 'react';
import bg from "@/assets/home/home_header/home_header.jpg"
import Image from "next/image";
import Link from "next/link";

const HomeHeader = () => {
    return (
        <div className={"w-full h-screen overflow-hidden relative"}>
            <Image src={bg} alt={"home header"} className={"w-full h-full object-cover absolute z-0"} />

            <div className="z-10 absolute flex flex-col text-center top-[20%] left-0 md:left-6 items-center w-full">
                <h3 className={"text-2xl md:text-[37px]  leading-[49px] tracking-[0.12em]  uppercase "} >Minimalism and <br/> fantasy</h3>
                <Link href="#">Explore collection</Link>
            </div>
        </div>
    );
};

export default HomeHeader;