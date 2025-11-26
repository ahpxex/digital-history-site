import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const toolSortFields = ["name", "category"] as const;

const researchToolBaseInput = z.object({
  name: z.string().trim().min(1).max(255),
  category: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  developer: z.string().trim().min(1).max(255).nullish(),
  url: z.string().trim().url().nullish(),
});

const researchToolCreateInput = researchToolBaseInput;
const researchToolUpdateInput = researchToolBaseInput.partial();

const researchToolListInput = baseListInput.extend({
  category: z.string().optional(),
});

export const researchToolsRouter = createTRPCRouter({
  list: publicProcedure
    .input(researchToolListInput)
    .query(async ({ ctx, input }) => {
      const { skip, take } = paginationParams(input);
      const where: Prisma.ResearchToolWhereInput = {};

      if (input.search) {
        where.OR = [
          { name: { contains: input.search, mode: "insensitive" } },
          { category: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
          { developer: { contains: input.search, mode: "insensitive" } },
        ];
      }

      if (input.category) {
        where.category = { equals: input.category };
      }

      const orderBy = buildOrderBy({
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
        allowedFields: toolSortFields,
        fallback: { name: "asc" },
      }) as Prisma.ResearchToolOrderByWithRelationInput;

      const [data, total] = await Promise.all([
        ctx.prisma.researchTool.findMany({ where, skip, take, orderBy }),
        ctx.prisma.researchTool.count({ where }),
      ]);

      return { data, total };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.researchTool.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(researchToolCreateInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.researchTool.create({ data: input });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: researchToolUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.researchTool.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.researchTool.delete({ where: { id } });
      return { id };
    }),
});
