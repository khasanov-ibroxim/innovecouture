import React from 'react';
import left_img from "@/assets/home/home_s1/left.jpg"
import right_img from "@/assets/home/home_s1/IMG_9593.jpg"
import Image from "next/image";
import Link from "next/link";

const HomeS1 = () => {
    return (
        <section className="w-full flex flex-col md:flex-row py-16 px-2 md:px-5">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col w-full md:w-3/4  md:px-10  pb-14">

                {/* Small image — top left, fixed width */}
                <div className="w-[240px] md:w-[245px] mb-14 md:mb-20">
                    <Image
                        src={left_img}
                        alt="Story left"
                        className="w-full h-auto object-cover"
                        sizes="245px"
                    />
                </div>

                {/* Text block */}
                <div className="max-w-[560px]">
                    <h2 className="text-[40px] md:text-[52px] font-normal uppercase tracking-tight leading-none mb-8">
                        Khiva Code
                    </h2>
                    <p className="text-[14px] font-normal leading-[1.65] text-neutral-800 mb-2 max-w-[480px]">это
                        современная одежда, в основе которой лежит архитектура Хивы.
                        Её культура, геометрия и система пропорций формировались веками, создавая уникальный визуальный
                        и смысловой код.</p>
                    <Link
                        href="#"
                        className="relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em]"
                    >
                        Discover More
                    </Link>
                </div>
            </div>

            {/* ── RIGHT COLUMN — full-bleed image ── */}
            <div className="relative right-0 w-full md:w-[32%] min-h-[420px] md:min-h-0">
                <Image
                    src={right_img}
                    alt="Story right"
                    fill
                    className="object-contain "
                    sizes="(max-width: 768px) 100vw, 42vw"
                />
            </div>

        </section>
    );
};

export default HomeS1;