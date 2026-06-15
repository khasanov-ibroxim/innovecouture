import { Locale } from "@/i18n-config";
import { getShopDictionary } from "@/lib/dictionary";
import { getProducts } from "@/lib/products";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
    try {
        const products = await getProducts();
        const langs: Locale[] = ['ru', 'en'];

        const params = [];
        for (const lang of langs) {
            for (const product of products) {
                params.push({
                    lang: lang,
                    id: product.id.toString(),
                });
            }
        }

        return params;
    } catch (error) {
        console.error('Failed to generate static params:', error);
        return [];
    }
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