import type { DynamicNews as PrismaDynamicNews } from "@prisma/client";

export type DynamicNews = PrismaDynamicNews;
export type DynamicNewsInput = Omit<DynamicNews, "id">;
