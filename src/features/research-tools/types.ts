import type { ResearchTool as PrismaResearchTool } from "@prisma/client";

export type ResearchTool = PrismaResearchTool;
export type ResearchToolInput = Omit<ResearchTool, "id">;
