import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "@/infra/ui";
import type { Paper } from "./types";

export interface PapersTableContext {
  onEdit: (paper: Paper) => void;
  onDelete: (id: number) => void;
}

export function createPaperColumns(
  context: PapersTableContext,
): ColumnDef<Paper>[] {
  return [
    {
      accessorKey: "docTitle",
      header: "标题",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {info.getValue() as string}
          </span>
          <span className="text-xs text-gray-500">
            {(info.row.original.topic ?? "无主题").toString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: "作者",
      cell: (info) => {
        const author = info.getValue<string | null | undefined>();
        const affiliation = info.row.original.authorAffiliation;
        return (
          <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
            <span>{author ?? "未知"}</span>
            {affiliation ? (
              <span className="text-xs text-gray-500">{affiliation}</span>
            ) : null}
          </div>
        );
      },
    },
    {
      accessorKey: "methods",
      header: "方法与工具",
      cell: (info) => {
        const methods = info.getValue<string | null | undefined>();
        const tools = info.row.original.tools;
        return (
          <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
            <span>{methods ?? "—"}</span>
            <span className="text-xs text-gray-500">
              {tools ? `工具：${tools}` : "工具：—"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "timePublished",
      header: "发布时间",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {(info.getValue<string | null>() ?? "未知").toString()}
        </span>
      ),
    },
    {
      accessorKey: "sourcePublisher",
      header: "来源",
      cell: (info) => (
        <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
          <span>
            {(info.getValue<string | null>() ?? "未设置").toString()}
          </span>
          <span className="text-xs text-gray-500">
            级别：{info.row.original.sourceLevel ?? "—"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "worker",
      header: "维护者",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {(info.getValue<string | null>() ?? "—").toString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "操作",
      cell: (info) => {
        const paper = info.row.original;
        return (
          <ActionMenu
            onEdit={() => context.onEdit(paper)}
            onDelete={() => context.onDelete(paper.id)}
          />
        );
      },
    },
  ];
}
