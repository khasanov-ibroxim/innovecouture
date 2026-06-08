"use client"
import React from 'react';
import Image from "next/image";

import sketchImg from "@/assets/sustainability/sus_s1/abuphotographer-80.jpg"
import cuttingImg from "@/assets/sustainability/sus_s1/abuphotographer-82.jpg"
import sewingImg from "@/assets/sustainability/sus_s1/DEW06167.jpg"

interface SusS1Props {
    dict: {
        title: string;
        description: string;
    };
}

const SusS1 = ({ dict }: SusS1Props) => {
    return (
        <section className="w-full px-2 md:px-3 lg:px-5 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-8 lg:gap-10 lg:w-[52%]">

                    {/* Title + Description */}
                    <div className="flex flex-col gap-5">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest leading-tight">
                            {dict.title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed ">
                            {dict.description}
                        </p>
                    </div>

                    {/* Two small images side by side */}
                    <div className="flex flex-row gap-3 md:gap-4">
                        {/* Sketch image */}
                        <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-gray-200">
                            <Image src={sketchImg} alt="Design sketching" fill className="object-cover"/>

                        </div>

                        {/* Cutting image */}
                        <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-gray-200">
                            <Image src={cuttingImg} alt="Fabric cutting" fill className="object-cover"/>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE — big sewing image, full height */}
                <div className="relative w-full lg:w-[48%] min-h-[350px] lg:min-h-0 overflow-hidden bg-gray-200">
                    <Image src={sewingImg} alt="Sewing machine" fill className="object-cover"/>

                </div>

            </div>
        </section>
    );
};

export default SusS1;