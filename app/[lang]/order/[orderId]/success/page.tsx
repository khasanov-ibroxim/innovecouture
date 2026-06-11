"use client";

import React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params?.orderId;
  const paymentType = searchParams?.get("type");

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
          Order Complete
        </h1>

        <p className="text-[12px] text-neutral-500 leading-relaxed mb-2">
          {paymentType === "cash"
            ? "Your order has been received. Our team will contact you shortly to confirm the payment."
            : "Thank you for your purchase. Your payment has been processed successfully."}
        </p>

        {orderId && (
          <p className="text-[11px] text-neutral-400 mb-8">
            Order ID: #{orderId}
          </p>
        )}

        <Link
          href="/en"
          className="inline-block bg-black text-white px-10 py-3.5 text-[10px] tracking-[0.18em] uppercase hover:bg-neutral-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
