import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { DatasetChartData } from "./types";

export const DATASET_CHART_DATA_RESOURCE = "dataset-chart-data";

export const datasetChartDataHandlers: ResourceHandlers<DatasetChartData> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    return trpc.datasetChartData.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      chartType: filterMap.chartType as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
  },
  getOne: async (id) => {
    const data = await trpc.datasetChartData.getById.query({ id });
    return { data };
  },
  create: async (variables) => {
    const data = await trpc.datasetChartData.create.mutate(variables);
    return { data };
  },
  update: async (id, variables) => {
    const data = await trpc.datasetChartData.update.mutate({
      id,
      data: variables,
    });
    return { data };
  },
  deleteOne: async (id) => {
    await trpc.datasetChartData.delete.mutate({ id });
    return { data: { id } };
  },
};
