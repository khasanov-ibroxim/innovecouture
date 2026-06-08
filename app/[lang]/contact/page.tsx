import React from 'react';
import ContactS1 from "@/components/contact/contact_s1";
import ContactS2 from "@/components/contact/contact_s2";
import {Locale} from "@/i18n-config";
import {getContactDictionary} from "@/lib/dictionary";

const ContactPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getContactDictionary(lang as Locale);
    return (
        <div>
            <ContactS1 dict={dict.s1}/>
            <ContactS2 dict={dict.s2}/>
        </div>
    );
};

export default ContactPage;