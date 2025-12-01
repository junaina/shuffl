"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoHeaderProps {
  compact?: boolean;
}

export function LogoHeader({ compact }: LogoHeaderProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className={cn(
        "flex flex-col items-center text-center",
        compact ? "gap-1" : "gap-3"
      )}
    >
      {!compact && (
        <motion.div
          layout
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Tiny one-day builds for devs
        </motion.div>
      )}

      <motion.h1
        layout
        className={cn(
          "font-semibold tracking-tight",
          compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
        )}
      >
        Shuffl
      </motion.h1>

      {!compact && (
        <motion.p
          layout
          className="max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          Skip the weather app. Get small, meaningful project ideas you can
          build in a day.
        </motion.p>
      )}
    </motion.div>
  );
}
