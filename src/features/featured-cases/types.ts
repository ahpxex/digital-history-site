import type { FeaturedCase as PrismaFeaturedCase } from "@prisma/client";

export type FeaturedCase = PrismaFeaturedCase;
export type FeaturedCaseInput = Omit<FeaturedCase, "id">;
