import React from "react";
import Link from "next/link";
import { getOrderDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";

export default async function OrderSuccessPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string; orderId: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { lang, orderId } = await params;
  const { type: paymentType } = await searchParams;
  const dict = await getOrderDictionary(lang as Locale);

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-5 bg-white">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full border border-neutral-300 flex items-center justify-center mx-auto mb-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-[22px] uppercase tracking-[0.06em] font-normal mb-3">
          {dict.success.title}
        </h1>

        <p className="text-[12px] text-neutral-500 leading-relaxed mb-2">
          {paymentType === "cash"
            ? dict.success.messageCash
            : dict.success.messageOnline}
        </p>

        {orderId && (
          <p className="text-[11px] text-neutral-400 mb-8">
            {dict.success.orderId}: #{orderId}
          </p>
        )}

        <Link
          href={`/${lang}`}
          className="inline-block bg-black text-white px-10 py-3.5 text-[10px] tracking-[0.18em] uppercase hover:bg-neutral-700 transition-colors"
        >
          {dict.success.continueButton}
        </Link>
      </div>
    </div>
  );
}
