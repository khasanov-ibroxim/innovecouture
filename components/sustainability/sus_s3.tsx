"use client"
import React from 'react';
import Image from "next/image";


import fabricWhiteImg from "@/assets/sustainability/sus_s3/IMG_1298.jpg"
import color from "@/assets/sustainability/sus_s3/color.png"
import fabric from "@/assets/sustainability/sus_s3/fabric.png"
import tshirt from "@/assets/sustainability/sus_s3/tshirt.png"
import clothDetails from "@/assets/sustainability/sus_s3/clothDetails.png"
import durabilty from "@/assets/sustainability/sus_s3/durabilty.png"

const icons = [tshirt, fabric, color, clothDetails, durabilty];

interface SusS3Props {
    dict: {
        title: string;
        materials: Array<{
            name: string;
            description: string;
        }>;
    };
}

const SusS3 = ({ dict }: SusS3Props) => {
    return (
        <section className="w-full flex flex-col lg:flex-row">

            {/* LEFT SIDE — two fabric images side by side */}
            <div className="flex flex-row lg:w-[55%] h-[280px] md:h-[360px] lg:h-auto lg:min-h-[520px]">

                <div className="relative w-full overflow-hidden bg-gray-100">
                     <Image src={fabricWhiteImg} alt="White fabric texture" fill className="object-cover" />
                    {/*<div className="w-full h-full bg-gray-200" />*/}
                </div>
            </div>

            {/* RIGHT SIDE — materials list on light gray bg */}
            <div className="lg:w-[45%] bg-[#f5f5f3] px-10 md:px-14 lg:px-16 py-14 md:py-16 flex flex-col justify-center">

                <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-10">
                     {dict.title}
                </h2>

                <div className="flex flex-col gap-8">
                    {dict.materials.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            {/* Icon + name row */}
                            <div className="flex items-center gap-4">
                                <Image src={icons[i]} alt={item.name} width={40}/>
                                <span className="text-sm font-medium tracking-widest text-gray-900 uppercase">
                                    {item.name}
                                </span>
                            </div>
                            {/* Description lines */}
                            <div className="pl-[52px] flex flex-col gap-0.5">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default SusS3;