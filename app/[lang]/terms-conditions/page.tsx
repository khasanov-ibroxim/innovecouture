import { getTermsDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";

const TermsConditionsPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    const dict = await getTermsDictionary(lang as Locale);

    return (
        <div className="pt-16 min-h-screen bg-white">
            <div className="px-5 md:px-12 lg:px-20 py-16 max-w-[900px] mx-auto">
                {/* Header */}
                <h1 className="text-[32px] md:text-[40px] uppercase tracking-[0.06em] font-normal mb-4">
                    {dict.title}
                </h1>
                <p className="text-[11px] text-neutral-500 mb-12">{dict.lastUpdated}</p>

                {/* Content Sections */}
                <div className="space-y-8">
                    {Object.entries(dict.sections).map(([key, section]) => (
                        <div key={key}>
                            <h2 className="text-[16px] uppercase tracking-[0.08em] font-medium mb-3">
                                {(section as { title: string; content: string }).title}
                            </h2>
                            <p className="text-[13px] leading-relaxed text-neutral-700">
                                {(section as { title: string; content: string }).content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Back to home link */}
                <div className="mt-16 pt-8 border-t border-neutral-200">
                    <Link
                        href={`/${lang}`}
                        className="text-[11px] tracking-[0.12em] uppercase text-neutral-800 hover:text-neutral-600 transition-colors"
                    >
                        ← {dict.backToHome}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsConditionsPage;
