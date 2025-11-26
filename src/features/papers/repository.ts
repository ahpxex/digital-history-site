import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { Paper } from "./types";

const PAPERS_RESOURCE = "papers";

const normalizePaper = (paper: any): Paper => ({
  ...paper,
  createdAt: paper.createdAt instanceof Date ? paper.createdAt : new Date(paper.createdAt),
  updatedAt: paper.updatedAt instanceof Date ? paper.updatedAt : new Date(paper.updatedAt),
});

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

    return {
      ...response,
      data: response.data.map(normalizePaper),
    };
  },

  getOne: async (id) => {
    const data = await trpc.papers.getById.query({ id });
    return { data: normalizePaper(data) };
  },

  create: async (variables) => {
    const data = await trpc.papers.create.mutate(variables);
    return { data: normalizePaper(data) };
  },

  update: async (id, variables) => {
    const data = await trpc.papers.update.mutate({ id, data: variables });
    return { data: normalizePaper(data) };
  },

  deleteOne: async (id) => {
    await trpc.papers.delete.mutate({ id });
    return { data: { id } };
  },
};

export { PAPERS_RESOURCE };
