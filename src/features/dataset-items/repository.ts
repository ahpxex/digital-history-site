import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { DatasetItem } from "./types";

export const DATASET_ITEMS_RESOURCE = "dataset-items";

export const datasetItemsHandlers: ResourceHandlers<DatasetItem> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    return trpc.datasetItems.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      type: filterMap.type as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
  },
  getOne: async (id) => {
    const data = await trpc.datasetItems.getById.query({ id });
    return { data };
  },
  create: async (variables) => {
    const data = await trpc.datasetItems.create.mutate(variables);
    return { data };
  },
  update: async (id, variables) => {
    const data = await trpc.datasetItems.update.mutate({
      id,
      data: variables,
    });
    return { data };
  },
  deleteOne: async (id) => {
    await trpc.datasetItems.delete.mutate({ id });
    return { data: { id } };
  },
};
