"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import img1 from "@/assets/home/home_s6/1.jpg"
import img2 from "@/assets/home/home_s6/2.jpg"
import Link from "next/link";

interface HomeS6Props {
    dict: {
        storeName: string;
        address: string;
        hours: string;
        direction: string;
    };
}

const HomeS6 = ({ dict }: HomeS6Props) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} className="w-full bg-white overflow-hidden py-16 px-2 md:px-10">
            <div className="container">
                <div className="flex flex-col md:flex-row items-stretch w-full">

                    {/* LEFT — matn, keng bo'sh joy bilan */}
                    <div className="flex flex-col justify-end w-full md:w-[48%] py-14 md:py-20 pr-0 md:pr-16 flex-shrink-0">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="title_font text-[32px] sm:text-[38px] md:text-[44px] font-light uppercase leading-[1.1] tracking-tight text-[#1a1a1a] mb-8 md:mb-10"
                        >
                            Innove Couture New York

                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex flex-col gap-0.5 mb-8 md:mb-10"
                        >
                            <p className="other_font text-[14px] text-black/65 leading-[1.7]">
                                217 Tueri Junction, New York, NY 10002

                            </p>
                            <p className="other_font text-[14px] text-black/65 leading-[1.7]">
                                10:00 am – 7:00 pm Daily
                            </p>
                        </motion.div>

                        <Link
                            href="#"
                            className="relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em] max-w-[200px] text-center"
                        >
                            Explore collection
                        </Link>
                    </div>

                    {/* RIGHT — ikki rasm, balandliklari har xil */}
                    <div className="relative w-full md:w-[50%] flex justify-end items-end h-[300px] sm:h-[380px] md:h-auto md:min-h-[400px]">

                        {/* Rasm 1 — chapda, pastdan ko'tariladi (yuqori qismi kesiladi) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative w-[55%] h-[75%] md:h-[78%] self-end flex-shrink-0 overflow-hidden"
                        >
                            <Image
                                src={img1}
                                alt="Store interior 1"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 55vw, 28vw"
                            />
                        </motion.div>

                        {/* Rasm 2 — o'ngda, to'liq balandlik */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative flex-1 h-full overflow-hidden"
                        >
                            <Image
                                src={img2}
                                alt="Store interior 2"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 45vw, 24vw"
                            />
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeS6;