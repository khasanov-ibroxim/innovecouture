"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  lang?: string;
}

export default function ProductCard({ product, lang = "en" }: ProductCardProps) {
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
      diff > 0
        ? setActiveIndex((p) => Math.min(p + 1, product.images.length - 1))
        : setActiveIndex((p) => Math.max(p - 1, 0));
    }
    touchStartX.current = null;
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((i) => Math.max(i - 1, 0));
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((i) => Math.min(i + 1, product.images.length - 1));
  };

  const hoverImage = product.images[1] ?? product.images[0];

  return (
    <Link href={`/${lang}/shop/${product.id}`} className="group flex flex-col">
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
        <Image
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />

        {/* Hover image */}
        <Image
          src={isHovered ? product.images[activeIndex] : hoverImage}
          alt={`${product.name} hover`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />

        {/* Arrow controls */}
        {isHovered && (
          <>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 hover:bg-white flex items-center justify-center transition-all disabled:opacity-30"
            >
              <ChevronLeft size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex === product.images.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 hover:bg-white flex items-center justify-center transition-all disabled:opacity-30"
            >
              <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Select Options CTA */}
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

      {/* Info */}
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
}
