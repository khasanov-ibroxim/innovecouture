"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  openKey: string;
  activeKey: string | null;
  onToggle: (key: string) => void;
}

export default function FilterSection({
  title,
  children,
  defaultOpen = false,
  openKey,
  activeKey,
  onToggle,
}: FilterSectionProps) {
  const isOpen = activeKey === openKey;

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => onToggle(openKey)}
        className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.14em] uppercase font-medium text-neutral-900 hover:opacity-60 transition-opacity cursor-pointer"
      >
        {title}
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}
