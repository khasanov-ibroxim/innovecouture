import React from "react";
import Image from "next/image";

import modelLeft from "@/assets/about/about_s1/left.jpg";
import sketchRight from "@/assets/about/about_s1/right.jpg";
import bgImage from "@/assets/about/about_s1/DGH_8578.jpg"

interface AboutS1Props {
    dict: {
        title: string;
        paragraph1: string;
        paragraph2: string;
    };
}

const AboutS1 = ({ dict }: AboutS1Props) => {
    return (
        <section className="w-full px-5 py-16">

            {/* ── MOBILE layout ── */}
            <div className="flex flex-col gap-8 lg:hidden">

                {/* Title */}
                <h2 className="text-[32px] font-normal uppercase tracking-[0.04em] leading-none">
                    {dict.title}
                </h2>

                {/* Left image */}
                <div className="w-[160px] aspect-[3/4] relative overflow-hidden">
                    <Image src={modelLeft} alt="Simone Myson" fill className="object-cover object-top"/>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-5">
                    <p className="text-[13px] leading-[1.8] text-neutral-700">
                        {dict.paragraph1}
                    </p>
                    <p className="text-[13px] leading-[1.8] text-neutral-700">
                        {dict.paragraph2}
                    </p>
                </div>

                {/* Right image — aligned to right */}
                <div className="w-[160px] aspect-[3/4] relative overflow-hidden self-end">
                    <Image src={sketchRight} alt="Fashion sketches" fill className="object-cover"/>
                </div>
            </div>

            {/* ── DESKTOP layout ── */}
            <div className="hidden lg:block max-w-[1300px] mx-auto relative">

                {/* Left image */}
                <div className="absolute left-0 top-0 w-[200px] z-10">
                    <div className="aspect-[3/4] relative overflow-hidden">
                        <Image src={modelLeft} alt="Simone Myson" fill className="object-cover object-top"/>
                    </div>
                </div>

                {/* Main content */}
                <div className="pl-[240px] pr-[240px]">
                    <h2 className="text-[48px] font-normal uppercase tracking-[0.04em] leading-none mb-10">
                        {dict.title}
                    </h2>
                    <div className="flex flex-col gap-5">
                        <p className="text-[15px] leading-[1.8] text-neutral-700">
                            {dict.paragraph1}
                        </p>
                        <p className="text-[15px] leading-[1.8] text-neutral-700">
                            {dict.paragraph2}
                        </p>
                    </div>
                </div>

                {/* Right image */}
                <div className="absolute right-0 bottom-0 w-[200px] z-10">
                    <div className="aspect-[3/4] relative overflow-hidden">
                        <Image src={sketchRight} alt="Fashion sketches" fill className="object-cover"/>
                    </div>
                </div>

            </div>
            <div className="w-full max-h-screen mt-15 overflow-hidden">
                <Image src={bgImage} alt={"sda"} className={"w-full h-full object-cover object-top"}/>
            </div>

        </section>
    );
};

export default AboutS1;