// src/lib/idea-generator.ts
import Groq from "groq-sdk";
import type { SkillLevel, IdeaDto, IdeaDifficulty } from "@/types/ideas";

const groq = new Groq({
  apiKey: process.env.SHUFFL_GROQ_KEY,
});

if (!process.env.SHUFFL_GROQ_KEY) {
  // Fail fast on the server if key is missing
  // (You'll see this in your terminal)
  console.warn(
    "[idea-generator] SHUFFL_GROQ_KEY is not set. /api/generate-ideas will fail until you configure it."
  );
}

type RawIdea = {
  title: string;
  niche: string;
  problem: string;
  solution: string;
  difficulty?: IdeaDifficulty;
  tech_focus?: string;
};

type GroqIdeasResponse = {
  ideas: RawIdea[];
};

function skillLabel(skill: SkillLevel): string {
  switch (skill) {
    case "total-beginner":
      return "total beginner";
    case "comfortable-crud":
      return "comfortable with CRUD apps";
    case "beginner":
    default:
      return "beginner";
  }
}

/**
 * Call Groq to generate exactly 3 idea objects.
 * Each call returns fresh ideas; reshuffle = call again.
 */
export async function generateGroqIdeas(options: {
  interests: string;
  skillLevel: SkillLevel;
  stack: string;
  previousTitles?: string[];
  count?: number; // default: 3
}): Promise<Omit<IdeaDto, "id">[]> {
  const {
    interests,
    skillLevel,
    stack,
    previousTitles = [],
    count = 3,
  } = options;

  if (!process.env.SHUFFL_GROQ_KEY) {
    throw new Error("SHUFFL_GROQ_KEY is not set in the environment");
  }

  const interestsText = interests.trim() || "general developer life";
  const stackText = stack.trim() || "a modern web stack";
  const skillText = skillLabel(skillLevel);

  const systemPrompt = `
You are an API that generates tiny, meaningful one-day software project ideas for beginner developers.

You MUST respond ONLY with valid JSON that matches this TypeScript type:

{
  "ideas": {
    "title": string;
    "niche": string;
    "problem": string;
    "solution": string;
    "difficulty": "easy" | "medium" | "hard";
    "tech_focus": string;
  }[];
}

Requirements:
- "ideas" MUST be an array of EXACTLY ${count} items.
- Each idea MUST be buildable in 4–8 hours by a beginner.
- Focus on real, specific problems and narrow niches.
- NO generic weather apps, todo apps, calculator apps, or clones of standard tutorial apps.
- "difficulty" should roughly reflect the complexity (easy/medium/hard) for a beginner.
- "tech_focus" should say what the dev will practice (e.g. "forms + validation", "simple CRUD + auth", "basic animations + state management").
- Do NOT include any extra keys or top-level fields.
`;

  const userPrompt = `
Generate ${count} distinct one-day project ideas.

Context:
- Domain / interests: ${interestsText}
- Skill level: ${skillText}
- Tech stack: ${stackText}

Avoid overlapping with these previous titles (if any):
${previousTitles.length ? previousTitles.join(", ") : "None"}

Remember:
- Each idea must have: title, niche, problem, solution, difficulty, tech_focus.
- Ideas must be scoped to be realistically buildable in one day.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" }, // JSON mode
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned no content");
  }

  let parsed: GroqIdeasResponse;
  try {
    parsed = JSON.parse(content) as GroqIdeasResponse;
  } catch (err) {
    console.error("[generateGroqIdeas] Failed to parse JSON:", content);
    throw new Error("Failed to parse Groq JSON response");
  }

  if (!parsed.ideas || !Array.isArray(parsed.ideas)) {
    throw new Error("Groq JSON did not contain an 'ideas' array");
  }

  // Normalize into our DTO shape (without id – DB will give us ids)
  const normalized: Omit<IdeaDto, "id">[] = parsed.ideas.map((idea, index) => ({
    title: idea.title ?? `Untitled idea #${index + 1}`,
    niche: idea.niche ?? interestsText,
    problem: idea.problem ?? "",
    solution: idea.solution ?? "",
    difficulty: idea.difficulty ?? "easy",
    tech_focus:
      idea.tech_focus ??
      "Core web dev concepts like state, forms, and simple API interactions.",
  }));

  // Enforce exact count just in case
  return normalized.slice(0, count);
}
