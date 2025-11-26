import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const chartSortFields = ["chartType", "label", "value"] as const;

const chartBaseInput = z.object({
  chartType: z.string().trim().min(1).max(120),
  label: z.string().trim().min(1).max(255),
  value: z.number().int().min(0),
});

const chartUpdateInput = chartBaseInput.partial();

const chartListInput = baseListInput.extend({
  chartType: z.string().optional(),
});

export const datasetChartDataRouter = createTRPCRouter({
  list: publicProcedure.input(chartListInput).query(async ({ ctx, input }) => {
    const { skip, take } = paginationParams(input);
    const where: Prisma.DatasetChartDataWhereInput = {};

    if (input.search) {
      where.OR = [
        { chartType: { contains: input.search, mode: "insensitive" } },
        { label: { contains: input.search, mode: "insensitive" } },
      ];
    }

    if (input.chartType) {
      where.chartType = { equals: input.chartType };
    }

    const orderBy = buildOrderBy({
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
      allowedFields: chartSortFields,
      fallback: { chartType: "asc" },
    }) as Prisma.DatasetChartDataOrderByWithRelationInput;

    const [data, total] = await Promise.all([
      ctx.prisma.datasetChartData.findMany({ where, skip, take, orderBy }),
      ctx.prisma.datasetChartData.count({ where }),
    ]);

    return { data, total };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.datasetChartData.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(chartBaseInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.datasetChartData.create({ data: input });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: chartUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.datasetChartData.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.datasetChartData.delete({ where: { id } });
      return { id };
    }),
});
