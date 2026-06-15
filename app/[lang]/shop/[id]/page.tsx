import { i18n } from "@/i18n-config";
import { Locale } from "@/i18n-config";
import { getShopDictionary } from "@/lib/dictionary";
import ProductClient from "./ProductClient";

// Static export uchun barcha lang kombinatsiyalarini generatsiya qilamiz.
// id "placeholder" — real id runtime'da URL'dan olinadi (client side).
export async function generateStaticParams() {
    return i18n.locales.map((lang) => ({
        lang,
        id: "placeholder",
    }));
}

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ lang: string; id: string }>;
}) {
    const { lang } = await params;
    const dict = await getShopDictionary(lang as Locale);

    return <ProductClient lang={lang} dict={dict} />;
}