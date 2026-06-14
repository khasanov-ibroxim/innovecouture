import { getCheckoutDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";
import CheckoutClient from "@/components/checkout/CheckoutClient";

const CheckoutPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getCheckoutDictionary(lang as Locale);

    return <CheckoutClient lang={lang} dict={dict} />;
};

export default CheckoutPage;