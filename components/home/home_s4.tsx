"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import readyToWear from "@/assets/home/home_s4/ready_to_wear.jpg";
import accessories from "@/assets/home/home_s4/accessories.jpg";
import onSale from "@/assets/home/home_s4/on_sale.jpg";

const categories = [
    {
        img: readyToWear,
        alt: "Ready to Wear",
        label: "Ready to Wear",
        href: "#",
        tall: false,
    },
    {
        img: accessories,
        alt: "Accessories",
        label: "Accessories",
        href: "#",
        tall: false,
    },
    {
        img: onSale,
        alt: "On Sale Now",
        label: "On Sale Now",
        href: "#",
        tall: true,
    },
];

const HomeS4 = () => {
    return (
        <section className="w-full px-5 md:px-10 py-10 md:py-16 relative">

            {/* Quote text — top left */}
            <p className=" absolute top-[10%] font-normal text-[16px] ml-0 md:ml-10 uppercase   leading-[1.9] ">
                Минимализм, выстроенный по законам города
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 items-end">
                {categories.map((cat) => (
                    <Link
                        key={cat.label}
                        href={cat.href}
                        className="group flex flex-col"
                    >
                        {/* Image */}
                        <div
                            className={`relative w-full overflow-hidden ${
                                cat.tall
                                    ? "aspect-[3/4] sm:aspect-auto sm:h-[520px] md:h-[600px] lg:h-[600px]"
                                    : "aspect-[3/4] sm:aspect-auto sm:h-[380px] md:h-[440px] lg:h-[490px]"
                            }`}
                        >
                            <Image
                                src={cat.img}
                                alt={cat.alt}
                                fill
                                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                                sizes="(max-width: 640px) 100vw, 33vw"
                            />
                        </div>

                        {/* Label */}
                        <p className="mt-3 text-[11px] tracking-[0.16em] uppercase font-normal text-neutral-900 underline underline-offset-4 decoration-neutral-500">
                            {cat.label}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HomeS4;
