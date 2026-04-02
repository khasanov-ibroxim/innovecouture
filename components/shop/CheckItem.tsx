"use client";

import React from "react";

interface CheckItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function CheckItem({ label, checked, onChange }: CheckItemProps) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group select-none">
      <div
        onClick={onChange}
        className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
          checked
            ? "bg-neutral-900 border-neutral-900"
            : "border-neutral-300 group-hover:border-neutral-600"
        }`}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <span
        onClick={onChange}
        className="text-[11px] tracking-[0.06em] text-neutral-700 group-hover:text-neutral-900 transition-colors"
      >
        {label}
      </span>
    </label>
  );
}
