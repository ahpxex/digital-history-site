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
        label: "案例类型",
        placeholder: "所有类型",
        options: [
          { key: "Visualization", label: "可视化" },
          { key: "Archive", label: "档案" },
          { key: "Analysis", label: "分析" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "搜索案例...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
