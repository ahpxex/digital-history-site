import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { Partner } from "./types";

export const PARTNERS_RESOURCE = "partners";

export const partnersHandlers: ResourceHandlers<Partner> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    return trpc.partners.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
  },
  getOne: async (id) => {
    const data = await trpc.partners.getById.query({ id });
    return { data };
  },
  create: async (variables) => {
    const data = await trpc.partners.create.mutate(variables);
    return { data };
  },
  update: async (id, variables) => {
    const data = await trpc.partners.update.mutate({ id, data: variables });
    return { data };
  },
  deleteOne: async (id) => {
    await trpc.partners.delete.mutate({ id });
    return { data: { id } };
  },
};
