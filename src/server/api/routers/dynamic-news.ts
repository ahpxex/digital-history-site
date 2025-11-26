import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const newsSortFields = ["publishDate", "title"] as const;

const dateValue = z
  .union([z.date(), z.string().trim().min(1)])
  .transform((value) => (value instanceof Date ? value : new Date(value)));

const newsBaseInput = z.object({
  title: z.string().trim().min(1).max(255),
  issue: z.string().trim().min(1).max(80).nullish(),
  coverUrl: z.string().trim().url().nullish(),
  description: z.string().trim().min(1).max(4000),
  link: z.string().trim().url().nullish(),
  publishDate: dateValue.optional(),
});

const newsUpdateInput = newsBaseInput.partial();

export const dynamicNewsRouter = createTRPCRouter({
  list: publicProcedure.input(baseListInput).query(async ({ ctx, input }) => {
    const { skip, take } = paginationParams(input);
    const where: Prisma.DynamicNewsWhereInput = {};

    if (input.search) {
      where.OR = [
        { title: { contains: input.search, mode: "insensitive" } },
        { issue: { contains: input.search, mode: "insensitive" } },
        { description: { contains: input.search, mode: "insensitive" } },
      ];
    }

    const orderBy = buildOrderBy({
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
      allowedFields: newsSortFields,
      fallback: { publishDate: "desc" },
    }) as Prisma.DynamicNewsOrderByWithRelationInput;

    const [data, total] = await Promise.all([
      ctx.prisma.dynamicNews.findMany({ where, skip, take, orderBy }),
      ctx.prisma.dynamicNews.count({ where }),
    ]);

    return { data, total };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.dynamicNews.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(newsBaseInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.dynamicNews.create({
        data: {
          ...input,
          publishDate: input.publishDate ?? undefined,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: newsUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.dynamicNews.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.dynamicNews.delete({ where: { id } });
      return { id };
    }),
});
