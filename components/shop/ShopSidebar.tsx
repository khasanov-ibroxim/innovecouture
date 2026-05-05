"use client";

import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import CheckItem from "./CheckItem";
import PriceSlider from "./PriceSlider";
import { Filters, PRICE_MIN_LIMIT, PRICE_MAX_LIMIT } from "./types";
import { getColors, getSizes, getCategories, getCollections } from "@/lib/products";

interface ShopSidebarProps {
  filters: Filters;
  onToggleArray: (
    key: keyof Pick<Filters, "collections" | "sizes" | "colors" | "categories">,
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
  const [activeKey, setActiveKey] = useState<string | null>("collections");
  const [sizes, setSizes] = useState<Array<{id: number; name: string}>>([]);
  const [colors, setColors] = useState<Array<{id: number; color_code: string}>>([]);
  const [categories, setCategories] = useState<Array<{id: number; name_eng: string}>>([]);
  const [collections, setCollections] = useState<Array<{id: number; name_eng: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilters() {
      try {
        const [sizesData, colorsData, categoriesData, collectionsData] = await Promise.all([
          getSizes(),
          getColors(),
          getCategories(),
          getCollections()
        ]);
        setSizes(sizesData);
        setColors(colorsData);
        setCategories(categoriesData);
        setCollections(collectionsData);
      } catch (error) {
        console.error('Failed to load filters:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFilters();
  }, []);

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
        title="Collection"
        openKey="collections"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        {loading ? (
          <div className="text-[10px] text-neutral-400">Loading...</div>
        ) : (
          <div className="flex flex-col">
            {collections.map((c) => (
              <CheckItem
                key={c.id}
                label={c.name_eng}
                checked={filters.collections.includes(String(c.id))}
                onChange={() => onToggleArray("collections", String(c.id))}
              />
            ))}
          </div>
        )}
      </FilterSection>

      <FilterSection
        title="Size"
        openKey="sizes"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        {loading ? (
          <div className="text-[10px] text-neutral-400">Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {sizes.map((s) => (
              <button
                key={s.id}
                onClick={() => onToggleArray("sizes", s.name)}
                className={`px-3 h-9 text-[10px] tracking-[0.1em] uppercase border transition-colors cursor-pointer ${
                  filters.sizes.includes(s.name)
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-700"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </FilterSection>

      <FilterSection
        title="Color"
        openKey="colors"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        {loading ? (
          <div className="text-[10px] text-neutral-400">Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => onToggleArray("colors", c.color_code)}
                className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                  filters.colors.includes(c.color_code)
                    ? "border-neutral-900 scale-110"
                    : "border-neutral-300 hover:border-neutral-700"
                }`}
                style={{ backgroundColor: c.color_code }}
                title={c.color_code}
              />
            ))}
          </div>
        )}
      </FilterSection>

      <FilterSection
        title="Category"
        openKey="categories"
        activeKey={activeKey}
        onToggle={handleToggle}
      >
        {loading ? (
          <div className="text-[10px] text-neutral-400">Loading...</div>
        ) : (
          <div className="flex flex-col">
            {categories.map((cat) => (
              <CheckItem
                key={cat.id}
                label={cat.name_eng}
                checked={filters.categories.includes(String(cat.id))}
                onChange={() => onToggleArray("categories", String(cat.id))}
              />
            ))}
          </div>
        )}
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
