"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  onClearAll: () => void;
  lang?: string;
}

export default function ProductGrid({ products, onClearAll, lang }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-[13px] tracking-[0.1em] uppercase text-neutral-400 mb-4">
          No products found
        </p>
        <button
          onClick={onClearAll}
          className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4 text-neutral-700 hover:opacity-50 transition-opacity cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} lang={lang} />
      ))}
    </div>
  );
}
