"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { ShufflLogoWordmark } from "@/components/shuffl-logo-wordmark";
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
      <motion.div layout>
        <ShufflLogoWordmark className={compact ? "scale-90" : "scale-100"} />
      </motion.div>

      {!compact && (
        <motion.p
          layout
          className="max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          coding project ideas for noobs who wanna ditch the weather app.
        </motion.p>
      )}
    </motion.div>
  );
}
