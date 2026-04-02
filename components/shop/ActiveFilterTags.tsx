"use client";

import React from "react";
import { X } from "lucide-react";

interface Tag {
  label: string;
  remove: () => void;
}

interface ActiveFilterTagsProps {
  tags: Tag[];
  onClearAll: () => void;
}

export default function ActiveFilterTags({ tags, onClearAll }: ActiveFilterTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {tags.map((tag) => (
        <button
          key={tag.label}
          onClick={tag.remove}
          className="flex items-center gap-1.5 border border-neutral-300 px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase text-neutral-700 hover:border-neutral-700 transition-colors cursor-pointer"
        >
          {tag.label}
          <X size={10} strokeWidth={1.5} />
        </button>
      ))}
      {tags.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-[10px] tracking-[0.1em] uppercase underline underline-offset-4 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer px-1"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
