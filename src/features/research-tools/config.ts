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
        label: "分类",
        placeholder: "所有分类",
        options: [
          { key: "Data Prep", label: "数据准备" },
          { key: "Annotation", label: "标注" },
          { key: "Visualization", label: "可视化" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "搜索工具...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
