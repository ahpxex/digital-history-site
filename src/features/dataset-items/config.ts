import type { TableConfig, TableMeta } from "@/infra/table";
import {
  createDatasetItemsColumns,
  type DatasetItemsTableContext,
} from "./columns";
import { DATASET_ITEMS_RESOURCE } from "./repository";
import type { DatasetItem } from "./types";

export const datasetItemsMeta: TableMeta = {
  title: "数据集条目",
  description: "统一管理外部开放数据集入口。",
};

export function createDatasetItemsConfig(
  context: DatasetItemsTableContext,
): TableConfig<DatasetItem> {
  return {
    resource: DATASET_ITEMS_RESOURCE,
    columns: createDatasetItemsColumns(context),
    filters: [
      {
        key: "type",
        label: "Dataset type",
        placeholder: "All types",
        options: [
          { key: "Tabular", label: "Tabular" },
          { key: "Text", label: "Text" },
          { key: "Spatial", label: "Spatial" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "Search datasets...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
