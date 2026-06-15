import React from "react";
import { getOrderDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import OrderSuccessClient from "./OrderSuccessClient";

export async function generateStaticParams() {
    const params = [];
    for (const lang of i18n.locales) {
        params.push({
            lang: lang,
            orderId: "placeholder",
        });
    }
    return params;
}

export const dynamic = 'force-static';

export default async function OrderSuccessPage({
    params,
}: {
    params: Promise<{ lang: string; orderId: string }>;
}) {
    const { lang, orderId } = await params;
    const dict = await getOrderDictionary(lang as Locale);

    return <OrderSuccessClient lang={lang} orderId={orderId} dict={dict} />;
}
