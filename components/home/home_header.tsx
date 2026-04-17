"use client"
import React from 'react';
import bg from "@/assets/home/home_header/IMG_0539.jpg"
import Image from "next/image";
import Link from "next/link";

const HomeHeader = () => {
    return (
        <div className={"w-full h-screen overflow-hidden relative"}>
            <Image src={bg} alt={"home header"} className={"w-full h-full object-cover object-top absolute z-[-10]"} />

            <div className="z-10 absolute flex flex-col text-center top-[20%] left-0 md:left-6 items-center w-full">
                <h3 className={"text-2xl md:text-[37px] font-normal  leading-[49px]   uppercase "} >Minimalism and <br/> fantasy</h3>
                <Link
                    href="#"
                    className="relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em]"
                >
                    Explore collection
                </Link>            </div>
        </div>
    );
};

export default HomeHeader;