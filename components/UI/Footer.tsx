"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/assets/logo.svg"; // uncomment if logo asset exists

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="w-full bg-[#f7f6f4] border-t border-neutral-200">

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
                <div className="w-full max-w-[860px] border-t border-b border-neutral-300 flex flex-col md:flex-row items-stretch">
                    {/* Left label */}
                    <div className="flex items-center justify-center md:justify-start px-6 py-5 border-b md:border-b-0 md:border-r border-neutral-300 md:w-[45%]">
                        <p className="text-[11px] tracking-[0.18em] uppercase font-medium text-neutral-800">
                            Sign up to get 10% off your first order
                        </p>
                    </div>

                    {/* Right input */}
                    <div className="flex flex-1 items-center px-6 py-4">
                        {subscribed ? (
                            <p className="text-[11px] tracking-[0.14em] uppercase text-neutral-500 w-full text-center md:text-left">
                                Thank you for subscribing ✓
                            </p>
                        ) : (
                            <div className="flex items-center w-full gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
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
                {["About", "Sustainability", "Press", "Contact", "Delivery and returns"].map((item) => (
                    <Link
                        key={item}
                        href="#"
                        className="text-[12px] tracking-[0.1em] text-neutral-700 hover:opacity-40 transition-opacity"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-neutral-200 px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <p className="text-[10px] tracking-[0.1em] text-neutral-400 order-2 md:order-1">
                    © {new Date().getFullYear()}&nbsp; VamTam. All rights reserved.
                </p>

                {/* Social links */}
                <div className="flex items-center gap-6 order-1 md:order-2">
                    {["Instagram", "Facebook", "Pinterest"].map((social) => (
                        <Link
                            key={social}
                            href="#"
                            className="text-[11px] tracking-[0.12em] text-neutral-600 hover:opacity-40 transition-opacity"
                        >
                            {social}
                        </Link>
                    ))}
                </div>

                {/* Legal links */}
                <div className="flex items-center gap-5 order-3">
                    {["Terms & conditions", "Privacy policy"].map((link) => (
                        <Link
                            key={link}
                            href="#"
                            className="text-[10px] tracking-[0.1em] text-neutral-400 hover:opacity-60 transition-opacity"
                        >
                            {link}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;