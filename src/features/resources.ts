import type { IResourceItem } from "@refinedev/core";
import { DATASET_CHART_DATA_RESOURCE } from "./dataset-chart-data";
import { DATASET_ITEMS_RESOURCE } from "./dataset-items";
import { DYNAMIC_NEWS_RESOURCE } from "./dynamic-news";
import { FEATURED_CASES_RESOURCE } from "./featured-cases";
import { PAPERS_RESOURCE } from "./papers";
import { PARTNERS_RESOURCE } from "./partners";
import { RESEARCH_TOOLS_RESOURCE } from "./research-tools";

export const featureResources: IResourceItem[] = [
  {
    name: PAPERS_RESOURCE,
    list: "/papers",
    meta: { label: "Papers" },
  },
  {
    name: FEATURED_CASES_RESOURCE,
    list: "/featured-cases",
    meta: { label: "Featured Cases" },
  },
  {
    name: RESEARCH_TOOLS_RESOURCE,
    list: "/research-tools",
    meta: { label: "Research Tools" },
  },
  {
    name: DATASET_ITEMS_RESOURCE,
    list: "/datasets",
    meta: { label: "Datasets" },
  },
  {
    name: DATASET_CHART_DATA_RESOURCE,
    list: "/datasets/chart-data",
    meta: { label: "Dataset Chart Data" },
  },
  {
    name: DYNAMIC_NEWS_RESOURCE,
    list: "/dynamic-news",
    meta: { label: "Dynamic News" },
  },
  {
    name: PARTNERS_RESOURCE,
    list: "/partners",
    meta: { label: "Partners" },
  },
];
