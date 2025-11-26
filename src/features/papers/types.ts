import type { Paper as PrismaPaper } from "@prisma/client";

export type Paper = PrismaPaper;
export type PaperFormInput = Omit<Paper, "id" | "createdAt" | "updatedAt">;
