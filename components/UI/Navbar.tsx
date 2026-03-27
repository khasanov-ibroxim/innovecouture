"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react'
import logo from "@/assets/logo.svg"
import navMenuBg from "@/assets/navbar/nav_menu_bg.jpg"
import Image from "next/image";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [isTransparent, setIsTransparent] = useState(true)
    const lastScrollY = useRef(0)

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
                <div className="relative flex items-center h-16 px-6 md:px-10">

                    {/* ── MOBILE LEFT: Hamburger ── */}
                    <button
                        aria-label="Open menu"
                        onClick={() => setMenuOpen(true)}
                        className="flex md:hidden flex-col gap-[5px] items-start p-1 hover:opacity-50 transition-opacity"
                    >
                        <span className="block h-px w-6 bg-neutral-900" />
                        <span className="block h-px w-4 bg-neutral-900" />
                    </button>

                    {/* ── DESKTOP LEFT: Nav links ── */}
                    <nav className="hidden md:flex items-center gap-9 flex-1">
                        {['H.', 'Shop', 'Collections', 'About'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[14px] font-medium tracking-[0.12em] uppercase text-neutral-900 hover:opacity-50 transition-opacity"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Center – logo (absolute for both breakpoints) */}
                    <a
                        href="#"
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none"
                    >
                        <Image src={logo} alt="logo" />
                    </a>

                    {/* Right – icons */}
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <button aria-label="Search" className="p-1 text-neutral-900 cursor-pointer hover:opacity-50 transition-opacity">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <button aria-label="Account" className="hidden md:flex p-1 cursor-pointer text-neutral-900 hover:opacity-50 transition-opacity">
                            <User size={20} strokeWidth={1.5} />
                        </button>
                        <button aria-label="Wishlist" className="hidden md:flex p-1 cursor-pointer text-neutral-900 hover:opacity-50 transition-opacity">
                            <Heart size={20} strokeWidth={1.5} />
                        </button>
                        <button aria-label="Cart" className="relative p-1 cursor-pointer text-neutral-900 hover:opacity-50 transition-opacity">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            <span className="absolute -top-0.5 -right-0.5 text-[9px] leading-none">0</span>
                        </button>

                        {/* ── DESKTOP RIGHT: Hamburger ── */}
                        <button
                            aria-label="Open menu"
                            onClick={() => setMenuOpen(true)}
                            className="hidden md:flex flex-col gap-[5px] items-end p-1 hover:opacity-50 transition-opacity cursor-pointer"
                        >
                            <span className="block h-px w-6 bg-neutral-900" />
                            <span className="block h-px w-4 bg-neutral-900" />
                        </button>
                    </div>
                </div>
            </motion.header>

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
                            className="hidden md:block md:flex-[0_0_50%]"
                        >
                            <Image src={navMenuBg} alt="nav menu background" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Right content panel */}
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 40, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            className="flex-1 bg-white flex flex-col px-8 md:px-10 py-6 overflow-y-auto"
                        >
                            {/* Panel header */}
                            <div className="flex items-center justify-between mb-12">
                                <Image src={logo} alt="logo" />
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Close menu"
                                    className="text-neutral-900 hover:opacity-40 transition-opacity cursor-pointer"
                                >
                                    <X size={22} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Mobile only – desktop nav links inside menu */}
                            <div className="flex md:hidden flex-col gap-3 mb-6 pb-6 border-b border-neutral-100">
                                {['H.', 'Shop', 'Collections', 'About'].map((item) => (
                                    <button
                                        key={item}
                                        className="text-[10px] tracking-[0.14em] uppercase text-neutral-900 text-left hover:opacity-40 transition-opacity"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {/* Main menu items */}
                            <nav className="flex flex-col gap-2 mb-10">
                                {['Sustainability', 'Press', 'Contact'].map((item, i) => (
                                    <motion.button
                                        key={item}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                                        className="text-4xl md:text-5xl font-light tracking-wide uppercase text-neutral-900 text-left hover:opacity-30 transition-opacity leading-tight"
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Collection preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, duration: 0.4 }}
                                className="mb-10"
                            >
                                <div className="w-24 h-32 bg-neutral-300 mb-3" />
                                <span className="text-[10px] tracking-[0.15em] uppercase underline underline-offset-4 cursor-pointer text-neutral-900 hover:opacity-50 transition-opacity">
                                    Discover Winter 23
                                </span>
                            </motion.div>

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