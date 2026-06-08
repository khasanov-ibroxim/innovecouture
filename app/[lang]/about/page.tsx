import React from 'react';
import AboutHeader from "@/components/about/about_header";
import AboutS1 from "@/components/about/about_s1";
import AboutS2 from "@/components/about/about_s2";
import AboutS3 from "@/components/about/about_s3";
import {Locale} from "@/i18n-config";
import {getAboutDictionary} from "@/lib/dictionary";

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getAboutDictionary(lang as Locale);
    return (
        <div className={"flex flex-col gap-14"}>
            <AboutHeader dict={dict.header}/>
            <AboutS1 dict={dict.s1}/>
            <AboutS2 dict={dict.s2}/>
            <AboutS3 lang={lang} dict={dict.s3}/>
        </div>
    );
};

export default Page;