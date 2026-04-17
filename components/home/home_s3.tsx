"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import modelMain from "@/assets/home/home_s3/model_main.jpg";
import modelSecond from "@/assets/home/home_s3/model_second.jpg";
import fabricTexture from "@/assets/home/home_s3/fabric_texture.jpg";

const HomeS3 = () => {
    return (
        <section className="w-full overflow-hidden py-10 lg:py-20 px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row items-start lg:gap-0 max-w-[1400px] mx-auto">

                {/* ── LEFT: Images ── */}
                <div className="w-full md:w-[52%] flex-shrink-0">

                    {/* MOBILE: stacked vertically */}
                    <div className="flex flex-row gap-3 lg:hidden">
                        <div className="w-full aspect-[3/4] relative">
                            <Image
                                src={modelMain}
                                alt="Fall Collection main"
                                fill
                                className="object-cover object-top"
                                sizes="100vw"
                            />
                        </div>
                        <div className="w-full aspect-[3/4] relative">
                            <Image
                                src={modelSecond}
                                alt="Fall Collection secondary"
                                fill
                                className="object-cover object-top"
                                sizes="100vw"
                            />
                        </div>
                        {/* Mobile: fabric texture full width */}
                        <div className="w-full aspect-[16/9] relative mt-1">
                            <Image
                                src={fabricTexture}
                                alt="Cashmere wool yarns texture"
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                        <p className=" hidden lg:block text-[10px] tracking-[0.22em] uppercase text-neutral-400 text-right">
                            Cashmere — Wool Yarns
                        </p>
                    </div>

                    {/* DESKTOP: overlapping */}
                    <div
                        className="hidden lg:block relative select-none"
                        style={{height: "100vh", maxHeight: 800}}
                    >
                        {/* Front — main model, left, z on top */}
                        <div
                            className="absolute z-10"
                            style={{top: 0, left: 0, width: "60%", height: "100%"}}
                        >
                            <Image
                                src={modelMain}
                                alt="Fall Collection main"
                                fill
                                className="object-cover object-top"
                                sizes="32vw"
                            />
                        </div>

                        {/* Back — second model, right, behind main */}
                        <div
                            className="absolute z-20"
                            style={{
                                top: "10%",
                                left: "calc(30% + 120px)",
                                width: "36%",
                                height: "50%",
                            }}
                        >
                            <Image
                                src={modelSecond}
                                alt="Fall Collection secondary"
                                fill
                                className="object-cover "

                            />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Content ── */}
                <div className="w-full lg:w-[48%] flex flex-col mt-8 lg:mt-0 lg:pt-4">

                    {/* Fabric texture — desktop only (top right) */}
                    <div className="hidden lg:flex justify-end mb-4">
                        <div
                            className="relative overflow-hidden"
                            style={{width: "55%", aspectRatio: "16/9"}}
                        >
                            <Image
                                src={fabricTexture}
                                alt="Cashmere wool yarns texture"
                                fill
                                className="object-cover"
                                sizes="25vw"
                            />
                        </div>
                    </div>

                    {/* Label — desktop only */}
                    <p className="hidden lg:block text-[10px] tracking-[0.22em] uppercase text-neutral-400 text-right mb-12 lg:mb-16">
                        Cashmere — Wool Yarns
                    </p>

                    {/* Text block */}
                    <div className="md:pl-8 lg:pl-14">
                        <p className="text-[11px] tracking-[0.14em] text-neutral-500 mb-3 uppercase">
                            Fall/Winter 23
                        </p>
                        <h2 className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[50px] font-normal uppercase tracking-tight leading-none mb-5">
                            Мы не создаём вещи ради трендов
                        </h2>
                        <p className="text-[13px] leading-[1.8] text-neutral-600 max-w-[440px] mb-8">
                            мы выстраиваем систему, основанную на принципах формы, точности и времени. В основе Khiva
                            Code лежит архитектурное мышление, унаследованное от Хива, где каждая линия подчинена
                            логике, а каждая деталь имеет значение.
                        </p>
                        <Link
                            href="#"
                            className="relative inline-block text-[11px] tracking-[0.2em] uppercase font-medium
                                       after:content-[''] after:absolute after:left-0 after:bottom-0
                                       after:h-[0.5px] after:w-full after:bg-black
                                       after:transition-all after:duration-300
                                       hover:after:w-[55%]"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeS3;