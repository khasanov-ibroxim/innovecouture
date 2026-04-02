"use client";

import { useState, useMemo, useCallback } from "react";
import { products as allProducts } from "@/lib/products";
import {
  Filters,
  SortOption,
  DEFAULT_FILTERS,
  PRICE_MIN_LIMIT,
  PRICE_MAX_LIMIT,
} from "./types";

export function useShopFilters() {
  const [sort, setSort] = useState<SortOption>("Popularity");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const toggleArray = useCallback(
    (
      key: keyof Pick<Filters, "productType" | "sizes" | "colors" | "brands">,
      val: string
    ) => {
      setFilters((prev) => {
        const arr = prev[key];
        return {
          ...prev,
          [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
        };
      });
    },
    []
  );

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setMin = useCallback((v: number) => {
    setFilters((prev) => ({ ...prev, priceMin: v }));
  }, []);

  const setMax = useCallback((v: number) => {
    setFilters((prev) => ({ ...prev, priceMax: v }));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Price
    list = list.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Size
    if (filters.sizes.length > 0) {
      list = list.filter((p) => filters.sizes.some((s) => p.sizes.includes(s)));
    }

    // Color
    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        filters.colors.some((c) => p.colors.includes(c))
      );
    }

    // Product Type
    if (filters.productType.length > 0) {
      list = list.filter((p) =>
        filters.productType.some((t) =>
          p.name.toLowerCase().includes(t.toLowerCase())
        )
      );
    }

    // Sort
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    else if (sort === "Newest")
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [filters, sort]);

  const activeTags: { label: string; remove: () => void }[] = [
    ...filters.productType.map((v) => ({
      label: v,
      remove: () => toggleArray("productType", v),
    })),
    ...filters.sizes.map((v) => ({
      label: `Size: ${v}`,
      remove: () => toggleArray("sizes", v),
    })),
    ...filters.colors.map((v) => ({
      label: v,
      remove: () => toggleArray("colors", v),
    })),
    ...filters.brands.map((v) => ({
      label: v,
      remove: () => toggleArray("brands", v),
    })),
    ...(filters.priceMin !== PRICE_MIN_LIMIT ||
    filters.priceMax !== PRICE_MAX_LIMIT
      ? [
          {
            label: `$${filters.priceMin}–$${filters.priceMax}`,
            remove: () => {
              setFilters((p) => ({
                ...p,
                priceMin: PRICE_MIN_LIMIT,
                priceMax: PRICE_MAX_LIMIT,
              }));
            },
          },
        ]
      : []),
  ];

  return {
    sort,
    setSort,
    filters,
    toggleArray,
    setMin,
    setMax,
    clearAll,
    filteredProducts,
    activeTags,
  };
}
