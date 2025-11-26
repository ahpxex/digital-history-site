import type { DatasetItem as PrismaDatasetItem } from "@prisma/client";

export type DatasetItem = PrismaDatasetItem;
export type DatasetItemInput = Omit<DatasetItem, "id">;
