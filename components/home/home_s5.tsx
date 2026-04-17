"use client"
import React, {useRef} from 'react';
import {motion, useInView} from 'framer-motion';
import Image, {StaticImageData} from 'next/image';

import left_img from "@/assets/home/home_s5/imgi_121_GettyImages-1758107153.jpg"
import right_img from "@/assets/home/home_s5/imgi_26_GettyImages-1068216038.jpg"
import Link from "next/link";


interface HomeS5Props {
    dict: {
        tag: string;           // "Sustainability"
        title: string;         // "EVERY DETAIL MATTER"
        description: string;   // "Since 2012, Innove Couture products..."
        learnMore: string;     // "LEARN MORE"
    };
}

const HomeS5 = ({dict}: HomeS5Props) => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-60px'});

    return (
        <section ref={ref} className="w-full bg-white overflow-hidden py-16">
            <div className="flex flex-col justify-between  md:flex-row w-full min-h-[600px]">

                {/* LEFT — Full-height model photo */}
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    animate={inView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]}}
                    className=" w-full md:w-[35%] h-[500px] md:min-h-[650px]"
                >
                    <Image
                        src={left_img}
                        alt="Model"
                        className="object-cover object-top"
                    />
                </motion.div>

                {/* RIGHT — Content + craftsman photo */}
                <div
                    className="flex flex-col bg-white md:bg-none justify-between h-full md:min-h-screen w-full md:w-[50%] px-2 md:px-14 py-10 md:py-0 gap-6">

                    {/* Text block */}
                    <div className="flex flex-col gap-3 ">

                        {/* Tag */}
                        <motion.span
                            initial={{opacity: 0, y: 10}}
                            animate={inView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94]}}
                            className="other_font text-[14px] text-black tracking-wide"
                        >
                            Sustainability

                        </motion.span>

                        {/* Title */}
                        <motion.h2
                            initial={{opacity: 0, y: 16}}
                            animate={inView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94]}}
                            className="title_font text-[26px] md:text-[44px] font-medium uppercase leading-[1.08] tracking-[5] text-[#1a1a1a]"
                        >
                            Каждая модель

                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{opacity: 0, y: 12}}
                            animate={inView ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.55, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94]}}
                            className="other_font text-[16px] leading-[1.65] text-black/65 max-w-[380px]"
                        >
                            — часть единого языка, в котором форма, пропорции и структура работают как целостный код. От
                            выбора ткани до последней строчки, от силуэта до тактильного и визуального опыта упаковки —
                            всё выстроено как продолжение одной идеи.
                        </motion.p>

                        {/* Learn More link */}
                        <Link
                            href="#"
                            className="relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em] max-w-[200px] text-center"
                        >
                            Explore collection
                        </Link>
                    </div>

                    {/* Craftsman image */}
                    <motion.div
                        initial={{opacity: 0, y: 24}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94]}}
                        className="relative w-full h-[320px] md:h-[380px] p-5 rounded-sm overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={right_img}
                            alt="Craftsman at work"

                            className="object-cover object-center rounded-xl"

                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HomeS5;