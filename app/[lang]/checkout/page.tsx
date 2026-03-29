"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCart, CartItem } from "@/lib/cart";
import click from "@/assets/icons/click.png"
import payme from "@/assets/icons/payme.png"
import uzcard from "@/assets/icons/uzcard.png"
import humo from "@/assets/icons/humo.png"
import mastercard from "@/assets/icons/masterCard.png"
import visa from "@/assets/icons/visa.png"
import Image from "next/image";

/* ─── Input Field ─────────────────────────────────────────── */
function Field({
                   label,
                   placeholder,
                   required,
                   value,
                   onChange,
                   type = "text",
                   error,
               }: {
    label: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.1em] uppercase text-neutral-700 font-medium">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder || label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`border ${error ? "border-red-300" : "border-neutral-300"} px-4 py-3 text-[12px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition-colors`}
            />
            {error && <p className="text-[10px] text-red-400">{error}</p>}
        </div>
    );
}

/* ─── Select Field ────────────────────────────────────────── */
function SelectField({
                         label,
                         options,
                         value,
                         onChange,
                         required,
                     }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.1em] uppercase text-neutral-700 font-medium">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border border-neutral-300 px-4 py-3 text-[12px] text-neutral-800 focus:outline-none focus:border-neutral-700 transition-colors bg-white appearance-none cursor-pointer"
            >
                {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
        </div>
    );
}

