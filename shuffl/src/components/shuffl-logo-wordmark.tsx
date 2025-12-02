"use client";

import { shufflScript } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface ShufflLogoWordmarkProps {
  className?: string;
}

export function ShufflLogoWordmark({ className }: ShufflLogoWordmarkProps) {
  return (
    <div
      className={cn(
        "relative inline-block overflow-visible", // make sure nothing is clipped
        className
      )}
    >
      {/* Shadow / back layer */}
      <span
        className={cn(
          shufflScript.className,
          "pointer-events-none select-none",
          // extra padding so tails / shadows have room
          "absolute inset-0 translate-x-[3px] translate-y-[4px] px-8 py-3",
          "text-5xl sm:text-6xl lg:text-9xl",
          "text-[#ff9100]",
          "tracking-[0.059em]" // tiny spacing between letters
        )}
        style={{
          textShadow: "0 3px 0 rgba(0,0,0,0.35), 0 9px 10px rgba(0,0,0,0.35)",
        }}
      >
        shuffl.
      </span>

      {/* Front / main layer */}
      <span
        className={cn(
          shufflScript.className,
          "relative inline-block px-8 py-3",
          "text-5xl sm:text-6xl lg:text-9xl",
          "bg-gradient-to-r from-[#FF4B8B] via-[#FF9F1C] to-[#FFD166] bg-clip-text text-transparent",
          "tracking-[0.059em]" // keep spacing in sync with shadow
        )}
        style={{
          transform: "skewX(-2deg)",
          textShadow: "0 1px 0 rgba(0,0,0,0.25), 0 5px 12px rgba(0,0,0,0.45)",
          backgroundImage:
            "linear-gradient(90deg, #FF4B8B 25%, #FF9F1C 50%, #FFD166 75%)",
        }}
      >
        shuffl.
      </span>
    </div>
  );
}
