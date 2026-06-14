import React from 'react';
import SusHeader from "@/components/sustainability/sus_header";
import SusS1 from "@/components/sustainability/sus_s1";
import SusS2 from "@/components/sustainability/sus_s2";
import SusS3 from "@/components/sustainability/sus_s3";
import {Locale} from "@/i18n-config";
import {getSustainabilityDictionary} from "@/lib/dictionary";

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getSustainabilityDictionary(lang as Locale);
    return (
        <>
            <SusHeader dict={dict.header}/>
            <SusS1 dict={dict.s1}/>
            <SusS2 dict={dict.s2}/>
            <SusS3 dict={dict.s3}/>
        </>
    );
};

export default Page;