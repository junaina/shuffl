// src/lib/idea-mappers.ts
import type {
  SkillLevel as PrismaSkillLevel,
  IdeaDifficulty as PrismaIdeaDifficulty,
} from "@/generated/prisma/client";
import type {
  SkillLevel,
  IdeaDifficulty as IdeaDifficultyDto,
  IdeaDto,
} from "../types/ideas";
import type { Idea } from "@/generated/prisma/client";

// map frontend -> prisma enum
export function toPrismaSkillLevel(skill: SkillLevel): PrismaSkillLevel {
  switch (skill) {
    case "total-beginner":
      return "TOTAL_BEGINNER";
    case "comfortable-crud":
      return "COMFORTABLE_CRUD";
    case "beginner":
    default:
      return "BEGINNER";
  }
}

export function toPrismaDifficulty(
  difficulty: IdeaDifficultyDto | undefined
): PrismaIdeaDifficulty | null {
  if (!difficulty) return null;
  switch (difficulty) {
    case "easy":
      return "EASY";
    case "medium":
      return "MEDIUM";
    case "hard":
      return "HARD";
  }
}

// prisma enum -> dto string
export function fromPrismaDifficulty(
  difficulty: PrismaIdeaDifficulty | null
): IdeaDifficultyDto | undefined {
  if (!difficulty) return undefined;
  switch (difficulty) {
    case "EASY":
      return "easy";
    case "MEDIUM":
      return "medium";
    case "HARD":
      return "hard";
  }
}

// Prisma Idea model -> DTO for frontend
export function toIdeaDto(idea: Idea): IdeaDto {
  return {
    id: idea.id,
    title: idea.title,
    niche: idea.niche,
    problem: idea.problem,
    solution: idea.solution,
    difficulty: fromPrismaDifficulty(idea.difficulty),
    tech_focus: idea.techFocus ?? undefined,
  };
}
