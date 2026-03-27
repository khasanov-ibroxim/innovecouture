import React from 'react';
import left_img from "@/assets/home/home_s1/left.jpg"
import right_img from "@/assets/home/home_s1/right.jpg"
import Image from "next/image";
import Link from "next/link";


const HomeS1 = () => {
    return (
        <div className="w-full flex justify-between items-start py-16 px-5  overflow-hidden">
            <div className="w-1/2 h-full flex flex-col justify-between">
                <Image src={left_img} alt={"dsad"} width={300} height={200}/>
                <div className="mt-10">
                    <h2 className={"text-3xl md:text-5xl font-normal  leading-[49px]   uppercase "}>the story</h2>
                    <p>One Vintage is a distinctive luxury brand founded by Simone Myson in 2010. This avant-garde label
                        ingeniously revitalizes antique textiles and relics, seamlessly weaving them into contemporary
                        and modern masterpieces.</p>
                    <Link href={"#"} className={"relative inline-block text-[13px] font-normal after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:transition-all after:duration-300 hover:after:w-[60%] uppercase mt-2 tracking-[0.12em]"}>Discover more</Link>
                </div>
            </div>
            <div className="w-1/2 h-full">
                <Image src={right_img} alt={"as"} className={"w-full object-cover "} height={400}/>
            </div>
        </div>
    );
};

export default HomeS1;