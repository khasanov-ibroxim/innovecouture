import React from 'react';
import AboutHeader from "@/components/about/about_header";
import AboutS1 from "@/components/about/about_s1";
import AboutS2 from "@/components/about/about_s2";
import AboutS3 from "@/components/about/about_s3";

const Page = () => {
    return (
        <div className={"flex flex-col gap-14"}>
            <AboutHeader/>
            <AboutS1/>
            <AboutS2/>
            <AboutS3/>
        </div>
    );
};

export default Page;