import type { ResourceHandlers } from "@/infra/data";
import { extractFilterMap } from "@/infra/data";
import { trpc } from "@/utils/trpc";
import type { DynamicNews } from "./types";

export const DYNAMIC_NEWS_RESOURCE = "dynamic-news";

const normalizeDynamicNews = (news: any): DynamicNews => ({
  ...news,
  publishDate: news.publishDate instanceof Date ? news.publishDate : new Date(news.publishDate),
});

export const dynamicNewsHandlers: ResourceHandlers<DynamicNews> = {
  list: async ({ pagination, filters, sorters }) => {
    const filterMap = extractFilterMap(filters);
    const sorter = sorters?.[0];
    const result = await trpc.dynamicNews.list.query({
      page: pagination?.current ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      search: filterMap.q as string | undefined,
      sortBy: sorter?.field ? String(sorter.field) : undefined,
      sortOrder: sorter?.order,
    });
    return {
      ...result,
      data: result.data.map(normalizeDynamicNews),
    };
  },
  getOne: async (id) => {
    const result = await trpc.dynamicNews.getById.query({ id });
    return { data: normalizeDynamicNews(result) };
  },
  create: async (variables) => {
    const data = await trpc.dynamicNews.create.mutate(variables);
    return { data: normalizeDynamicNews(data) };
  },
  update: async (id, variables) => {
    const data = await trpc.dynamicNews.update.mutate({
      id,
      data: variables,
    });
    return { data: normalizeDynamicNews(data) };
  },
  deleteOne: async (id) => {
    await trpc.dynamicNews.delete.mutate({ id });
    return { data: { id } };
  },
};
