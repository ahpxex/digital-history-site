import type { TableConfig, TableMeta } from "@/infra/table";
import { createPaperColumns, type PapersTableContext } from "./columns";
import { PAPERS_RESOURCE } from "./repository";
import type { Paper } from "./types";

export const papersMeta: TableMeta = {
  title: "核心论文库",
  description: "管理数字史学相关论文，支持关键字搜索、筛选与快速增删改。",
};

export function createPapersConfig(
  context: PapersTableContext,
): TableConfig<Paper> {
  return {
    resource: PAPERS_RESOURCE,
    columns: createPaperColumns(context),
    filters: [
      {
        key: "topic",
        label: "Filter by topic",
        placeholder: "All topics",
        options: [
          { key: "Spatial Analytics", label: "Spatial Analytics" },
          { key: "Semantic Modeling", label: "Semantic Modeling" },
          { key: "Media Preservation", label: "Media Preservation" },
        ],
      },
      {
        key: "method",
        label: "Filter by method",
        placeholder: "All methods",
        options: [
          { key: "GIS", label: "GIS" },
          { key: "entity extraction", label: "Entity Extraction" },
          { key: "signal processing", label: "Signal Processing" },
        ],
      },
      {
        key: "tool",
        label: "Filter by tool",
        placeholder: "All tools",
        options: [
          { key: "QGIS", label: "QGIS" },
          { key: "Neo4j", label: "Neo4j" },
          { key: "Audacity", label: "Audacity" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "Search papers by title, author, or keywords...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
    emptyMessage: "No papers found",
  };
}
