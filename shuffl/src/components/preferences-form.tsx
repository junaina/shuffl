"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PreferencesValues = {
  interests: string;
  skillLevel: "total-beginner" | "beginner" | "comfortable-crud";
  stack: string;
};

interface PreferencesFormProps {
  compact?: boolean;
  loading?: boolean;
  defaultValues?: Partial<PreferencesValues>;
  onSubmit: (values: PreferencesValues) => void;
}

export function PreferencesForm({
  compact,
  loading,
  defaultValues,
  onSubmit,
}: PreferencesFormProps) {
  const [interests, setInterests] = useState(defaultValues?.interests ?? "");
  const [skillLevel, setSkillLevel] = useState<PreferencesValues["skillLevel"]>(
    defaultValues?.skillLevel ?? "total-beginner"
  );
  const [stack, setStack] = useState(
    defaultValues?.stack ?? "Next.js + TypeScript"
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ interests, skillLevel, stack });
  };

  return (
    <motion.div
      layout
      className={cn(
        "w-full max-w-xl",
        compact ? "mt-4 sm:mt-6" : "mt-6 sm:mt-10"
      )}
    >
      <Card className="border-border/60 bg-background/80 shadow-lg shadow-black/5 backdrop-blur">
        <CardContent className="p-4 sm:p-5">
          <form
            className={cn(
              "grid gap-4",
              compact ? "sm:grid-cols-[1.4fr_1fr_1fr_auto] items-end" : ""
            )}
            onSubmit={handleSubmit}
          >
            <div className={compact ? "sm:col-span-2" : ""}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Domain / interests
              </label>
              <Input
                required
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. fitness, music, uni life…"
                className="h-9 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Difficulty
              </label>
              <Select
                value={skillLevel}
                onValueChange={(value) =>
                  setSkillLevel(value as PreferencesValues["skillLevel"])
                }
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total-beginner">Total beginner</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="comfortable-crud">
                    Comfortable with CRUD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={compact ? "hidden sm:block" : ""}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Tech stack
              </label>
              <Input
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="e.g. Next.js + TS, React + Node…"
                className="h-9 text-sm"
              />
            </div>

            <div className={compact ? "mt-0 sm:mt-0" : "mt-1"}>
              <Button
                type="submit"
                size={compact ? "sm" : "default"}
                className="w-full gap-2"
                disabled={loading}
              >
                {loading && (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {loading ? "Generating…" : "Generate ideas"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
