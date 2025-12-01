// src/types/ideas.ts

export type SkillLevel = "total-beginner" | "beginner" | "comfortable-crud";

export type IdeaDifficulty = "easy" | "medium" | "hard";

export type IdeaDto = {
  id: string;
  title: string;
  niche: string;
  problem: string;
  solution: string;
  difficulty?: IdeaDifficulty;
  tech_focus?: string;
};

export type GenerateIdeasRequestBody = {
  interests: string;
  skillLevel: SkillLevel;
  stack: string;
  previousTitles?: string[];
};

export type GenerateIdeasResponseBody = {
  ideas: IdeaDto[];
};
