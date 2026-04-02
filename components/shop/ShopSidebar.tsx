"use client";

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import CheckItem from "./CheckItem";
import PriceSlider from "./PriceSlider";
import { Filters, PRODUCT_TYPES, SIZES, COLORS, BRANDS, PRICE_MIN_LIMIT, PRICE_MAX_LIMIT } from "./types";

interface ShopSidebarProps {
  filters: Filters;
  onToggleArray: (
    key: keyof Pick<Filters, "productType" | "sizes" | "colors" | "brands">,
    val: string
  ) => void;
  onPriceMin: (v: number) => void;
  onPriceMax: (v: number) => void;
  onClearAll: () => void;
  activeTags: { label: string; remove: () => void }[];
}

export default function ShopSidebar({
  filters,
  onToggleArray,
  onPriceMin,
  onPriceMax,
  onClearAll,
  activeTags,
}: ShopSidebarProps) {
  const [activeKey, setActiveKey] = useState<string | null>("productType");

  const handleToggle = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex flex-col">
      {/* Clear All */}
      {activeTags.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-left text-[11px] tracking-[0.12em] uppercase underline underline-offset-4 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer pb-4 border-b border-neutral-200"
        >
          Clear All
        </button>
      )}

      <FilterSection
        title="Product Type"
        openKey="productType"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        <div className="flex flex-col">
          {PRODUCT_TYPES.map((t) => (
            <CheckItem
              key={t}
              label={t}
              checked={filters.productType.includes(t)}
              onChange={() => onToggleArray("productType", t)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Size"
        openKey="sizes"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        <div className="flex flex-wrap gap-2 pt-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onToggleArray("sizes", s)}
              className={`w-9 h-9 text-[10px] tracking-[0.1em] uppercase border transition-colors cursor-pointer ${
                filters.sizes.includes(s)
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-300 text-neutral-700 hover:border-neutral-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Color"
        openKey="colors"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        <div className="flex flex-col">
          {COLORS.map((c) => (
            <CheckItem
              key={c}
              label={c}
              checked={filters.colors.includes(c)}
              onChange={() => onToggleArray("colors", c)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Brand"
        openKey="brands"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        <div className="flex flex-col">
          {BRANDS.map((b) => (
            <CheckItem
              key={b}
              label={b}
              checked={filters.brands.includes(b)}
              onChange={() => onToggleArray("brands", b)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Price"
        openKey="price"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        <PriceSlider
          min={PRICE_MIN_LIMIT}
          max={PRICE_MAX_LIMIT}
          minVal={filters.priceMin}
          maxVal={filters.priceMax}
          onMinChange={onPriceMin}
          onMaxChange={onPriceMax}
        />
      </FilterSection>
    </div>
  );
}
