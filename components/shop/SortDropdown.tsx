"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SortOption, SORT_OPTIONS } from "./types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-neutral-700 hover:opacity-60 transition-opacity cursor-pointer"
      >
        Sort by:{" "}
        <span className="font-semibold text-neutral-900">{value}</span>
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 shadow-lg z-30 w-52">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-[11px] tracking-[0.08em] hover:bg-neutral-50 transition-colors cursor-pointer ${
                value === opt
                  ? "font-semibold text-neutral-900"
                  : "text-neutral-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
