import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ActionMenu } from "@/infra/ui";
import type { ResearchTool } from "./types";

export interface ResearchToolsTableContext {
  onEdit: (tool: ResearchTool) => void;
  onDelete: (id: number) => void;
}

export function createResearchToolsColumns(
  context: ResearchToolsTableContext,
): ColumnDef<ResearchTool>[] {
  return [
    {
      accessorKey: "name",
      header: "名称",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {info.getValue() as string}
          </span>
          <span className="text-xs text-gray-500">
            {info.row.original.category}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "描述",
      cell: (info) => (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      accessorKey: "developer",
      header: "开发者",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {(info.getValue<string | null>() ?? "—").toString()}
        </span>
      ),
    },
    {
      accessorKey: "url",
      header: "网站",
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
            访问
          </Link>
        );
      },
    },
    {
      id: "actions",
      header: "操作",
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
