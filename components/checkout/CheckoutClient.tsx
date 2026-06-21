"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCart, CartItem } from "@/lib/cart";
import { apiClient } from "@/lib/api/client";
import type { CreateOrderRequest, PaymentMethod } from "@/lib/api/types";
import Image from "next/image";
import type { CheckoutDictionary } from "@/lib/dictionary";

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

/* ─── Main Checkout Client Component ──────────────────────────────────── */
interface CheckoutClientProps {
    lang: string;
    dict: CheckoutDictionary;
}

export default function CheckoutClient({ lang, dict }: CheckoutClientProps) {
    const [items, setItems] = useState<CartItem[]>(() => getCart());
    const [payment, setPayment] = useState<string>("cash");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [availablePayments, setAvailablePayments] = useState<PaymentMethod[]>([]);
    const [loadingPayments, setLoadingPayments] = useState(true);

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [orderId, setOrderId] = useState<number | null>(null);

    // Billing
    const [billing, setBilling] = useState({
        firstName: "", lastName: "", company: "",
        country: "Bulgaria", street1: "", street2: "",
        city: "", state: "Sofia", postcode: "", phone: "", email: "",
    });

    const [orderNotes, setOrderNotes] = useState("");

    // Load payment methods
    useEffect(() => {
        async function loadPaymentMethods() {
            try {
                const response = await apiClient.getPaymentMethods();
                if (response.ok && response.data) {
                    const activePayments = response.data.filter(p => p.status);
                    setAvailablePayments(activePayments);
                    if (activePayments.length > 0) {
                        setPayment(activePayments[0].method);
                    }
                }
            } catch (error) {
                console.error('Failed to load payment methods:', error);
            } finally {
                setLoadingPayments(false);
            }
        }
        loadPaymentMethods();
    }, []);

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = subtotal;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!billing.firstName) e.firstName = dict.errors.required;
        if (!billing.lastName) e.lastName = dict.errors.required;
        if (!billing.street1) e.street1 = dict.errors.required;
        if (!billing.city) e.city = dict.errors.required;
        if (!billing.postcode) e.postcode = dict.errors.required;
        if (!billing.phone) e.phone = dict.errors.required;
        if (!billing.email) e.email = dict.errors.required;
        if (!agreedToTerms) e.terms = dict.errors.termsRequired;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;

        setSubmitting(true);
        setErrors({});

        try {
            // Prepare order items
            const orderItems = items.map(item => {
                if (!item.product_item_id) {
                    throw new Error(`Missing product_item_id for ${item.name}`);
                }
                return {
                    product_id: typeof item.productId === 'string' ? parseInt(item.productId) : item.productId,
                    product_item_id: item.product_item_id,
                    count: item.quantity
                };
            });

            // Step 1: Create order without payment
            const orderData: CreateOrderRequest = {
                first_name: billing.firstName,
                last_name: billing.lastName,
                country: billing.country,
                address: billing.street1 + (billing.street2 ? ', ' + billing.street2 : ''),
                town_city: billing.city,
                contact: billing.phone,
                postcode_zip: parseInt(billing.postcode) || 0,
                payment: 'cash', // temporary, will be updated
                items: orderItems,
                email_address: billing.email,
                state_county: billing.state || undefined,
            };

            const orderResponse = await apiClient.createOrder(orderData);

            if (!orderResponse.ok || !orderResponse.data) {
                setErrors({ submit: dict.errors.orderFailed });
                return;
            }

            const createdOrderId = orderResponse.data.order_id;
            setOrderId(createdOrderId);

            // Step 2: Select payment method
            const paymentMethod = payment as 'click' | 'payme' | 'cash';

            if (paymentMethod === 'cash') {
                // For cash, redirect to success page
                localStorage.setItem("cart", JSON.stringify([]));
                window.dispatchEvent(new Event("cartUpdated"));
                window.location.href = `/${lang}/order/${createdOrderId}/success?type=cash`;
                return;
            }

            // For online payments (payme/click)
            const paymentResponse = await apiClient.selectPayment({
                order_id: createdOrderId,
                payment: paymentMethod
            });

            if (paymentResponse.ok && paymentResponse.data?.payment_url) {
                // Clear cart
                localStorage.setItem("cart", JSON.stringify([]));
                window.dispatchEvent(new Event("cartUpdated"));
                // Redirect to payment gateway
                window.location.href = paymentResponse.data.payment_url;
            } else {
                setErrors({ submit: dict.errors.paymentFailed });
            }
        } catch (error) {
            console.error('Order creation failed:', error);
            setErrors({ submit: dict.errors.genericError });
        } finally {
            setSubmitting(false);
        }
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
                    <h1 className="text-[22px] uppercase tracking-[0.06em] font-normal mb-3">{dict.processingOrder}</h1>
                    <p className="text-[12px] text-neutral-500 leading-relaxed mb-2">
                        {dict.processingOrderMessage}
                    </p>
                    {orderId && (
                        <p className="text-[11px] text-neutral-400 mb-8">
                            {dict.orderId}: #{orderId}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 min-h-screen bg-white">
            {/* Progress steps */}
            <div className="border-b border-neutral-200 px-5 md:px-10 py-4">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase justify-center">
                    {[dict.breadcrumb.cart, dict.breadcrumb.checkout, dict.breadcrumb.orderComplete].map((step, i) => (
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
                            {dict.billingDetails}
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    label={dict.firstName}
                                    required
                                    value={billing.firstName}
                                    onChange={(v) => setBilling({ ...billing, firstName: v })}
                                    error={errors.firstName}
                                />
                                <Field
                                    label={dict.lastName}
                                    required
                                    value={billing.lastName}
                                    onChange={(v) => setBilling({ ...billing, lastName: v })}
                                    error={errors.lastName}
                                />
                            </div>

                            <SelectField
                                label={dict.country}
                                required
                                options={["Bulgaria", "Uzbekistan", "United States", "United Kingdom", "Germany", "France"]}
                                value={billing.country}
                                onChange={(v) => setBilling({ ...billing, country: v })}
                            />

                            <Field
                                label={dict.streetAddress}
                                required
                                placeholder={dict.streetAddressPlaceholder}
                                value={billing.street1}
                                onChange={(v) => setBilling({ ...billing, street1: v })}
                                error={errors.street1}
                            />
                            <Field
                                label=""
                                placeholder={dict.apartment}
                                value={billing.street2}
                                onChange={(v) => setBilling({ ...billing, street2: v })}
                            />

                            <Field
                                label={dict.townCity}
                                required
                                value={billing.city}
                                onChange={(v) => setBilling({ ...billing, city: v })}
                                error={errors.city}
                            />

                            <Field
                                label={dict.stateCounty}
                                placeholder="Sofia"
                                value={billing.state}
                                onChange={(v) => setBilling({ ...billing, state: v })}
                            />

                            <Field
                                label={dict.postcode}
                                required
                                value={billing.postcode}
                                onChange={(v) => setBilling({ ...billing, postcode: v })}
                                error={errors.postcode}
                            />

                            <Field
                                label={dict.phone}
                                required
                                type="tel"
                                value={billing.phone}
                                onChange={(v) => setBilling({ ...billing, phone: v })}
                                error={errors.phone}
                            />

                            <Field
                                label={dict.email}
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
                                {dict.orderNotes}
                            </label>
                            <textarea
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                                placeholder={dict.orderNotesPlaceholder}
                                rows={4}
                                className="border border-neutral-300 px-4 py-3 text-[12px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition-colors resize-y"
                            />
                        </div>
                    </div>

                    {/* ── RIGHT: Order Summary ── */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="border border-neutral-200 p-6">
                            <h2 className="text-[12px] tracking-[0.16em] uppercase font-medium mb-5">
                                {dict.orderSummary}
                            </h2>

                            {/* Header row */}
                            <div className="flex justify-between mb-4 pb-3 border-b border-neutral-100">
                                <span className="text-[11px] tracking-[0.1em] uppercase text-neutral-500">{dict.product}</span>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-3 mb-5">
                                {items.length === 0 ? (
                                    <p className="text-[11px] text-neutral-400">{dict.noItemsInCart}</p>
                                ) : items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-start gap-2">
                                        <div>
                                            <p className="text-[11px] tracking-[0.06em] text-neutral-800">
                                                {item.name} <span className="text-neutral-500">× {item.quantity}</span>
                                            </p>
                                            <p className="text-[10px] text-neutral-400 mt-0.5">
                                                {dict.color}: {item.color}
                                            </p>
                                            <p className="text-[10px] text-neutral-400">
                                                {dict.size}: {item.size}
                                            </p>
                                        </div>
                                        <span className="text-[11px] text-neutral-800 whitespace-nowrap">
                      {(item.price * item.quantity).toLocaleString()} UZS
                    </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between py-3 border-t border-neutral-200">
                                <span className="text-[13px] tracking-[0.1em] uppercase font-medium text-neutral-900">{dict.total}</span>
                                <div className="text-right">
                                    <span className="text-[14px] font-medium text-neutral-900">{total.toLocaleString()} UZS</span>
                                </div>
                            </div>

                        </div>

                        {/* Payment section */}
                        <div className="border border-t-0 border-neutral-200 p-6">
                            <div className="flex flex-col gap-3">

                                {loadingPayments ? (
                                    <p className="text-[11px] text-neutral-400">{dict.loadingPaymentMethods}</p>
                                ) : availablePayments.length === 0 ? (
                                    <p className="text-[11px] text-neutral-400">{dict.noPaymentMethods}</p>
                                ) : (
                                    availablePayments.map((method) => (
                                        <label
                                            key={method.method}
                                            className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer transition
        ${payment === method.method ? "border-black bg-neutral-50" : "border-neutral-200"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={payment === method.method}
                                                    onChange={() => setPayment(method.method)}
                                                    className="accent-black cursor-pointer"
                                                />
                                                <span className="text-[12px] text-neutral-800 capitalize">{method.method}</span>
                                            </div>

                                            <img
                                                src={method.icon}
                                                alt={method.method}
                                                className="h-6 object-contain"
                                            />
                                        </label>
                                    ))
                                )}

                            </div>

                            {/* Privacy note */}
                            <p className="text-[10px] text-neutral-400 leading-relaxed mt-5 mb-5">
                                {dict.privacyNote}{" "}
                                <Link href={`/${lang}/privacy-policy`} className="underline hover:opacity-60 transition-opacity cursor-pointer">
                                    {dict.privacyPolicy}
                                </Link>
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
                  {dict.termsAgree}{" "}
                                    <Link href={`/${lang}/terms-conditions`} className="underline text-neutral-800 hover:opacity-60 transition-opacity cursor-pointer">
                    {dict.termsAndConditions}
                  </Link>{" "}
                                    <span className="text-red-400">*</span>
                </span>
                            </label>
                            {errors.terms && (
                                <p className="text-[10px] text-red-400 mb-4">{errors.terms}</p>
                            )}
                            {errors.submit && (
                                <p className="text-[10px] text-red-400 mb-4">{errors.submit}</p>
                            )}

                            {/* Place order */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                className="w-full bg-black text-white py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? dict.processing : dict.placeOrder}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
