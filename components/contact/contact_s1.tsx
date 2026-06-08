import React from "react";

interface ContactS1Props {
    dict: {
        header: {
            subtitle: string;
            title: string;
        };
        contacts: Array<{
            title: string;
            lines: string[];
        }>;
    };
}

const ContactS1 = ({ dict }: ContactS1Props) => {
    return (
        <section className="w-full px-5 md:px-10 py-16 md:py-24">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <p className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 mb-3">
                    {dict.header.subtitle}
                </p>
                <h1 className="text-[32px] md:text-[44px] font-normal uppercase tracking-[0.04em] leading-none">
                    {dict.header.title}
                </h1>
            </div>

            <div className="border-t border-neutral-200" />

            {/* Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 pt-12 md:pt-14">
                {dict.contacts.map((col) => (
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