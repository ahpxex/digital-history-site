import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ActionMenu } from "@/infra/ui";
import type { FeaturedCase } from "./types";

export interface FeaturedCasesTableContext {
  onEdit: (record: FeaturedCase) => void;
  onDelete: (id: number) => void;
}

export function createFeaturedCasesColumns(
  context: FeaturedCasesTableContext,
): ColumnDef<FeaturedCase>[] {
  return [
    {
      accessorKey: "title",
      header: "Case",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-semibold">{info.getValue() as string}</span>
          <span className="text-xs text-gray-500">
            {info.row.original.institution}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "sortOrder",
      header: "Sort Order",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue<number>()}
        </span>
      ),
    },
    {
      accessorKey: "url",
      header: "Link",
      cell: (info) => {
        const url = info.getValue<string>();
        return (
          <Link
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary underline"
          >
            Visit
          </Link>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const record = info.row.original;
        return (
          <ActionMenu
            onEdit={() => context.onEdit(record)}
            onDelete={() => context.onDelete(record.id)}
          />
        );
      },
    },
  ];
}
