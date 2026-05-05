"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import Image from "next/image";
import {HomeDictionary} from "@/lib/dictionary";

interface CardProps {
    product: Product;
    index: number;
    lang:string;
    dict:HomeDictionary['s2'];
}
interface HomeS2Props {
    lang: string;
    dict: HomeDictionary['s2'];
}

const ProductCard: React.FC<CardProps> = ({ product , lang , dict}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                setActiveIndex((prev) => Math.min(prev + 1, product.images.length - 1));
            } else {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
            }
        }
        touchStartX.current = null;
    };

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
    };

    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, product.images.length - 1));
    };

    // When not hovered → show image[0]; when hovered → show image[activeIndex] (starts at 1)
    const displayedImage = isHovered
        ? product.images[activeIndex]
        : product.images[0];
    const hoverImage = product.images[1] ?? product.images[0];

    return (
        <Link href={`/${lang}/shop/${product.id}`} className="group flex flex-col">
            {/* Image container */}
            <div
                className="relative overflow-hidden bg-[#f4f3f1] aspect-[2.5/4] cursor-pointer"
                onMouseEnter={() => {
                    setIsHovered(true);
                    setActiveIndex(1);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setActiveIndex(0);
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Badges */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end">
                    {product.isNew && (
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-white px-2 py-0.5 font-medium">
              New!
            </span>
                    )}
                    {product.isSale && (
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-black text-white px-2 py-0.5 font-medium">
              Sale!
            </span>
                    )}
                </div>



                {/* Default image */}
                {typeof product.images[0] === 'string' ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isHovered ? "opacity-0" : "opacity-100"
                        }`}
                        draggable={false}
                    />
                ) : (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isHovered ? "opacity-0" : "opacity-100"
                        }`}
                        draggable={false}
                    />
                )}

                {/* Hover image (image[activeIndex]) */}
                {typeof (isHovered ? product.images[activeIndex] : hoverImage) === 'string' ? (
                    <img
                        src={isHovered ? product.images[activeIndex] : hoverImage}
                        alt={product.name + " hover"}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        draggable={false}
                    />
                ) : (
                    <Image
                        src={isHovered ? product.images[activeIndex] : hoverImage}
                        alt={product.name + " hover"}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        draggable={false}
                    />
                )}

                {/* Swipe arrows — visible only when hovered */}
                {isHovered && (
                    <>
                        <button
                            onClick={prev}
                            disabled={activeIndex === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 hover:bg-white flex items-center justify-center transition-all disabled:opacity-30"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={14} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={next}
                            disabled={activeIndex === product.images.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 hover:bg-white flex items-center justify-center transition-all disabled:opacity-30"
                            aria-label="Next image"
                        >
                            <ChevronRight size={14} strokeWidth={1.5} />
                        </button>
                    </>
                )}

                {/* Bottom CTA — appears on hover for card with options */}
                {product.sizes.length > 0 && (
                    <div
                        className={`bg-white p-2 absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300 ${
                            isHovered ? "flex" : "hidden"
                        }`}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(`/${lang}/shop/${product.id}`);
                            }}
                            className="w-full bg-white border-black border text-center py-2.5 text-[10px] tracking-[0.18em] uppercase font-medium hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                            Select Options
                        </button>
                    </div>
                )}
            </div>

            {/* Card info */}
            <div className="mt-3 px-0.5">
                <h3 className="text-[12px] tracking-[0.06em] uppercase font-normal text-neutral-900 leading-snug">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    {product.isSale && product.originalPrice ? (
                        <>
              <span className="text-[12px] text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
                            <span className="text-[12px] text-neutral-900">${product.price}</span>
                        </>
                    ) : (
                        <span className="text-[12px] text-neutral-900">${product.price}</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export const HomeS2 = ({lang , dict}:HomeS2Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data.slice(0, 4)); // Show first 4 products
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="w-full px-5 md:px-10 py-16">
                <div className="flex items-center justify-center py-12">
                    <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-400">Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-5 md:px-10 py-16">
            {/* Section header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[22px] md:text-[26px] font-normal uppercase tracking-[0.04em]">
                    Whats New
                </h2>
                <Link
                    href={`/${lang}/shop`}
                    className="relative text-[11px] tracking-[0.14em] uppercase font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.5px] after:w-full after:bg-black after:origin-left after:scale-x-100 hover:after:scale-x-50 after:transition-transform after:duration-300"
                >
                    View All
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} lang={lang} dict={dict} />
                ))}
            </div>
        </section>
    );
};

