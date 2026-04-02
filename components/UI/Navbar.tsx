"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import logo from "@/assets/logo.svg"
import navMenuBg from "@/assets/navbar/nav_menu_bg.jpg"
import Image from "next/image"
import CartDrawer from "@/components/UI/CartDrawer"
import { getCartCount } from "@/lib/cart"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { i18n, Locale } from "@/i18n-config";

interface Props {
    dict: string,
    lang: string
}

/* ─── Lang Switcher ─────────────────────────────────────────── */
function LangSwitcher({ lang }: { lang: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const switchTo = (locale: Locale) => {
        if (locale === lang) return;
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    };

    return (
        <div className="flex items-center gap-0.5">
            {i18n.locales.map((locale, idx) => (
                <React.Fragment key={locale}>
                    <button
                        onClick={() => switchTo(locale)}
                        className={`text-[11px] tracking-[0.1em] uppercase transition-opacity cursor-pointer px-0.5 ${
                            lang === locale
                                ? "text-neutral-900 font-semibold opacity-100"
                                : "text-neutral-500 opacity-60 hover:opacity-100 hover:text-neutral-900"
                        }`}
                    >
                        {locale}
                    </button>
                    {idx < i18n.locales.length - 1 && (
                        <span className="text-neutral-300 text-[10px] select-none">/</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

/* ─── Navbar ────────────────────────────────────────────────── */
const Navbar = ({ dict, lang }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [isTransparent, setIsTransparent] = useState(true)
    const [cartCount, setCartCount] = useState(0)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const update = () => setCartCount(getCartCount())
        update()
        window.addEventListener("cartUpdated", update)
        return () => window.removeEventListener("cartUpdated", update)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const windowHeight = window.innerHeight
            setIsTransparent(currentScrollY < windowHeight)
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setHidden(true)
            } else {
                setHidden(false)
            }
            lastScrollY.current = currentScrollY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <>
            {/* ───── NAVBAR ───── */}
            <motion.header
                animate={{ y: hidden ? '-100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={[
                    'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300',
                    isTransparent
                        ? 'bg-transparent'
                        : 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]',
                ].join(' ')}
            >
                <div className="relative flex items-center h-16 px-6 lg:px-10">

                    {/* ── MOBILE LEFT: Hamburger ── */}
                    <button
                        aria-label="Open menu"
                        onClick={() => setMenuOpen(true)}
                        className="flex lg:hidden flex-col gap-[5px] items-start p-1 hover:opacity-50 transition-opacity"
                    >
                        <span className="block h-px w-6 bg-neutral-900" />
                        <span className="block h-px w-4 bg-neutral-900" />
                    </button>

                    {/* ── DESKTOP LEFT: Nav links ── */}
                    <nav className="hidden lg:flex items-center gap-9 flex-1">
                        {[
                            { link: `/${lang}`, label: "H." },
                            { link: `/${lang}/shop`, label: "Shop" },
                            { link: `/${lang}/about`, label: "About" },
                            { link: `/${lang}/contact`, label: "Contact" },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className="text-[14px] font-medium tracking-[0.12em] uppercase text-neutral-900 hover:opacity-50 transition-opacity"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Center – logo */}
                    <a
                        href={`/${lang}`}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none"
                    >
                        <Image src={logo} alt="logo" />
                    </a>

                    {/* Right – icons */}
                    <div className="flex items-center gap-4 flex-1 justify-end">

                        {/* Lang switcher — ONLY on desktop in navbar */}
                        <div className="hidden lg:flex">
                            <LangSwitcher lang={lang} />
                        </div>

                        {/* Cart */}
                        <button
                            aria-label="Cart"
                            onClick={() => setCartOpen(true)}
                            className="relative p-1 cursor-pointer text-neutral-900 hover:opacity-50 transition-opacity"
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 text-[9px] leading-none font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* ── DESKTOP RIGHT: Hamburger ── */}
                        {/*<button*/}
                        {/*    aria-label="Open menu"*/}
                        {/*    onClick={() => setMenuOpen(true)}*/}
                        {/*    className="hidden lg:flex flex-col gap-[5px] items-end p-1 hover:opacity-50 transition-opacity cursor-pointer"*/}
                        {/*>*/}
                        {/*    <span className="block h-px w-6 bg-neutral-900" />*/}
                        {/*    <span className="block h-px w-4 bg-neutral-900" />*/}
                        {/*</button>*/}
                    </div>
                </div>
            </motion.header>

            {/* ───── CART DRAWER ───── */}
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            {/* ───── MENU OVERLAY ───── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[999] flex"
                    >
                        {/* Left editorial image panel – desktop only */}
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            className="hidden lg:block lg:flex-[0_0_50%]"
                        >
                            <Image src={navMenuBg} alt="nav menu background" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Right content panel */}
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 40, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            className="flex-1 bg-white flex flex-col px-8 lg:px-10 py-6 overflow-y-auto"
                        >
                            {/* Panel header: logo + lang switcher + close */}
                            <div className="flex items-center justify-between mb-12">
                                <Image src={logo} alt="logo" />
                                <div className="flex items-center gap-5">
                                    {/* Lang switcher always visible inside menu */}
                                    <LangSwitcher lang={lang} />
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        aria-label="Close menu"
                                        className="text-neutral-900 hover:opacity-40 transition-opacity cursor-pointer"
                                    >
                                        <X size={22} strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile only – nav links inside menu */}
                            <div className="flex lg:hidden flex-col gap-3 mb-6 pb-6 border-b border-neutral-100">
                                {[
                                    { link: `/${lang}`, label: "H." },
                                    { link: `/${lang}/shop`, label: "Shop" },
                                    { link: `/${lang}/about`, label: "About" },
                                    { link: `/${lang}/contact`, label: "Contact" },
                                ].map((item, index) => (
                                    <Link
                                        href={item.link}
                                        key={index}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-[20px] tracking-[0.14em] uppercase text-neutral-900 text-left hover:opacity-40 transition-opacity"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>


                            {/* Footer links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45, duration: 0.4 }}
                                className="mt-auto flex justify-between items-end"
                            >
                                <div className="flex flex-col gap-2.5">
                                    {['Order Status', 'Delivery and Returns'].map((link) => (
                                        <a key={link} href="#" className="text-[10px] tracking-[0.12em] uppercase text-neutral-900 hover:opacity-40 transition-opacity">
                                            {link}
                                        </a>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2.5 text-right">
                                    {['Instagram', 'Facebook', 'Pinterest'].map((link) => (
                                        <a key={link} href="#" className="text-[10px] tracking-[0.12em] uppercase text-neutral-900 hover:opacity-40 transition-opacity">
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar