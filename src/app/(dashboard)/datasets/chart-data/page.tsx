"use client";

import { Button, Spinner } from "@heroui/react";
import { Plus } from "@phosphor-icons/react";
import { useCreate, useDelete, useUpdate } from "@refinedev/core";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import {
  EntityFormModal,
  type FieldConfig,
} from "@/features/common/EntityFormModal";
import {
  createDatasetChartDataConfig,
  DATASET_CHART_DATA_RESOURCE,
  type DatasetChartData,
  datasetChartDataMeta,
} from "@/features/dataset-chart-data";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const chartFields: FieldConfig[] = [
  { name: "chartType", label: "Chart Type", required: true },
  { name: "label", label: "Label", required: true },
  { name: "value", label: "Value", type: "number", required: true },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function DatasetChartDataPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DatasetChartData | null>(
    null,
  );
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createEntry, mutation: createMutation } =
    useCreate<DatasetChartData>();
  const { mutateAsync: updateEntry, mutation: updateMutation } =
    useUpdate<DatasetChartData>();
  const { mutateAsync: deleteEntry } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingEntry(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((entry: DatasetChartData) => {
    setEditingEntry(entry);
    setInitialValues({
      chartType: entry.chartType,
      label: entry.label,
      value: entry.value,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该统计数据吗？")) return;
      try {
        await deleteEntry({
          resource: DATASET_CHART_DATA_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deleteEntry],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingEntry) {
          await updateEntry({
            resource: DATASET_CHART_DATA_RESOURCE,
            id: String(editingEntry.id),
            values: payload,
          });
        } else {
          await createEntry({
            resource: DATASET_CHART_DATA_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingEntry(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createEntry, editingEntry, updateEntry],
  );

  const tableConfig = useMemo(
    () =>
      createDatasetChartDataConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={datasetChartDataMeta.title}
      description={datasetChartDataMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增统计项
        </Button>
      }
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <PaginationTable ref={tableRef} {...tableConfig} />
      </Suspense>

      <EntityFormModal
        title={editingEntry ? "编辑统计项" : "新增统计项"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={chartFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingEntry ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
