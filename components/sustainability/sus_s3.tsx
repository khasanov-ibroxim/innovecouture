"use client"
import React from 'react';
import Image from "next/image";

// Replace with your actual image imports:
import fabricWhiteImg from "@/assets/sustainability/sus_s3/fabric_white.jpg"
import fabricBeigeImg from "@/assets/sustainability/sus_s3/fabric_beige.jpg"

const materials = [
    {
        name: "LEATHER",
        description: ["100% traceable leather", "90% of leather scraps are recycled"],
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9 text-gray-500">
                <path d="M20 6 C10 6 6 14 6 20 C6 28 12 34 20 34 C28 34 34 28 34 20 C34 12 30 6 20 6Z" />
                <path d="M14 14 C14 14 16 18 20 18 C24 18 26 14 26 14" />
                <path d="M20 18 L20 28" />
            </svg>
        ),
    },
    {
        name: "COTTON",
        description: ["82% organic cotton"],
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9 text-gray-500">
                <circle cx="20" cy="16" r="7" />
                <path d="M13 16 C8 12 8 6 13 8" />
                <path d="M27 16 C32 12 32 6 27 8" />
                <path d="M20 23 L20 34" />
                <path d="M16 28 L20 34 L24 28" />
            </svg>
        ),
    },
    {
        name: "PLASTIC",
        description: ["0% PVC", "17% bio-based or recycled plastic"],
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9 text-gray-500">
                <path d="M14 8 L26 8 L28 14 L12 14 Z" />
                <rect x="12" y="14" width="16" height="18" rx="1" />
                <path d="M17 21 C17 19 23 19 23 21 C23 23 17 23 17 25 C17 27 23 27 23 25" />
            </svg>
        ),
    },
    {
        name: "PAPER",
        description: ["100% certified or recycled"],
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9 text-gray-500">
                <rect x="8" y="6" width="24" height="28" rx="1" />
                <line x1="13" y1="13" x2="27" y2="13" />
                <line x1="13" y1="18" x2="27" y2="18" />
                <line x1="13" y1="23" x2="21" y2="23" />
            </svg>
        ),
    },
    {
        name: "PACKAGING",
        description: [
            "100% Forest Stewardship Council certified paper",
            "100% Global Organic Textile Standard certified flannel",
        ],
        icon: (
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9 text-gray-500">
                <path d="M20 6 L34 13 L34 27 L20 34 L6 27 L6 13 Z" />
                <path d="M6 13 L20 20 L34 13" />
                <line x1="20" y1="20" x2="20" y2="34" />
                <circle cx="20" cy="20" r="3" />
            </svg>
        ),
    },
];

const SusS3 = () => {
    return (
        <section className="w-full flex flex-col lg:flex-row">

            {/* LEFT SIDE — two fabric images side by side */}
            <div className="flex flex-row lg:w-[55%] h-[280px] md:h-[360px] lg:h-auto lg:min-h-[520px]">
                {/* Narrow white fabric */}
                <div className="relative w-[38%] overflow-hidden bg-gray-100">
                     <Image src={fabricWhiteImg} alt="White fabric texture" fill className="object-cover" />
                    {/*<div className="w-full h-full bg-gray-200" />*/}
                </div>

                {/* Wide beige fabric */}
                <div className="relative flex-1 overflow-hidden bg-gray-300">
                     <Image src={fabricBeigeImg} alt="Beige linen texture" fill className="object-cover" />
                    {/*<div className="w-full h-full bg-gray-300" />*/}
                </div>
            </div>

            {/* RIGHT SIDE — materials list on light gray bg */}
            <div className="lg:w-[45%] bg-[#f5f5f3] px-10 md:px-14 lg:px-16 py-14 md:py-16 flex flex-col justify-center">

                <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-10">
                    MATERIALS
                </h2>

                <div className="flex flex-col gap-8">
                    {materials.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            {/* Icon + name row */}
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <span className="text-sm font-medium tracking-widest text-gray-900 uppercase">
                                    {item.name}
                                </span>
                            </div>
                            {/* Description lines */}
                            <div className="pl-[52px] flex flex-col gap-0.5">
                                {item.description.map((line, j) => (
                                    <p key={j} className="text-sm text-gray-600 leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default SusS3;