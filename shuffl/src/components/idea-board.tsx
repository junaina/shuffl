"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { IdeaDto } from "@/types/ideas";
import { IdeaCard } from "./idea-card";
import { Button } from "@/components/ui/button";

interface IdeaBoardProps {
  ideas: IdeaDto[];
  onReshuffle: () => void;
  reshuffling?: boolean;
}

export function IdeaBoard({ ideas, onReshuffle, reshuffling }: IdeaBoardProps) {
  return (
    <motion.div
      layout
      className="mt-10 flex flex-col items-center gap-6 sm:mt-12"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={ideas.map((i) => i.id).join("-")}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="grid w-full max-w-5xl gap-4 sm:grid-cols-3"
        >
          {ideas.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={onReshuffle}
        disabled={reshuffling}
        className="inline-flex items-center gap-2 border-dashed"
      >
        {reshuffling && (
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        Reshuffle ideas
      </Button>

      <p className="max-w-lg text-center text-xs text-muted-foreground">
        Not vibing with these? Shuffle again to draw three new cards. We&apos;ll
        ask the LLM for fresh ideas each time.
      </p>
    </motion.div>
  );
}
