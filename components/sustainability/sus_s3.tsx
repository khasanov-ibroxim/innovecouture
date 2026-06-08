"use client"
import React from 'react';
import Image from "next/image";


import fabricWhiteImg from "@/assets/sustainability/sus_s3/IMG_1298.jpg"
import color from "@/assets/sustainability/sus_s3/color.png"
import fabric from "@/assets/sustainability/sus_s3/fabric.png"
import tshirt from "@/assets/sustainability/sus_s3/tshirt.png"
import clothDetails from "@/assets/sustainability/sus_s3/clothDetails.png"
import durabilty from "@/assets/sustainability/sus_s3/durabilty.png"

const materials = [
    {
        name: "Form",
        description: ["Чистые силуэты, вдохновлённые архитектурной геометрией Хивы."],
        icon: (
          <Image src={tshirt} alt={'asd'} width={40}/>
        ),
    },
    {
        name: "Ткань",
        description: ["Ткани, выбранные за комфорт, качество и долговечность."],
        icon: (
           <Image src={fabric} alt={"sdasd"} width={40}/>
        ),
    },
    {
        name: "Цвет",
        description: ["Палитра, вдохновлённая песчаными стенами, керамикой и небом древнего города."],
        icon: (
            <Image src={color} alt={"asd"} width={40}/>
        ),
    },
    {
        name: "Детали",
        description: ["Минималистичные элементы, в которых каждая деталь имеет значение."],
        icon: (
         <Image src={clothDetails} alt={"sadsad"} width={40}/>
        ),
    },
    {
        name: "Долговечность",
        description: ["Вещи, созданные вне сезонных трендов и рассчитанные на долгий срок использования."],
        icon: (
            <Image src={durabilty} alt={"sadsad"} width={40}/>
        ),
    },
];

const SusS3 = () => {
    return (
        <section className="w-full flex flex-col lg:flex-row">

            {/* LEFT SIDE — two fabric images side by side */}
            <div className="flex flex-row lg:w-[55%] h-[280px] md:h-[360px] lg:h-auto lg:min-h-[520px]">

                <div className="relative w-full overflow-hidden bg-gray-100">
                     <Image src={fabricWhiteImg} alt="White fabric texture" fill className="object-cover" />
                    {/*<div className="w-full h-full bg-gray-200" />*/}
                </div>
            </div>

            {/* RIGHT SIDE — materials list on light gray bg */}
            <div className="lg:w-[45%] bg-[#f5f5f3] px-10 md:px-14 lg:px-16 py-14 md:py-16 flex flex-col justify-center">

                <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-10">
                     KHIVA CODE
                </h2>

                <div className="flex flex-col gap-8">
                    {materials.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            {/* Icon + name row */}
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <span className="text-sm font-medium tracking-widest text-gray-900 uppercase">
                                    {item.name}
                                </span>
                            </div>
                            {/* Description lines */}
                            <div className="pl-[52px] flex flex-col gap-0.5">
                                {item.description.map((line, j) => (
                                    <p key={j} className="text-sm text-gray-600 leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default SusS3;