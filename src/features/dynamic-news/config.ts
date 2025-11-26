import type { TableConfig, TableMeta } from "@/infra/table";
import {
  createDynamicNewsColumns,
  type DynamicNewsTableContext,
} from "./columns";
import { DYNAMIC_NEWS_RESOURCE } from "./repository";
import type { DynamicNews } from "./types";

export const dynamicNewsMeta: TableMeta = {
  title: "发展动态",
  description: "发布最新活动、会议与重要通知。",
};

export function createDynamicNewsConfig(
  context: DynamicNewsTableContext,
): TableConfig<DynamicNews> {
  return {
    resource: DYNAMIC_NEWS_RESOURCE,
    columns: createDynamicNewsColumns(context),
    enableSearch: true,
    searchPlaceholder: "Search news...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
