"use client";

import React, { useState } from "react";

interface FormState {
    name: string;
    email: string;
    phone: string;
    order: string;
    message: string;
}

const ContactS2 = () => {
    const [form, setForm] = useState<FormState>({
        name: "", email: "", phone: "", order: "", message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) return;
        setSubmitted(true);
    };

    return (
        <section className="w-full px-5 md:px-10 lg:px-24 xl:px-40 py-14 md:py-20">
            {/* Heading */}
            <p className="text-[14px] md:text-[18px] tracking-[0.1em] uppercase font-medium text-neutral-900 text-center leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
                Please complete the form below, and your query will be sent
                directly to our customer support team
            </p>

            {submitted ? (
                <div className="text-center py-12">
                    <p className="text-[13px] tracking-[0.12em] uppercase text-neutral-600">
                        Thank you! We'll be in touch shortly.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Your name" value={form.name} onChange={set("name")} />
                        <Field label="Email address" type="email" value={form.email} onChange={set("email")} />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Phone number" type="tel" value={form.phone} onChange={set("phone")} />
                        <Field label="Order number" value={form.order} onChange={set("order")} />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] tracking-[0.06em] text-neutral-800">
                            Your message
                        </label>
                        <textarea
                            value={form.message}
                            onChange={set("message")}
                            rows={6}
                            className="border border-neutral-300 px-3 py-2.5 text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="bg-neutral-900 text-white px-10 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

/* ─── Reusable input field ─── */
function Field({
                   label,
                   value,
                   onChange,
                   type = "text",
               }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[12px] tracking-[0.06em] text-neutral-800">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="border border-neutral-300 px-3 py-2.5 text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition-colors"
            />
        </div>
    );
}

export default ContactS2;