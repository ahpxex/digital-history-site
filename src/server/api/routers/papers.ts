import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  baseListInput,
  buildOrderBy,
  coerceNumberId,
  paginationParams,
} from "./shared";

const paperSortFields = [
  "docTitle",
  "timePublished",
  "createdAt",
  "updatedAt",
] as const;

const shortText = z.string().trim().min(1).max(255);
const mediumText = z.string().trim().min(1).max(1024);
const longText = z.string().trim().min(1).max(6000);

const optionalShort = shortText.nullish();
const optionalMedium = mediumText.nullish();
const optionalLong = longText.nullish();

const paperCreateInput = z.object({
  docTitle: shortText,
  author: optionalShort,
  authorAffiliation: optionalShort,
  docAbstract: optionalLong,
  docKeywords: optionalMedium,
  topic: optionalShort,
  methods: optionalShort,
  tools: optionalShort,
  sourcePublisher: optionalShort,
  sourceLevel: optionalShort,
  timePublished: optionalShort,
  worker: optionalShort,
});

const paperUpdateInput = paperCreateInput.partial();

const paperListInput = baseListInput.extend({
  topic: z.string().optional(),
  method: z.string().optional(),
  tool: z.string().optional(),
});

export const papersRouter = createTRPCRouter({
  list: publicProcedure.input(paperListInput).query(async ({ ctx, input }) => {
    const { skip, take } = paginationParams(input);
    const where: Prisma.PaperWhereInput = {};

    if (input.search) {
      where.OR = [
        { docTitle: { contains: input.search, mode: "insensitive" } },
        { author: { contains: input.search, mode: "insensitive" } },
        { docKeywords: { contains: input.search, mode: "insensitive" } },
        { topic: { contains: input.search, mode: "insensitive" } },
      ];
    }

    if (input.topic) {
      where.topic = { contains: input.topic, mode: "insensitive" };
    }

    if (input.method) {
      where.methods = { contains: input.method, mode: "insensitive" };
    }

    if (input.tool) {
      where.tools = { contains: input.tool, mode: "insensitive" };
    }

    const orderBy = buildOrderBy({
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
      allowedFields: paperSortFields,
      fallback: { createdAt: "desc" },
    }) as Prisma.PaperOrderByWithRelationInput;

    const [data, total] = await Promise.all([
      ctx.prisma.paper.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      ctx.prisma.paper.count({ where }),
    ]);

    return { data, total };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .query(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      const paper = await ctx.prisma.paper.findUniqueOrThrow({ where: { id } });
      return paper;
    }),

  create: publicProcedure
    .input(paperCreateInput)
    .mutation(async ({ ctx, input }) => {
      const paper = await ctx.prisma.paper.create({ data: input });
      return paper;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.union([z.number().int(), z.string()]),
        data: paperUpdateInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      const paper = await ctx.prisma.paper.update({
        where: { id },
        data: input.data,
      });
      return paper;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.union([z.number().int(), z.string()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = coerceNumberId(input.id);
      await ctx.prisma.paper.delete({ where: { id } });
      return { id };
    }),
});
