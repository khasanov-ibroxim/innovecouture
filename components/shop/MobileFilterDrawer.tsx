"use client";

import React from "react";
import { X } from "lucide-react";
import ShopSidebar from "./ShopSidebar";
import { Filters } from "./types";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onToggleArray: (
    key: keyof Pick<Filters, "productType" | "sizes" | "colors" | "brands">,
    val: string
  ) => void;
  onPriceMin: (v: number) => void;
  onPriceMax: (v: number) => void;
  onClearAll: () => void;
  activeTags: { label: string; remove: () => void }[];
  resultCount: number;
}

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onToggleArray,
  onPriceMin,
  onPriceMax,
  onClearAll,
  activeTags,
  resultCount,
}: MobileFilterDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[998]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 z-[999] w-[85vw] max-w-[320px] bg-white flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 className="text-[12px] tracking-[0.16em] uppercase font-medium">Filters</h2>
          <button
            onClick={onClose}
            className="text-neutral-700 hover:opacity-40 transition-opacity cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ShopSidebar
            filters={filters}
            onToggleArray={onToggleArray}
            onPriceMin={onPriceMin}
            onPriceMax={onPriceMax}
            onClearAll={onClearAll}
            activeTags={activeTags}
          />
        </div>

        <div className="border-t border-neutral-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3.5 text-[10px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            View {resultCount} Results
          </button>
        </div>
      </div>
    </>
  );
}
