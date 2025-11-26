import { createTRPCRouter } from "@/server/api/trpc";
import { datasetChartDataRouter } from "./routers/dataset-chart-data";
import { datasetItemsRouter } from "./routers/dataset-items";
import { dynamicNewsRouter } from "./routers/dynamic-news";
import { featuredCasesRouter } from "./routers/featured-cases";
import { papersRouter } from "./routers/papers";
import { partnersRouter } from "./routers/partners";
import { researchToolsRouter } from "./routers/research-tools";

export const appRouter = createTRPCRouter({
  papers: papersRouter,
  featuredCases: featuredCasesRouter,
  researchTools: researchToolsRouter,
  datasetItems: datasetItemsRouter,
  datasetChartData: datasetChartDataRouter,
  dynamicNews: dynamicNewsRouter,
  partners: partnersRouter,
});

export type AppRouter = typeof appRouter;
