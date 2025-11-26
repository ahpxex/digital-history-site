import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ActionMenu } from "@/infra/ui";
import type { DatasetItem } from "./types";

export interface DatasetItemsTableContext {
  onEdit: (item: DatasetItem) => void;
  onDelete: (id: number) => void;
}

export function createDatasetItemsColumns(
  context: DatasetItemsTableContext,
): ColumnDef<DatasetItem>[] {
  return [
    {
      accessorKey: "title",
      header: "Dataset",
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
      accessorKey: "url",
      header: "Link",
      cell: (info) => (
        <Link
          href={info.getValue() as string}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline"
        >
          View
        </Link>
      ),
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
