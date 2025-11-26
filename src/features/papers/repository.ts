import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { Paper } from "./types";

const PAPERS_RESOURCE = "papers";

export const papersHandlers: ResourceHandlers<Paper> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    const response = await trpc.papers.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      topic: filterMap.topic as string | undefined,
      method: filterMap.method as string | undefined,
      tool: filterMap.tool as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });

    return response;
  },

  getOne: async (id) => {
    const data = await trpc.papers.getById.query({ id });
    return { data };
  },

  create: async (variables) => {
    const data = await trpc.papers.create.mutate(variables);
    return { data };
  },

  update: async (id, variables) => {
    const data = await trpc.papers.update.mutate({ id, data: variables });
    return { data };
  },

  deleteOne: async (id) => {
    await trpc.papers.delete.mutate({ id });
    return { data: { id } };
  },
};

export { PAPERS_RESOURCE };
