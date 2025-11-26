import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { FeaturedCase } from "./types";

export const FEATURED_CASES_RESOURCE = "featured-cases";

export const featuredCasesHandlers: ResourceHandlers<FeaturedCase> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    return trpc.featuredCases.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      type: filterMap.type as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
  },

  getOne: async (id) => {
    const data = await trpc.featuredCases.getById.query({ id });
    return { data };
  },

  create: async (variables) => {
    const data = await trpc.featuredCases.create.mutate(variables);
    return { data };
  },

  update: async (id, variables) => {
    const data = await trpc.featuredCases.update.mutate({
      id,
      data: variables,
    });
    return { data };
  },

  deleteOne: async (id) => {
    await trpc.featuredCases.delete.mutate({ id });
    return { data: { id } };
  },
};
