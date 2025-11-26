import { z } from "zod";

export const baseListInput = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type BaseListInput = z.infer<typeof baseListInput>;

export function buildOrderBy<T extends string>({
  sortBy,
  sortOrder,
  allowedFields,
  fallback,
}: {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  allowedFields: readonly T[];
  fallback: Partial<Record<T, "asc" | "desc">>;
}) {
  if (sortBy && (allowedFields as readonly string[]).includes(sortBy)) {
    return {
      [sortBy]: sortOrder ?? "asc",
    };
  }
  return fallback;
}

export function paginationParams({ page, pageSize }: BaseListInput) {
  const take = pageSize;
  const skip = (page - 1) * pageSize;
  return { skip, take };
}

export function coerceNumberId(id: number | string) {
  const parsed = typeof id === "number" ? id : Number(id);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric id "${id}"`);
  }
  return parsed;
}
