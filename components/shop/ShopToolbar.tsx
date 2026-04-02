"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import SortDropdown from "./SortDropdown";
import { SortOption } from "./types";

interface ShopToolbarProps {
  totalCount: number;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  activeTagsCount: number;
  onMobileFilterOpen: () => void;
}

export default function ShopToolbar({
  totalCount,
  sort,
  onSortChange,
  activeTagsCount,
  onMobileFilterOpen,
}: ShopToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Mobile filter toggle */}
        <button
          onClick={onMobileFilterOpen}
          className="flex md:hidden items-center gap-2 border border-neutral-300 px-3 py-2 text-[10px] tracking-[0.12em] uppercase hover:border-neutral-700 transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          Filters
          {activeTagsCount > 0 && (
            <span className="bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {activeTagsCount}
            </span>
          )}
        </button>

        <p className="text-[11px] text-neutral-500 tracking-[0.06em]">
          Showing 1–{totalCount} of {totalCount} results
        </p>
      </div>

      <SortDropdown value={sort} onChange={onSortChange} />
    </div>
  );
}
