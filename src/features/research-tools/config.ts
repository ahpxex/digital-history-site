import type { TableConfig, TableMeta } from "@/infra/table";
import {
  createResearchToolsColumns,
  type ResearchToolsTableContext,
} from "./columns";
import { RESEARCH_TOOLS_RESOURCE } from "./repository";
import type { ResearchTool } from "./types";

export const researchToolsMeta: TableMeta = {
  title: "研究工具",
  description: "集中管理数字史学常用的软件、脚本或分析工具。",
};

export function createResearchToolsConfig(
  context: ResearchToolsTableContext,
): TableConfig<ResearchTool> {
  return {
    resource: RESEARCH_TOOLS_RESOURCE,
    columns: createResearchToolsColumns(context),
    filters: [
      {
        key: "category",
        label: "Category",
        placeholder: "All categories",
        options: [
          { key: "Data Prep", label: "Data Prep" },
          { key: "Annotation", label: "Annotation" },
          { key: "Visualization", label: "Visualization" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "Search tools...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
