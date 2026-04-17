import React from "react";
import Image from "next/image";

import modelLeft from "@/assets/about/about_s1/model_left.jpg";
import sketchRight from "@/assets/about/about_s1/sketch_right.jpg";
import bgImage from "@/assets/about/about_s1/imgi_21_malicki-m-beser-PKMvkg7vnUo-unsplash-scaled.jpg"

const AboutS1 = () => {
    return (
        <section className="w-full px-5 py-16">

            {/* ── MOBILE layout ── */}
            <div className="flex flex-col gap-8 lg:hidden">

                {/* Title */}
                <h2 className="text-[32px] font-normal uppercase tracking-[0.04em] leading-none">
                    ИСТОРИЯ (HISTORY)
                </h2>

                {/* Left image */}
                <div className="w-[160px] aspect-[3/4] relative overflow-hidden">
                    <Image src={modelLeft} alt="Simone Myson" fill className="object-cover object-top"/>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-5">
                    <p className="text-[13px] leading-[1.8] text-neutral-700">
                        От архитектуры к одежде
                        Проект Khiva Code начался не с одежды — его истоки лежат в наблюдении. Внимание было обращено к
                        архитектуре Хивы, города, где каждая линия, форма и пропорция подчинены внутренней логике,
                        наполнены смыслом и выверенной структурой.
                    </p>
                    <p className="text-[13px] leading-[1.8] text-neutral-700">
                        Архитектура Хивы — это не просто визуальная эстетика, а целостная система, основанная на
                        геометрии, ритме, повторяемости и балансе. Этот своеобразный код формировался на протяжении
                        веков, проходя через время без утраты своей сути, и сохранился до наших дней как выражение
                        культурной точности и гармонии.
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
                        ИСТОРИЯ (HISTORY)
                    </h2>
                    <div className="flex flex-col gap-5">
                        <p className="text-[15px] leading-[1.8] text-neutral-700">
                            От архитектуры к одежде
                            Проект Khiva Code начался не с одежды — его истоки лежат в наблюдении. Внимание было
                            обращено к архитектуре Хивы, города, где каждая линия, форма и пропорция подчинены
                            внутренней логике, наполнены смыслом и выверенной структурой.
                        </p>
                        <p className="text-[15px] leading-[1.8] text-neutral-700">
                            Архитектура Хивы — это не просто визуальная эстетика, а целостная система, основанная на
                            геометрии, ритме, повторяемости и балансе. Этот своеобразный код формировался на протяжении
                            веков, проходя через время без утраты своей сути, и сохранился до наших дней как выражение
                            культурной точности и гармонии.
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
            <div className="w-full mt-15 overflow-hidden">
                <Image src={bgImage} alt={"sda"} className={"w-full h-full object-cover object-top"}/>
            </div>

        </section>
    );
};

export default AboutS1;