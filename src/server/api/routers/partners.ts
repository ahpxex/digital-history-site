import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const partnerSortFields = ["name"] as const;

const partnerBaseInput = z.object({
  name: z.string().trim().min(1).max(255),
  logoUrl: z.string().trim().refine((val) => {
    // Accept either a valid URL or a relative path starting with /
    try {
      new URL(val);
      return true;
    } catch {
      return val.startsWith("/");
    }
  }, { message: "Must be a valid URL or a relative path starting with /" }),
  websiteUrl: z.string().trim().url(),
});

const partnerUpdateInput = partnerBaseInput.partial();

export const partnersRouter = createTRPCRouter({
  list: publicProcedure.input(baseListInput).query(async ({ ctx, input }) => {
    const { skip, take } = paginationParams(input);
    const where: Prisma.PartnerWhereInput = {};

    if (input.search) {
      where.OR = [
        { name: { contains: input.search, mode: "insensitive" } },
        { websiteUrl: { contains: input.search, mode: "insensitive" } },
      ];
    }

    const orderBy = buildOrderBy({
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
      allowedFields: partnerSortFields,
      fallback: { name: "asc" },
    }) as Prisma.PartnerOrderByWithRelationInput;

    const [data, total] = await Promise.all([
      ctx.prisma.partner.findMany({ where, skip, take, orderBy }),
      ctx.prisma.partner.count({ where }),
    ]);

    return { data, total };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.partner.findUniqueOrThrow({ where: { id } });
    }),

  create: publicProcedure
    .input(partnerBaseInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.partner.create({ data: input });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: partnerUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      return ctx.prisma.partner.update({
        where: { id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.partner.delete({ where: { id } });
      return { id };
    }),
});
