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
        label: "按主题筛选",
        placeholder: "所有主题",
        options: [
          { key: "Spatial Analytics", label: "空间分析" },
          { key: "Semantic Modeling", label: "语义建模" },
          { key: "Media Preservation", label: "媒体保存" },
        ],
      },
      {
        key: "method",
        label: "按方法筛选",
        placeholder: "所有方法",
        options: [
          { key: "GIS", label: "地理信息系统" },
          { key: "entity extraction", label: "实体抽取" },
          { key: "signal processing", label: "信号处理" },
        ],
      },
      {
        key: "tool",
        label: "按工具筛选",
        placeholder: "所有工具",
        options: [
          { key: "QGIS", label: "QGIS" },
          { key: "Neo4j", label: "Neo4j" },
          { key: "Audacity", label: "Audacity" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "按标题、作者或关键词搜索论文...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
    emptyMessage: "未找到论文",
  };
}
