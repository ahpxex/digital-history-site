import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const datasetSortFields = ["title", "type", "institution"] as const;

const datasetBaseInput = z.object({
  title: z.string().trim().min(1).max(255),
  type: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  tags: z.string().trim().min(1).max(255),
  url: z.string().trim().url(),
  institution: z.string().trim().min(1).max(255),
});

const datasetCreateInput = datasetBaseInput.partial();
const datasetUpdateInput = datasetBaseInput.partial();

const datasetListInput = baseListInput.extend({
  type: z.string().optional(),
});

export const datasetItemsRouter = createTRPCRouter({
  list: publicProcedure
    .input(datasetListInput)
    .query(async ({ ctx, input }) => {
      const { skip, take } = paginationParams(input);
      const where: Prisma.DatasetItemWhereInput = {};

      if (input.search) {
        where.OR = [
          { title: { contains: input.search } },
          { description: { contains: input.search } },
          { tags: { contains: input.search } },
          { institution: { contains: input.search } },
        ];
      }

      if (input.type) {
        where.type = { equals: input.type };
      }

      const orderBy = buildOrderBy({
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
        allowedFields: datasetSortFields,
        fallback: { title: "asc" },
      }) as Prisma.DatasetItemOrderByWithRelationInput;

      const [data, total] = await Promise.all([
        ctx.prisma.datasetItem.findMany({ where, skip, take, orderBy }),
        ctx.prisma.datasetItem.count({ where }),
      ]);

      return { data, total };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.datasetItem.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(datasetCreateInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.datasetItem.create({
        data: Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined)) as any
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: datasetUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.datasetItem.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.datasetItem.delete({ where: { id } });
      return { id };
    }),
});
