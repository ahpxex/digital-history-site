import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const featuredSortFields = ["sortOrder", "title"] as const;

const featuredBaseInput = z.object({
  title: z.string().trim().min(1).max(255),
  type: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  tags: z.string().trim().min(1).max(255),
  url: z.string().trim().url(),
  institution: z.string().trim().min(1).max(255),
  sortOrder: z.number().int().min(0).max(1000).default(0),
});

const featuredCreateInput = featuredBaseInput;
const featuredUpdateInput = featuredBaseInput.partial();

const featuredListInput = baseListInput.extend({
  type: z.string().optional(),
});

export const featuredCasesRouter = createTRPCRouter({
  list: publicProcedure
    .input(featuredListInput)
    .query(async ({ ctx, input }) => {
      const { skip, take } = paginationParams(input);
      const where: Prisma.FeaturedCaseWhereInput = {};

      if (input.search) {
        where.OR = [
          { title: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
          { tags: { contains: input.search, mode: "insensitive" } },
          { institution: { contains: input.search, mode: "insensitive" } },
        ];
      }

      if (input.type) {
        where.type = { equals: input.type };
      }

      const orderBy = buildOrderBy({
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
        allowedFields: featuredSortFields,
        fallback: { sortOrder: "asc" },
      }) as Prisma.FeaturedCaseOrderByWithRelationInput;

      const [data, total] = await Promise.all([
        ctx.prisma.featuredCase.findMany({ where, skip, take, orderBy }),
        ctx.prisma.featuredCase.count({ where }),
      ]);

      return { data, total };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.featuredCase.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(featuredCreateInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.featuredCase.create({ data: input });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: featuredUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.featuredCase.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.featuredCase.delete({ where: { id } });
      return { id };
    }),
});
