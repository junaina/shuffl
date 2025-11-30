-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('TOTAL_BEGINNER', 'BEGINNER', 'COMFORTABLE_CRUD');

-- CreateEnum
CREATE TYPE "IdeaDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "IdeaGeneration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interests" TEXT NOT NULL,
    "skillLevel" "SkillLevel" NOT NULL,
    "stack" TEXT NOT NULL,
    "clientToken" TEXT,

    CONSTRAINT "IdeaGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "difficulty" "IdeaDifficulty",
    "techFocus" TEXT,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "IdeaGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
