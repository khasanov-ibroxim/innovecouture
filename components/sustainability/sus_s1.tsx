"use client"
import React from 'react';
import Image from "next/image";

// Replace with your actual image imports:
import sketchImg from "@/assets/sustainability/sus_s1/sketch.jpg"
import cuttingImg from "@/assets/sustainability/sus_s1/cutting.jpg"
import sewingImg from "@/assets/sustainability/sus_s1/sewing.jpg"

const SusS1 = () => {
    return (
        <section className="w-full px-2 md:px-3 lg:px-5 py-16 md:py-20">
            {/*
              Desktop layout (2 columns):
              LEFT  column: [APPROACH title + text] then below [sketch + cutting images side by side]
              RIGHT column: big sewing image spanning full height
            */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-8 lg:gap-10 lg:w-[52%]">

                    {/* Title + Description */}
                    <div className="flex flex-col gap-5">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest leading-tight">
                            APPROACH
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
                            For over five decades, Innove Couture has epitomized enduring
                            craftsmanship, crafting products designed to withstand the test of
                            time. Embracing an unwavering commitment to uncompromising quality,
                            the brand ensures that each creation is a testament to longevity and
                            responsible manufacturing practices, paving the way for a more
                            sustainable and conscientious future.
                        </p>
                    </div>

                    {/* Two small images side by side */}
                    <div className="flex flex-row gap-3 md:gap-4">
                        {/* Sketch image */}
                        <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-gray-200">
                             <Image src={sketchImg} alt="Design sketching" fill className="object-cover" />

                        </div>

                        {/* Cutting image */}
                        <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-gray-200">
                             <Image src={cuttingImg} alt="Fabric cutting" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE — big sewing image, full height */}
                <div className="relative w-full lg:w-[48%] min-h-[350px] lg:min-h-0 overflow-hidden bg-gray-200">
                     <Image src={sewingImg} alt="Sewing machine" fill className="object-cover" />

                </div>

            </div>
        </section>
    );
};

export default SusS1;