import React from 'react';
import HomeHeader from "@/components/home/home_header";
import HomeS1 from "@/components/home/home_s1";
import {HomeS2} from "@/components/home/home_s2";
import {Locale} from "@/i18n-config";
import {getCommonDictionary, getHomeDictionary} from "@/lib/dictionary";
import HomeS3 from "@/components/home/home_s3";
import HomeS4 from "@/components/home/home_s4";
import HomeS5 from "@/components/home/home_s5";
import HomeS6 from "@/components/home/home_s6";

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict   = await getHomeDictionary(lang as Locale);
    const common = await getCommonDictionary(lang as Locale);
    return (
        <>
            <HomeHeader/>
            <HomeS1/>
            <HomeS2 lang={lang as Locale} dict={dict}/>
            <HomeS3/>
            <HomeS4/>
            <HomeS5 dict={dict} />
            <HomeS6 dict={dict} />
        </>
    );
};

export default Home;