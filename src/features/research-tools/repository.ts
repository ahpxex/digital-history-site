import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { ResearchTool } from "./types";

export const RESEARCH_TOOLS_RESOURCE = "research-tools";

export const researchToolsHandlers: ResourceHandlers<ResearchTool> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    return trpc.researchTools.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      category: filterMap.category as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
  },
  getOne: async (id) => {
    const data = await trpc.researchTools.getById.query({ id });
    return { data };
  },
  create: async (variables) => {
    const data = await trpc.researchTools.create.mutate(variables);
    return { data };
  },
  update: async (id, variables) => {
    const data = await trpc.researchTools.update.mutate({
      id,
      data: variables,
    });
    return { data };
  },
  deleteOne: async (id) => {
    await trpc.researchTools.delete.mutate({ id });
    return { data: { id } };
  },
};
