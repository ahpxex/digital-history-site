import { registerResource } from "@/infra/refine";
import {
  DATASET_CHART_DATA_RESOURCE,
  datasetChartDataHandlers,
} from "./dataset-chart-data";
import { DATASET_ITEMS_RESOURCE, datasetItemsHandlers } from "./dataset-items";
import { DYNAMIC_NEWS_RESOURCE, dynamicNewsHandlers } from "./dynamic-news";
import {
  FEATURED_CASES_RESOURCE,
  featuredCasesHandlers,
} from "./featured-cases";
import { PAPERS_RESOURCE, papersHandlers } from "./papers";
import { PARTNERS_RESOURCE, partnersHandlers } from "./partners";
import {
  RESEARCH_TOOLS_RESOURCE,
  researchToolsHandlers,
} from "./research-tools";

export function registerFeatureResources(): void {
  registerResource(PAPERS_RESOURCE, papersHandlers);
  registerResource(FEATURED_CASES_RESOURCE, featuredCasesHandlers);
  registerResource(RESEARCH_TOOLS_RESOURCE, researchToolsHandlers);
  registerResource(DATASET_ITEMS_RESOURCE, datasetItemsHandlers);
  registerResource(DATASET_CHART_DATA_RESOURCE, datasetChartDataHandlers);
  registerResource(DYNAMIC_NEWS_RESOURCE, dynamicNewsHandlers);
  registerResource(PARTNERS_RESOURCE, partnersHandlers);
}
