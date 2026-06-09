"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo_long from "@/assets/logoLong.png";
import logo_2Step from "@/assets/logo2step.png";
import { CommonDictionary } from "@/lib/dictionary";
import { useParams } from "next/navigation";

interface FooterProps {
    dict: CommonDictionary;
}

const Footer = ({ dict }: FooterProps) => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const params = useParams();
    const lang = params?.lang || 'ru';

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="w-full bg-[#E9D8D0] border-t border-white">

            {/* ── Brand + Email signup ── */}
            <div className="px-5 md:px-10 pt-14 pb-10 flex flex-col items-center text-center">

                {/* Logo / Brand name */}
                <div className="mb-10">
                    {/* If you have a logo SVG: <Image src={logo} alt="Innové Couture" /> */}
                    <span
                        className="text-[32px] md:text-[52px] font-normal tracking-[0.04em] uppercase leading-none select-none"
                        style={{ fontStyle: "italic", letterSpacing: "0.02em" }}
                    >
                        <span style={{ fontStyle: "normal" }}>Khiva </span>
                        <span style={{ fontStyle: "italic" }}>Code</span>
                    </span>
                </div>

                {/* Email signup row */}
                <div className="w-full max-w-[860px] border-t border-b border-white flex flex-col md:flex-row items-stretch">
                    {/* Left label */}
                    <div className="flex items-center justify-center md:justify-start px-6 py-5 border-b md:border-b-0 md:border-r border-white md:w-[45%]">
                        <p className="text-[11px] tracking-[0.18em] uppercase font-medium text-white-800">
                            {dict.footer.signup.title}
                        </p>
                    </div>

                    {/* Right input */}
                    <div className="flex flex-1 items-center px-6 py-4">
                        {subscribed ? (
                            <p className="text-[11px] tracking-[0.14em] uppercase text-white w-full text-center md:text-left">
                                {dict.footer.signup.subscribed}
                            </p>
                        ) : (
                            <div className="flex items-center w-full gap-3">
                                <input
                                    type="email"
                                    placeholder={dict.footer.signup.placeholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                    className="flex-1 bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-400 outline-none tracking-[0.04em]"
                                />
                                <button
                                    onClick={handleSubscribe}
                                    aria-label="Subscribe"
                                    className="text-neutral-700 hover:opacity-40 transition-opacity cursor-pointer flex-shrink-0"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Nav links ── */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pb-10 px-5">
                {[
                    { link: `/${lang}`, label: dict.nav.home },
                    { link: `/${lang}/shop`, label: dict.nav.shop },
                    { link: `/${lang}/about`, label: dict.nav.about },
                    { link: `/${lang}/sustainability`, label: dict.nav.sustainability },
                    { link: `/${lang}/contact`, label: dict.nav.contact },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.link}
                        className="text-[12px] tracking-[0.1em] text-neutral-700 hover:opacity-40 transition-opacity"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-white px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <p className="text-[10px] tracking-[0.1em] text-black-400 order-2 md:order-1">
                    © {new Date().getFullYear()}&nbsp; {dict.footer.copyright}
                </p>

                {/* Social links */}
                <div className="flex items-center gap-6 order-1 md:order-2">
                    <Link
                        href="#"
                        className="text-[11px] tracking-[0.12em] text-black-600 hover:opacity-40 transition-opacity"
                    >
                        {dict.footer.social.instagram}
                    </Link>
                    <Link
                        href="#"
                        className="text-[11px] tracking-[0.12em] text-neutral-600 hover:opacity-40 transition-opacity"
                    >
                        {dict.footer.social.facebook}
                    </Link>
                    <Link
                        href="#"
                        className="text-[11px] tracking-[0.12em] text-neutral-600 hover:opacity-40 transition-opacity"
                    >
                        {dict.footer.social.linkedin}
                    </Link>
                </div>

                {/* Legal links */}
                <div className="flex items-center gap-5 order-3">
                    <Link
                        href="#"
                        className="text-[10px] tracking-[0.1em] text-neutral-400 hover:opacity-60 transition-opacity"
                    >
                        {dict.footer.legal.terms}
                    </Link>
                    <Link
                        href="#"
                        className="text-[10px] tracking-[0.1em] text-neutral-400 hover:opacity-60 transition-opacity"
                    >
                        {dict.footer.legal.privacy}
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;