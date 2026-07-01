"use client"
import React, { useState, useEffect } from 'react';
import bg1 from "@/assets/home/home_header/DGH_7582.jpg"
import bg2 from "@/assets/home/home_header/DGH_7706_1.jpg"
import Image from "next/image";
import Link from "next/link";

interface HomeHeaderProps {
    lang?: string;
    dict: {
        title: string;
        shopLink: string;
    };
}

const HomeHeader = ({ lang = 'ru', dict }: HomeHeaderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [bg1, bg2];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"w-full h-[320px] lg:h-[120vh] overflow-hidden relative"}>
            {images.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    alt={`home header ${index + 1}`}
                    className={`w-full h-full  object-cover object-top absolute z-[-10] transition-opacity duration-1000 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}

            <div className="z-10 absolute flex flex-col text-center top-[30%] left-0 md:left-6 items-center w-full">
                <h3 className={"text-2xl md:text-[37px] font-normal  leading-[49px]   uppercase "} dangerouslySetInnerHTML={{ __html: dict.title.replace(/\n/g, '<br/>') }}></h3>
                <Link
                    href={`/${lang}/shop`}
                    className="relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em]"
                >
                    {dict.shopLink}
                </Link>            </div>
        </div>
    );
};

export default HomeHeader;