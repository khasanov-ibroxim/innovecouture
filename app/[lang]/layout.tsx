import { i18n, Locale } from "@/i18n-config";
import { getCommonDictionary } from "@/lib/dictionary";
import { notFound } from "next/navigation";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params;

    if (!i18n.locales.includes(lang as Locale)) {
        notFound();
    }

    const dict = await getCommonDictionary(lang as Locale);

    return (
        <>
           <Navbar/>
            {children}
            <Footer />
        </>
    );
}