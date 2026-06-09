"use client";

import React, { useState } from "react";
import Link from "next/link";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ActiveFilterTags from "@/components/shop/ActiveFilterTags";
import ProductGrid from "@/components/shop/ProductGrid";
import MobileFilterDrawer from "@/components/shop/MobileFilterDrawer";
import { useShopFilters } from "@/components/shop/useShopFilters";
import { ShopDictionary } from "@/lib/dictionary";

interface ShopClientProps {
  lang: string;
  dict: ShopDictionary;
}

export default function ShopClient({ lang, dict }: ShopClientProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    sort,
    setSort,
    filters,
    toggleArray,
    setMin,
    setMax,
    clearAll,
    filteredProducts,
    activeTags,
    loading,
  } = useShopFilters(lang);

  return (
    <div className="min-h-screen bg-white py-18">
      {/* Breadcrumb */}
      <div className="px-5 md:px-10 pt-6 pb-2 text-[10px] tracking-[0.12em] uppercase text-neutral-400">
        <Link href={`/${lang}`} className="hover:text-neutral-700 transition-colors">
          {dict.breadcrumb.home}
        </Link>
        {" / "}
        <span className="text-neutral-700">{dict.breadcrumb.shop}</span>
      </div>

      {/* Page title */}
      <div className="px-5 md:px-10 pb-6 border-b border-neutral-200">
        <h1 className="text-[32px] md:text-[38px] font-normal uppercase tracking-[0.04em]">
          {dict.title}
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-400">{dict.loading}</p>
        </div>
      ) : (
        <>
          {/* Body: sidebar + content */}
          <div className="flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-[260px] flex-shrink-0 border-r border-neutral-200 px-6 pt-6 pb-20">
              <ShopSidebar
                filters={filters}
                onToggleArray={toggleArray}
                onPriceMin={setMin}
                onPriceMax={setMax}
                onClearAll={clearAll}
                activeTags={activeTags}
                lang={lang}
                dict={dict}
              />
            </aside>

            {/* Main content */}
            <div className="flex-1 px-5 md:px-8 py-6">
              <ShopToolbar
                totalCount={filteredProducts.length}
                sort={sort}
                onSortChange={setSort}
                activeTagsCount={activeTags.length}
                onMobileFilterOpen={() => setMobileFiltersOpen(true)}
                dict={dict}
              />

              <ActiveFilterTags tags={activeTags} onClearAll={clearAll} />

              <ProductGrid
                products={filteredProducts}
                onClearAll={clearAll}
                lang={lang}
                dict={dict}
              />
            </div>
          </div>

          {/* Mobile filter drawer */}
          <MobileFilterDrawer
            open={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            filters={filters}
            onToggleArray={toggleArray}
            onPriceMin={setMin}
            onPriceMax={setMax}
            onClearAll={clearAll}
            activeTags={activeTags}
            resultCount={filteredProducts.length}
            lang={lang}
            dict={dict}
          />
        </>
      )}
    </div>
  );
}
