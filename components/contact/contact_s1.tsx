import React from "react";

const contacts = [
    {
        title: "Design Studio",
        lines: [
            "217 Tueri Junction, New York, NY 10002",
            "10:00 am – 7:00 pm Daily",
        ],
    },
    {
        title: "Customer Care",
        lines: ["+1 212 532 8222", "shop@innovecouture.com"],
    },
    {
        title: "PR Inquiries",
        lines: ["+1 212 532 8222", "pr@innovecouture.com"],
    },
    {
        title: "Wholesale Inquiries",
        lines: ["+1 212 532 8222", "sales@innovecouture.com"],
    },
];

const ContactS1 = () => {
    return (
        <section className="w-full px-5 md:px-10 py-16 md:py-24">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <p className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 mb-3">
                    Contact
                </p>
                <h1 className="text-[32px] md:text-[44px] font-normal uppercase tracking-[0.04em] leading-none">
                    We're Here to Help
                </h1>
            </div>

            <div className="border-t border-neutral-200" />

            {/* Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 pt-12 md:pt-14">
                {contacts.map((col) => (
                    <div key={col.title} className="flex flex-col gap-3">
                        <h2 className="text-[11px] tracking-[0.16em] uppercase font-semibold text-neutral-900">
                            {col.title}
                        </h2>
                        <div className="flex flex-col gap-1">
                            {col.lines.map((line) => (
                                <p
                                    key={line}
                                    className="text-[13px] text-neutral-600 leading-relaxed"
                                >
                                    {line.includes("@") ? (
                                        <a
                                            href={`mailto:${line}`}
                                            className="hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                                        >
                                            {line}
                                        </a>
                                    ) : line.startsWith("+") ? (
                                        <a
                                            href={`tel:${line.replace(/\s/g, "")}`}
                                            className="hover:text-neutral-900 transition-colors"
                                        >
                                            {line}
                                        </a>
                                    ) : (
                                        line
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactS1;