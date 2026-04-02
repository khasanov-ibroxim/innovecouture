"use client"
import React from 'react';
import Image from "next/image";

// Replace with your actual image imports:
import mannequinImg from "@/assets/sustainability/sus_s2/mannequin.jpg"
import weavingImg from "@/assets/sustainability/sus_s2/weaving.jpg"

const SusS2 = () => {
    return (
        <section className="w-full flex flex-col lg:flex-row py-16">

            {/* LEFT SIDE — ~60% width */}
            <div className="flex flex-col lg:w-[58%] px-6 md:px-12 lg:px-16 py-12 md:py-16">

                {/* Small mannequin image — top left */}
                <div className="relative w-[180px] md:w-[210px] aspect-[4/5] overflow-hidden bg-gray-200 mb-16 md:mb-20">
                     <Image src={mannequinImg} alt="Mannequin in studio" fill className="object-cover" />
                </div>

                {/* COMMITMENTS title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest leading-tight mb-6">
                    COMMITMENTS
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-lg mb-8">
                    From suppliers and manufacturers to products, warehouses, stores, and offices, our
                    collective goal is to collaborate and exceed sustainability targets.
                </p>

                {/* Divider */}
                <hr className="border-gray-300 max-w-lg mb-8" />

                {/* List items with dash */}
                <ul className="flex flex-col gap-4 mb-10">
                    {[
                        "Minimize carbon emissions",
                        "Cultivate a culture of sustainability",
                        "Safeguard our rich heritage of innovation and craftsmanship",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm md:text-base text-gray-800">
                            <span className="mt-[0.4em] w-6 border-t border-gray-800 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Bottom paragraph */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
                    By working together across all facets of our operations, we aspire to contribute
                    meaningfully to a more sustainable and responsible future
                </p>
            </div>

            {/* RIGHT SIDE — ~40% width, full height image */}
            <div className="relative w-full lg:w-[42%] min-h-[400px] lg:min-h-0 overflow-hidden bg-gray-200">
                 <Image src={weavingImg} alt="Weaving textile" fill className="object-cover" />
            </div>

        </section>
    );
};

export default SusS2;