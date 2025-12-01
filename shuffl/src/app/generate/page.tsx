"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogoHeader } from "@/components/logo-header";
import {
  PreferencesForm,
  type PreferencesValues,
} from "@/components/preferences-form";
import { IdeaBoard } from "@/components/idea-board";
import type { IdeaDto, GenerateIdeasResponseBody } from "@/types/ideas";

export default function HomePage() {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reshuffling, setReshuffling] = useState(false);
  const [ideas, setIdeas] = useState<IdeaDto[]>([]);
  const [visibleIdeas, setVisibleIdeas] = useState<IdeaDto[]>([]);
  const [previousTitles, setPreviousTitles] = useState<string[]>([]);
  const [lastPrefs, setLastPrefs] = useState<PreferencesValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callGenerateIdeas = async (prefs: PreferencesValues) => {
    const res = await fetch("/api/generate-ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interests: prefs.interests,
        skillLevel: prefs.skillLevel,
        stack: prefs.stack,
        previousTitles,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to generate ideas:", text);
      throw new Error("Failed to generate ideas");
    }

    const data = (await res.json()) as GenerateIdeasResponseBody;
    return data.ideas;
  };

  const handleGenerate = async (values: PreferencesValues) => {
    try {
      setLoading(true);
      setError(null);

      // New preferences reset the history
      const ideasFromApi = await callGenerateIdeas(values);

      setIdeas(ideasFromApi);
      setVisibleIdeas(ideasFromApi);
      setPreviousTitles(ideasFromApi.map((i) => i.title));
      setLastPrefs(values);
      setHasGenerated(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong talking to the idea oracle. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReshuffle = async () => {
    if (!lastPrefs) return;
    try {
      setReshuffling(true);
      setError(null);

      const newIdeas = await callGenerateIdeas(lastPrefs);

      setIdeas((prev) => [...prev, ...newIdeas]);
      setVisibleIdeas(newIdeas);
      setPreviousTitles((prev) => [...prev, ...newIdeas.map((i) => i.title)]);
    } catch (err) {
      console.error(err);
      setError("Could not reshuffle ideas. Try again in a moment.");
    } finally {
      setReshuffling(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center">
      <motion.div
        layout
        initial={{ y: 40, opacity: 0 }}
        animate={{
          y: hasGenerated ? -40 : 0,
          opacity: 1,
          scale: hasGenerated ? 0.94 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="flex w-full flex-col items-center"
      >
        <LogoHeader compact={hasGenerated} />
        <PreferencesForm
          compact={hasGenerated}
          loading={loading}
          defaultValues={lastPrefs ?? undefined}
          onSubmit={handleGenerate}
        />
      </motion.div>

      {error && (
        <div className="mt-6 w-full max-w-xl rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {hasGenerated && visibleIdeas.length > 0 && (
        <IdeaBoard
          ideas={visibleIdeas}
          onReshuffle={handleReshuffle}
          reshuffling={reshuffling}
        />
      )}
    </div>
  );
}
