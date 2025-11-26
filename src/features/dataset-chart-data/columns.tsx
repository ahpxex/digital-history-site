import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "@/infra/ui";
import type { DatasetChartData } from "./types";

export interface DatasetChartDataTableContext {
  onEdit: (record: DatasetChartData) => void;
  onDelete: (id: number) => void;
}

export function createDatasetChartDataColumns(
  context: DatasetChartDataTableContext,
): ColumnDef<DatasetChartData>[] {
  return [
    {
      accessorKey: "chartType",
      header: "Chart Type",
      cell: (info) => (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: (info) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {info.getValue<number>()}
        </span>
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