/* ─── Main Checkout Page ──────────────────────────────────── */
export default function CheckoutPage() {
    const [items, setItems] = useState<CartItem[]>(() => getCart());
    const [shipping, setShipping] = useState<"free" | "flat" | "local">("free");
    const [payment, setPayment] = useState<
        "click" | "payme" | "uzcard" | "humo" | "visa" | "mastercard"
    >("click");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Billing
    const [billing, setBilling] = useState({
        firstName: "", lastName: "", company: "",
        country: "Bulgaria", street1: "", street2: "",
        city: "", state: "Sofia", postcode: "", phone: "", email: "",
    });



    const [orderNotes, setOrderNotes] = useState("");

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingCost = shipping === "free" ? 0 : 10;
    const vat = Math.round(subtotal * 0.2);
    const total = subtotal + shippingCost + vat;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!billing.firstName) e.firstName = "Required";
        if (!billing.lastName) e.lastName = "Required";
        if (!billing.street1) e.street1 = "Required";
        if (!billing.city) e.city = "Required";
        if (!billing.postcode) e.postcode = "Required";
        if (!billing.phone) e.phone = "Required";
        if (!billing.email) e.email = "Required";
        if (!agreedToTerms) e.terms = "You must agree to terms";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validate()) return;
        // Clear cart
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new Event("cartUpdated"));
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="pt-16 min-h-screen flex items-center justify-center px-5">
                <div className="text-center max-w-md">
                    <div className="w-14 h-14 rounded-full border border-neutral-300 flex items-center justify-center mx-auto mb-6">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h1 className="text-[22px] uppercase tracking-[0.06em] font-normal mb-3">Order Complete</h1>
                    <p className="text-[12px] text-neutral-500 leading-relaxed mb-8">
                        Thank you for your purchase. A confirmation email will be sent to {billing.email || "your email"}.
                    </p>
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

    return (
        <div className="pt-16 min-h-screen bg-white">
            {/* Progress steps */}
            <div className="border-b border-neutral-200 px-5 md:px-10 py-4">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase justify-center">
                    {["Cart", "Checkout", "Order Complete"].map((step, i) => (
                        <React.Fragment key={step}>
              <span className={i === 1 ? "text-neutral-900 font-medium" : "text-neutral-400"}>
                {step}
              </span>
                            {i < 2 && <ChevronRight size={10} strokeWidth={1.5} className="text-neutral-300" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="px-5 md:px-12 lg:px-20 py-10 max-w-[1200px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* ── LEFT: Billing Form ── */}
                    <div className="flex-1">


                        {/* Billing Details */}
                        <h2 className="text-[12px] tracking-[0.16em] uppercase font-medium mb-6">
                            Billing Details
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    label="First Name"
                                    required
                                    value={billing.firstName}
                                    onChange={(v) => setBilling({ ...billing, firstName: v })}
                                    error={errors.firstName}
                                />
                                <Field
                                    label="Last Name"
                                    required
                                    value={billing.lastName}
                                    onChange={(v) => setBilling({ ...billing, lastName: v })}
                                    error={errors.lastName}
                                />
                            </div>



                            <SelectField
                                label="Country / Region"
                                required
                                options={["Bulgaria", "Uzbekistan", "United States", "United Kingdom", "Germany", "France"]}
                                value={billing.country}
                                onChange={(v) => setBilling({ ...billing, country: v })}
                            />

                            <Field
                                label="Street address"
                                required
                                placeholder="House number and street name"
                                value={billing.street1}
                                onChange={(v) => setBilling({ ...billing, street1: v })}
                                error={errors.street1}
                            />
                            <Field
                                label=""
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                value={billing.street2}
                                onChange={(v) => setBilling({ ...billing, street2: v })}
                            />

                            <Field
                                label="Town / City"
                                required
                                value={billing.city}
                                onChange={(v) => setBilling({ ...billing, city: v })}
                                error={errors.city}
                            />

                            <Field
                                label="State / County (optional)"
                                placeholder="Sofia"
                                value={billing.state}
                                onChange={(v) => setBilling({ ...billing, state: v })}
                            />

                            <Field
                                label="Postcode / ZIP"
                                required
                                value={billing.postcode}
                                onChange={(v) => setBilling({ ...billing, postcode: v })}
                                error={errors.postcode}
                            />

                            <Field
                                label="Phone"
                                required
                                type="tel"
                                value={billing.phone}
                                onChange={(v) => setBilling({ ...billing, phone: v })}
                                error={errors.phone}
                            />

                            <Field
                                label="Email Address"
                                required
                                type="email"
                                value={billing.email}
                                onChange={(v) => setBilling({ ...billing, email: v })}
                                error={errors.email}
                            />


                        </div>



                        {/* Order notes */}
                        <div className="mt-6 flex flex-col gap-1.5">
                            <label className="text-[11px] tracking-[0.1em] uppercase text-neutral-700 font-medium">
                                Order notes (optional)
                            </label>
                            <textarea
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                rows={4}
                                className="border border-neutral-300 px-4 py-3 text-[12px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition-colors resize-y"
                            />
                        </div>
                    </div>

                    {/* ── RIGHT: Order Summary ── */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="border border-neutral-200 p-6">
                            <h2 className="text-[12px] tracking-[0.16em] uppercase font-medium mb-5">
                                Order Summary
                            </h2>

                            {/* Header row */}
                            <div className="flex justify-between mb-4 pb-3 border-b border-neutral-100">
                                <span className="text-[11px] tracking-[0.1em] uppercase text-neutral-500">Product</span>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-3 mb-5">
                                {items.length === 0 ? (
                                    <p className="text-[11px] text-neutral-400">No items in cart</p>
                                ) : items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-start gap-2">
                                        <div>
                                            <p className="text-[11px] tracking-[0.06em] text-neutral-800">
                                                {item.name} <span className="text-neutral-500">× {item.quantity}</span>
                                            </p>
                                            <p className="text-[10px] text-neutral-400 mt-0.5">
                                                Color: {item.color}
                                            </p>
                                            <p className="text-[10px] text-neutral-400">
                                                Size: {item.size}
                                            </p>
                                        </div>
                                        <span className="text-[11px] text-neutral-800 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(0)}
                    </span>
                                    </div>
                                ))}
                            </div>


                            {/* Total */}
                            <div className="flex justify-between py-3 border-t border-neutral-200">
                                <span className="text-[13px] tracking-[0.1em] uppercase font-medium text-neutral-900">Total</span>
                                <div className="text-right">
                                    <span className="text-[14px] font-medium text-neutral-900">${total.toFixed(0)}</span>
                                    <span className="block text-[10px] text-neutral-400">USD</span>
                                </div>
                            </div>

                        </div>

                        {/* Payment section */}
                        <div className="border border-t-0 border-neutral-200 p-6">
                            <div className="flex flex-col gap-3">

                                {(
                                    [
                                        { key: "click", label: "Click", icon: click },
                                        { key: "payme", label: "Payme", icon: payme },
                                        { key: "uzcard", label: "Uzcard", icon: uzcard },
                                        { key: "humo", label: "Humo", icon: humo },
                                        { key: "visa", label: "Visa", icon: visa },
                                        { key: "mastercard", label: "MasterCard", icon: mastercard },
                                    ] as const
                                ).map((method) => (
                                    <label
                                        key={method.key}
                                        className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer transition 
        ${payment === method.key ? "border-black bg-neutral-50" : "border-neutral-200"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={payment === method.key}
                                                onChange={() => setPayment(method.key)}
                                                className="accent-black cursor-pointer"
                                            />
                                            <span className="text-[12px] text-neutral-800">{method.label}</span>
                                        </div>

                                        <Image
                                            src={method.icon}
                                            alt={method.label}
                                            width={80}
                                            height={100}
                                            className="h-6 object-cover object-center"
                                        />
                                    </label>
                                ))}

                            </div>

                            {/* Privacy note */}
                            <p className="text-[10px] text-neutral-400 leading-relaxed mt-5 mb-5">
                                Your personal data will be used to process your order, support your
                                experience throughout this website, and for other purposes described in
                                our{" "}
                                <button className="underline hover:opacity-60 transition-opacity cursor-pointer">
                                    privacy policy
                                </button>
                                .
                            </p>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer mb-5">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-0.5 w-3.5 h-3.5 accent-neutral-900 cursor-pointer"
                                />
                                <span className="text-[11px] text-neutral-600">
                  I have read and agree to the website{" "}
                                    <button className="underline text-neutral-800 hover:opacity-60 transition-opacity cursor-pointer">
                    terms and conditions
                  </button>{" "}
                                    <span className="text-red-400">*</span>
                </span>
                            </label>
                            {errors.terms && (
                                <p className="text-[10px] text-red-400 mb-4">{errors.terms}</p>
                            )}

                            {/* Place order */}
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-black text-white py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}