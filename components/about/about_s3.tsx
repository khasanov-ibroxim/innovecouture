import React from "react";
import Image from "next/image";
import Link from "next/link";

import runwayMain from "@/assets/about/about_s3/runway_main.jpg";
import modelSmall from "@/assets/about/about_s3/model_small.jpg";
import storeRight from "@/assets/about/about_s3/store_right.jpg";

const AboutS3 = () => {
    return (
        <section className="w-full px-5  py-16 md:py-24 overflow-hidden">

            {/* ── MOBILE layout ── */}
            <div className="flex flex-col gap-8 lg:hidden">

                {/* Main runway image */}
                <div className="w-full aspect-[3/4] relative overflow-hidden bg-neutral-900">
                     <Image src={runwayMain} alt="Runway show" fill className="object-cover object-center" />
                    <div className="w-full h-full bg-neutral-800" />
                </div>

                {/* Small model image */}
                <div className="w-[55%] aspect-[3/4] relative overflow-hidden bg-neutral-200 self-end">
                     <Image src={modelSmall} alt="Model" fill className="object-cover object-top" />
                    <div className="w-full h-full bg-neutral-300" />
                </div>

                {/* Store image */}
                <div className="w-full aspect-[16/9] relative overflow-hidden bg-neutral-200">
                     <Image src={storeRight} alt="Store" fill className="object-cover" />
                    <div className="w-full h-full bg-neutral-200" />
                </div>

                {/* Text */}
                <div>
                    <h2 className="text-[32px] font-normal uppercase tracking-[0.02em] leading-tight mb-5">
                        Several Decades Late
                    </h2>
                    <p className="text-[13px] leading-[1.8] text-neutral-700 mb-6 max-w-[480px]">
                        Boasting a network of stores spanning North America and a robust global
                        eCommerce platform, Innove remains dedicated to bringing everyday luxury
                        to communities near and far.
                    </p>
                    <Link
                        href="#"
                        className="text-[11px] tracking-[0.18em] uppercase font-medium underline underline-offset-4 decoration-neutral-700 hover:opacity-50 transition-opacity"
                    >
                        See Our Stores
                    </Link>
                </div>
            </div>

            {/* ── DESKTOP layout ── */}
            <div className="hidden lg:flex justify-between items-start gap-0  mx-auto">

                {/* ── LEFT: Images column ── */}
                <div className="relative w-[50%] flex-shrink-0" style={{ minHeight: 620 }}>

                    {/* Main large runway image — left, full height */}
                    <div className="absolute left-0 top-0 w-[65%] h-full overflow-hidden bg-neutral-900">
                         <Image src={runwayMain} alt="Runway show" fill className="object-cover object-center" />
                        <div className="w-full h-full bg-neutral-800" />
                    </div>

                    {/* Small model image — overlapping, center-top */}
                    <div className="absolute left-[50%] top-[14%] w-[28%] aspect-[3/4] overflow-hidden bg-neutral-200 z-10">
                         <Image src={modelSmall} alt="Model" fill className="object-cover object-top" />
                        <div className="w-full h-full bg-neutral-300" />
                    </div>
                </div>

                {/* ── RIGHT: Store image + text ── */}
                <div className="flex-1 flex flex-col  pl-0 pt-0">

                    {/* Store image — top right */}
                    <div className="w-[100%] aspect-[20/9] flex justify-end items-start relative right-0 overflow-hidden  mb-14">
                         <Image src={storeRight} alt="Store"  className="object-cover w-[50%]" />
                    </div>

                    {/* Text block */}
                    <div className="pl-2">
                        <h2 className="text-[40px] xl:text-[40px] font-normal uppercase tracking-[0.02em] leading-tight mb-6">
                            Several Decades <br /> Late
                        </h2>
                        <p className="text-[14px] leading-[1.8] text-neutral-700 mb-8 max-w-[420px]">
                            Boasting a network of stores spanning North America and a robust global
                            eCommerce platform, Innove remains dedicated to bringing everyday luxury
                            to communities near and far.
                        </p>
                        <Link
                            href="#"
                            className="text-[11px] tracking-[0.18em] uppercase font-medium underline underline-offset-4 decoration-neutral-700 hover:opacity-50 transition-opacity"
                        >
                            See Our Stores
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutS3;