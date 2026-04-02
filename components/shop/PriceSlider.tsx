"use client";

import React, { useRef, useCallback } from "react";

interface PriceSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}

export default function PriceSlider({
  min,
  max,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
}: PriceSliderProps) {
  const range = max - min;
  const leftPct = ((minVal - min) / range) * 100;
  const rightPct = ((maxVal - min) / range) * 100;

  const trackRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(min + pct * range);
    },
    [min, range]
  );

  /* ── Drag logic for min thumb ── */
  const startDragMin = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const move = (ev: MouseEvent | TouchEvent) => {
        const clientX =
          "touches" in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
        const val = getValueFromPosition(clientX);
        onMinChange(Math.min(val, maxVal - 10));
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchend", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("mouseup", up);
      window.addEventListener("touchend", up);
    },
    [getValueFromPosition, maxVal, onMinChange]
  );

  /* ── Drag logic for max thumb ── */
  const startDragMax = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const move = (ev: MouseEvent | TouchEvent) => {
        const clientX =
          "touches" in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
        const val = getValueFromPosition(clientX);
        onMaxChange(Math.max(val, minVal + 10));
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchend", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("mouseup", up);
      window.addEventListener("touchend", up);
    },
    [getValueFromPosition, minVal, onMaxChange]
  );

  return (
    <div className="px-2 pb-3 pt-1" onMouseDown={(e) => e.stopPropagation()}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-[3px] bg-neutral-200 rounded-full mx-1 my-4"
      >
        {/* Active range */}
        <div
          className="absolute h-full bg-black rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />

        {/* Min thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-900 rounded-full cursor-grab active:cursor-grabbing shadow-sm"
          style={{ left: `calc(${leftPct}% - 8px)` }}
          onMouseDown={startDragMin}
          onTouchStart={startDragMin}
        />

        {/* Max thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-900 rounded-full cursor-grab active:cursor-grabbing shadow-sm"
          style={{ left: `calc(${rightPct}% - 8px)` }}
          onMouseDown={startDragMax}
          onTouchStart={startDragMax}
        />
      </div>

      <p className="text-[11px] text-neutral-600 tracking-[0.06em] mt-3">
        ${minVal}.00 – ${maxVal}.00
      </p>
    </div>
  );
}
