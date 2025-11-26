import type { TableConfig, TableMeta } from "@/infra/table";
import {
  createFeaturedCasesColumns,
  type FeaturedCasesTableContext,
} from "./columns";
import { FEATURED_CASES_RESOURCE } from "./repository";
import type { FeaturedCase } from "./types";

export const featuredCasesMeta: TableMeta = {
  title: "精选案例",
  description: "集中管理经过筛选的数字人文应用案例。",
};

export function createFeaturedCasesConfig(
  context: FeaturedCasesTableContext,
): TableConfig<FeaturedCase> {
  return {
    resource: FEATURED_CASES_RESOURCE,
    columns: createFeaturedCasesColumns(context),
    filters: [
      {
        key: "type",
        label: "Case type",
        placeholder: "All types",
        options: [
          { key: "Visualization", label: "Visualization" },
          { key: "Archive", label: "Archive" },
          { key: "Analysis", label: "Analysis" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "Search cases...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
