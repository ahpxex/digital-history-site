import type { TableConfig, TableMeta } from "@/infra/table";
import {
  createDatasetChartDataColumns,
  type DatasetChartDataTableContext,
} from "./columns";
import { DATASET_CHART_DATA_RESOURCE } from "./repository";
import type { DatasetChartData } from "./types";

export const datasetChartDataMeta: TableMeta = {
  title: "数据统计配置",
  description: "维护图表所需的标签与数值数据。",
};

export function createDatasetChartDataConfig(
  context: DatasetChartDataTableContext,
): TableConfig<DatasetChartData> {
  return {
    resource: DATASET_CHART_DATA_RESOURCE,
    columns: createDatasetChartDataColumns(context),
    filters: [
      {
        key: "chartType",
        label: "Chart type",
        placeholder: "All chart types",
        options: [
          { key: "datasetsByType", label: "Datasets by Type" },
          { key: "institutions", label: "Institutions" },
        ],
      },
    ],
    enableSearch: true,
    searchPlaceholder: "Search chart data...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
