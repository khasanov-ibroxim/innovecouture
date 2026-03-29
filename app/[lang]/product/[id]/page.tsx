"use client";

import React, {useState, useEffect, useRef} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {ChevronLeft, ChevronRight, Plus, Minus} from "lucide-react";
import {getProductById} from "@/lib/products";
import {addToCart} from "@/lib/cart";

/* ─── Accordion ─────────────────────────────────────────────── */
function Accordion({
                       title,
                       children,
                   }: {
    title: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-neutral-200">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.16em] uppercase font-medium text-neutral-900 cursor-pointer hover:opacity-60 transition-opacity"
            >
                {title}
                {open ? <Minus size={14} strokeWidth={1.5}/> : <Plus size={14} strokeWidth={1.5}/>}
            </button>
            {open && (
                <div className="pb-4 text-[12px] leading-relaxed text-neutral-600">
                    {children}
                </div>
            )}
        </div>
    );
}

/* ─── Custom Dropdown ────────────────────────────────────────── */
function Dropdown({
                      label,
                      options,
                      value,
                      onChange,
                  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full border border-neutral-300 px-4 py-3 text-left text-[11px] tracking-[0.1em] uppercase text-neutral-600 flex items-center justify-between hover:border-neutral-700 transition-colors cursor-pointer"
            >
                <span>{value || label}</span>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
            </button>
            {open && (
                <div
                    className="absolute left-0 right-0 top-full z-30 bg-white border border-t-0 border-neutral-300 shadow-lg">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-[11px] tracking-[0.1em] uppercase hover:bg-neutral-50 transition-colors cursor-pointer ${
                                value === opt ? "font-semibold text-neutral-900" : "text-neutral-600"
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Main Product Page ──────────────────────────────────────── */
export default function ProductPage() {
    const params = useParams();
    const id = params?.id as string;
    const product = getProductById(id);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [qty, setQty] = useState(1);
    const [activeImg, setActiveImg] = useState(0);
    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    const [cartOpen, setCartOpen] = useState(false)
    // Mobile swipe
    const touchStartX = useRef<number | null>(null);

    // Sticky sidebar refs
    const imageColRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!product) return;

        const handleScroll = () => {
            if (!imageColRef.current || !sidebarRef.current) return;
            const imageRect = imageColRef.current.getBoundingClientRect();
            const sidebar = sidebarRef.current;
            const sidebarHeight = sidebar.offsetHeight;
            const imageBottom = imageColRef.current.offsetTop + imageColRef.current.offsetHeight;
            const scrollTop = window.scrollY;
            const navHeight = 64;

            if (scrollTop + navHeight + sidebarHeight >= imageBottom) {
                // Pin to bottom of image column
                sidebar.style.position = "absolute";
                sidebar.style.top = `${imageColRef.current.offsetHeight - sidebarHeight}px`;
                sidebar.style.bottom = "auto";
            } else {
                sidebar.style.position = "sticky";
                sidebar.style.top = `${navHeight + 20}px`;
                sidebar.style.bottom = "auto";
            }
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[13px] tracking-[0.1em] uppercase text-neutral-500 mb-4">Product not found</p>
                    <Link href="/en" className="text-[11px] tracking-[0.14em] uppercase underline">
                        Back to home
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedColor) {
            setError("Please select a color");
            return;
        }
        if (!selectedSize) {
            setError("Please select a size");
            return;
        }
        setError("");

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor,
            size: selectedSize,
            image: product.images[0],
        });

        setAdded(true);
        setCartOpen(true)
        setTimeout(() => setAdded(false), 2000);
    };

    const prevImg = () => setActiveImg((i) => Math.max(i - 1, 0));
    const nextImg = () => setActiveImg((i) => Math.min(i + 1, product.images.length - 1));

    return (
        <div className="pt-16">
            {/* Breadcrumb */}
            <div className="px-5 md:px-10 py-3 text-[10px] tracking-[0.12em] uppercase text-neutral-400">
                <Link href="/en" className="hover:text-neutral-700 transition-colors">Home</Link>
                {" / "}
                <Link href="#" className="hover:text-neutral-700 transition-colors">Women</Link>
                {" / "}
                <span className="text-neutral-700">{product.name}</span>
            </div>
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
            {/* Main content */}
            <div className="px-5 md:px-10 pb-20">
                <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">

                    {/* ── LEFT: Image Gallery ── */}
                    <div ref={imageColRef} className="w-full md:w-[58%] relative">

                        {/* Mobile: single image + swipe */}
                        <div
                            className="md:hidden relative aspect-[3/4] bg-[#f4f3f1] overflow-hidden"
                            onTouchStart={(e) => {
                                touchStartX.current = e.touches[0].clientX;
                            }}
                            onTouchEnd={(e) => {
                                if (touchStartX.current === null) return;
                                const diff = touchStartX.current - e.changedTouches[0].clientX;
                                if (Math.abs(diff) > 40) {
                                    diff > 0 ? nextImg() : prevImg();
                                }
                                touchStartX.current = null;
                            }}
                        >
                            {product.images.map((src, i) => (
                                <Image
                                    key={i}
                                    src={src}
                                    alt={`${product.name} ${i + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                                        i === activeImg ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            ))}
                            {/* Mobile arrows */}
                            <button onClick={prevImg} disabled={activeImg === 0}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-30">
                                <ChevronLeft size={16} strokeWidth={1.5}/>
                            </button>
                            <button onClick={nextImg} disabled={activeImg === product.images.length - 1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-30">
                                <ChevronRight size={16} strokeWidth={1.5}/>
                            </button>
                            {/* Dots */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {product.images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? "bg-neutral-900 scale-125" : "bg-neutral-400"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop: 2-column masonry-ish grid */}
                        <div className="hidden md:grid grid-cols-2 gap-2">
                            {product.images.map((src, i) => (
                                <div
                                    key={i}
                                    className={`bg-[#f4f3f1] overflow-hidden cursor-pointer aspect-[3/4]`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <Image
                                        src={src}
                                        alt={`${product.name} ${i + 1}`}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                                            activeImg === i ? "ring-1 ring-neutral-400" : ""
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Sidebar ── */}
                    <div className="w-full md:w-[42%] md:relative">
                        <div
                            ref={sidebarRef}
                            className="md:sticky"
                            style={{top: "84px"}}
                        >
                            {/* Product info */}
                            <div className="mb-6">
                                <h1 className="text-[18px] md:text-[22px] font-normal uppercase tracking-[0.06em] leading-snug mb-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-[15px] text-neutral-900">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-[13px] text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                                    )}
                                </div>
                            </div>

                            {/* Color selector */}
                            <div className="mb-4">
                                <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-500 mb-2">
                                    Color{selectedColor &&
                                    <span className="text-neutral-900 ml-1">— {selectedColor}</span>}
                                </p>
                                <Dropdown
                                    label="Choose an option"
                                    options={product.colors}
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                />
                            </div>

                            {/* Size selector */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-500">
                                        Size{selectedSize &&
                                        <span className="text-neutral-900 ml-1">— {selectedSize}</span>}
                                    </p>
                                    <button
                                        className="text-[10px] tracking-[0.1em] uppercase underline text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
                                        Size &amp; Fit Guide
                                    </button>
                                </div>
                                <Dropdown
                                    label="Choose an option"
                                    options={product.sizes}
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                />
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center border border-neutral-300">
                                    <button
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        <Minus size={12} strokeWidth={1.5}/>
                                    </button>
                                    <span className="w-8 text-center text-[12px]">{qty}</span>
                                    <button
                                        onClick={() => setQty((q) => q + 1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        <Plus size={12} strokeWidth={1.5}/>
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-[11px] text-red-500 tracking-[0.08em] mb-3">{error}</p>
                            )}

                            {/* Add to cart */}
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-200 cursor-pointer ${
                                    added
                                        ? "bg-neutral-700 text-white"
                                        : "bg-black text-white hover:bg-neutral-700"
                                }`}
                            >
                                {added ? "✓ Added to Cart" : "Add to Cart"}
                            </button>

                            {/* Wishlist */}
                            <button
                                className="w-full mt-2 py-3 text-[10px] tracking-[0.16em] uppercase border border-neutral-300 hover:border-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="1.5">
                                    <path
                                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                                Add to Wishlist
                            </button>

                            {/* Accordions */}
                            <div className="mt-6">
                                <Accordion title="Description">
                                    <p>{product.description}</p>
                                </Accordion>
                                <Accordion title="Product Details">
                                    <ul className="flex flex-col gap-1">
                                        {product.details.map((d, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span
                                                    className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 flex-shrink-0"/>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion>
                                <Accordion title="Delivery and Returns">
                                    <p>{product.delivery}</p>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── YOU MIGHT ALSO LIKE ── */}
            <YouMightAlsoLike currentId={product.id}/>
        </div>
    );
}

/* ─── You Might Also Like ────────────────────────────────────── */
import {products} from "@/lib/products";
import Image from "next/image";
import CartDrawer from "@/components/UI/CartDrawer";

function YouMightAlsoLike({currentId}: { currentId: string }) {
    const related = products.filter((p) => p.id !== currentId).slice(0, 4);
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="px-5 md:px-10 py-16 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[18px] md:text-[22px] font-normal uppercase tracking-[0.04em]">
                    You Might Also Like
                </h2>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => {
                            if (scrollRef.current) scrollRef.current.scrollBy({left: -320, behavior: "smooth"});
                        }}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={14} strokeWidth={1.5}/>
                    </button>
                    <button
                        onClick={() => {
                            if (scrollRef.current) scrollRef.current.scrollBy({left: 320, behavior: "smooth"});
                        }}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                        <ChevronRight size={14} strokeWidth={1.5}/>
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4"
                style={{scrollbarWidth: "none"}}
            >
                {related.map((p) => (
                    <Link
                        key={p.id}
                        href={`/en/product/${p.id}`}
                        className="flex-shrink-0 w-[65vw] md:w-auto snap-start group"
                    >
                        <div className="aspect-[3/4] bg-[#f4f3f1] overflow-hidden mb-3 relative">
                            {p.isNew && (
                                <span
                                    className="absolute top-2 right-2 text-[9px] tracking-[0.15em] uppercase bg-white px-2 py-0.5 z-10">
                  New!
                </span>
                            )}
                            <Image
                                src={p.images[0]}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-[11px] tracking-[0.06em] uppercase font-normal">{p.name}</h3>
                        <p className="text-[11px] text-neutral-600 mt-0.5">${p.price}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
