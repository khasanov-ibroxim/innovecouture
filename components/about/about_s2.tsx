import React from "react";

const timelineItems = [
    {
        year: "Современный контекст",
        text: "Мы создаём одежду для сегодняшнего дня — для города, движения и реальной жизни, где Khiva Code становится диалогом между прошлым и настоящим.",
    },
    {
        year: "Формирование бренда",
        text: "С самого начала мы выстраиваем не просто коллекции, а целостную систему, в которой трикотаж служит основой, аксессуары продолжают идею, а обувь задаёт движение.",
    },
    {
        year: "Больше, чем одежда",
        text: "Khiva Code — это не про внешний вид, а про внутреннее ощущение уверенности, спокойствия и структуры — одежду, которая не стремится привлечь внимание, но остаётся надолго.",
    },
];

const AboutS2 = () => {
    return (
        <section className="w-full px-5 md:px-10 lg:px-16 py-16 md:py-24">

            {/* ── Header ── */}
            <div className="max-w-[600px] mb-16 md:mb-20">
                <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-normal uppercase tracking-[0.02em] leading-none mb-6">
                    Перевод в современность
                </h2>
                <p className="text-[14px] md:text-[15px] leading-[1.75] text-neutral-700">
                    Идея Khiva Code — переосмыслить архитектурный язык Хивы и перевести его в одежду. Это не копирование
                    орнаментов и не этнический стиль, а адаптация ключевых принципов: чистых линий, продуманной формы и
                    структурного минимализма. Такой подход сохраняет глубину и логику традиции, раскрывая её в
                    современном контексте через сдержанный, выверенный и интеллектуальный дизайн.
                </p>
            </div>

            {/* ── Timeline ── */}
            {/* Desktop: 3 columns */}
            <div className="hidden md:grid grid-cols-3">
                {timelineItems.map((item, i) => (
                    <div key={i} className="flex flex-col pr-10">
                        {/* Vertical tick line */}
                        <div className="w-px h-16 bg-neutral-300 mb-6"/>

                        {/* Year */}
                        <p className="text-[13px] font-semibold tracking-[0.06em] text-neutral-900 mb-3">
                            {item.year}
                        </p>

                        {/* Description */}
                        <p className="text-[13px] md:text-[14px] leading-[1.75] text-neutral-600">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="flex flex-col md:hidden gap-0">
                {timelineItems.map((item, i) => (
                    <div key={i} className="flex gap-5">
                        {/* Left: vertical line + dot */}
                        <div className="flex flex-col items-center">
                            <div className="w-px flex-1 bg-neutral-300"/>
                            {i < timelineItems.length - 1 && (
                                <div className="w-px flex-1 bg-neutral-300"/>
                            )}
                        </div>

                        {/* Content */}
                        <div className="pb-10">
                            <div className="w-px h-8 bg-neutral-300 mb-4"/>
                            <p className="text-[13px] font-semibold tracking-[0.06em] text-neutral-900 mb-2">
                                {item.year}
                            </p>
                            <p className="text-[13px] leading-[1.75] text-neutral-600">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default AboutS2;