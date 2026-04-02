import { getHomeDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";
import ShopClient from "@/components/shop/ShopClient";

const ShopPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getHomeDictionary(lang as Locale);

    return <ShopClient lang={lang}  />;
};

export default ShopPage;