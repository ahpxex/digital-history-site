import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ActionMenu } from "@/infra/ui";
import type { DynamicNews } from "./types";

export interface DynamicNewsTableContext {
  onEdit: (record: DynamicNews) => void;
  onDelete: (id: number) => void;
}

const formatDate = (value: string | Date | null | undefined) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
};

export function createDynamicNewsColumns(
  context: DynamicNewsTableContext,
): ColumnDef<DynamicNews>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-semibold">{info.getValue() as string}</span>
          <span className="text-xs text-gray-500">
            Issue: {info.row.original.issue ?? "—"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "publishDate",
      header: "Publish Date",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {formatDate(info.getValue() as string)}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      accessorKey: "link",
      header: "Link",
      cell: (info) => {
        const value = info.getValue<string | null>();
        if (!value) return <span className="text-sm text-gray-400">—</span>;
        return (
          <Link
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary underline"
          >
            Open
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
