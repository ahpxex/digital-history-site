import type { DatasetChartData as PrismaDatasetChartData } from "@prisma/client";

export type DatasetChartData = PrismaDatasetChartData;
export type DatasetChartDataInput = Omit<DatasetChartData, "id">;
