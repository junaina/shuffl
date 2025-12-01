"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb } from "lucide-react";
import type { IdeaDto } from "@/types/ideas";
import { cn } from "@/lib/utils";

interface IdeaCardProps {
  idea: IdeaDto;
  index: number;
}

export function IdeaCard({ idea, index }: IdeaCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => setFlipped((f) => !f);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 16,
        delay: index * 0.07,
      }}
      className="relative flex-1"
      style={{ perspective: 1200 }}
    >
      <motion.div
        onClick={handleToggle}
        whileHover={{ y: -6 }}
        className={cn(
          "relative h-80 cursor-pointer rounded-3xl border border-border/70 bg-gradient-to-br from-background via-background to-muted shadow-xl shadow-black/10",
          "transition-shadow duration-300",
          flipped
            ? "shadow-[0_0_45px_rgba(250,204,21,0.45)]"
            : "hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        )}
        animate={{
          rotateY: flipped ? 180 : 0,
          scale: flipped ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Idea {index + 1}
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Click to reveal a tiny, one-day build picked just for you.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Lightbulb className="h-3.5 w-3.5" />
            Click to reveal your idea
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-primary/10 via-background to-muted px-5 py-4 text-left",
            "border border-primary/40"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-primary">
              <span>Niche</span>
              <span>Idea {index + 1}</span>
            </div>
            <p className="text-xs text-muted-foreground">{idea.niche}</p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold">{idea.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {idea.problem}
              </p>
            </div>
            <div>
              <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                One-day solution
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {idea.solution}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[0.7rem] text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              {idea.difficulty && (
                <span className="rounded-full bg-background/60 px-2 py-0.5">
                  {idea.difficulty}
                </span>
              )}
              {idea.tech_focus && (
                <span className="rounded-full bg-background/60 px-2 py-0.5">
                  {idea.tech_focus}
                </span>
              )}
            </div>
            <span className="text-[0.68rem] uppercase tracking-[0.2em]">
              Shuffl
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
