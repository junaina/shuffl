// src/app/api/generate-ideas/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type {
  GenerateIdeasRequestBody,
  GenerateIdeasResponseBody,
} from "@/types/ideas";
import { generateGroqIdeas } from "@/lib/idea-generator";
import {
  toIdeaDto,
  toPrismaDifficulty,
  toPrismaSkillLevel,
} from "@/lib/idea-mappers";

export const runtime = "nodejs"; // make sure we use Node runtime (good for Prisma + Groq)

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateIdeasRequestBody;

    if (!body.interests || !body.skillLevel || !body.stack) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("[/api/generate-ideas] body:", body);

    // 1) Ask Groq for 3 fresh ideas
    const generatedIdeas = await generateGroqIdeas({
      interests: body.interests,
      skillLevel: body.skillLevel,
      stack: body.stack,
      previousTitles: body.previousTitles ?? [],
      count: 3, // <- each hit = 3 ideas
    });

    // 2) Persist generation + ideas into DB
    const skillEnum = toPrismaSkillLevel(body.skillLevel);

    const generation = await prisma.ideaGeneration.create({
      data: {
        interests: body.interests,
        skillLevel: skillEnum,
        stack: body.stack,
        ideas: {
          create: generatedIdeas.map((idea) => ({
            title: idea.title,
            niche: idea.niche,
            problem: idea.problem,
            solution: idea.solution,
            difficulty: toPrismaDifficulty(idea.difficulty),
            techFocus: idea.tech_focus ?? null,
            used: false,
          })),
        },
      },
      include: {
        ideas: true,
      },
    });

    // 3) Map Prisma models -> DTOs for frontend
    const ideasDto = generation.ideas.map((idea) => toIdeaDto(idea));

    const responseBody: GenerateIdeasResponseBody = {
      ideas: ideasDto,
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (err) {
    console.error("[/api/generate-ideas] error:", err);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
