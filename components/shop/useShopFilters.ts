"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { getProducts, getCollections, getCategories } from "@/lib/products";
import type { Product } from "@/lib/products";
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Array<{id: number; name_eng: string}>>([]);
  const [categories, setCategories] = useState<Array<{id: number; name_eng: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [products, collectionsData, categoriesData] = await Promise.all([
          getProducts(),
          getCollections(),
          getCategories()
        ]);
        setAllProducts(products);
        setCollections(collectionsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleArray = useCallback(
    (
      key: keyof Pick<Filters, "collections" | "sizes" | "colors" | "categories">,
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

    // Collection - filter by collection_id
    if (filters.collections.length > 0) {
      list = list.filter((p) =>
        filters.collections.includes(String(p.collection_id))
      );
    }

    // Category - filter by category_id
    if (filters.categories.length > 0) {
      list = list.filter((p) =>
        filters.categories.includes(String(p.category_id))
      );
    }

    // Sort
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    else if (sort === "Newest")
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [allProducts, filters, sort]);

  const activeTags: { label: string; remove: () => void }[] = [
    ...filters.collections.map((id) => {
      const collection = collections.find(c => String(c.id) === id);
      return {
        label: collection?.name_eng || id,
        remove: () => toggleArray("collections", id),
      };
    }),
    ...filters.sizes.map((v) => ({
      label: `Size: ${v}`,
      remove: () => toggleArray("sizes", v),
    })),
    ...filters.colors.map((v) => ({
      label: v,
      remove: () => toggleArray("colors", v),
    })),
    ...filters.categories.map((id) => {
      const category = categories.find(c => String(c.id) === id);
      return {
        label: category?.name_eng || id,
        remove: () => toggleArray("categories", id),
      };
    }),
    ...(filters.priceMin !== PRICE_MIN_LIMIT ||
    filters.priceMax !== PRICE_MAX_LIMIT
      ? [
          {
            label: `${filters.priceMin.toLocaleString()}–${filters.priceMax.toLocaleString()} UZS`,
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
    loading,
  };
}
