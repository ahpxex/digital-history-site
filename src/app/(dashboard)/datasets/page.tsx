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
  createDatasetItemsConfig,
  DATASET_ITEMS_RESOURCE,
  type DatasetItem,
  datasetItemsMeta,
} from "@/features/dataset-items";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const datasetFields: FieldConfig[] = [
  { name: "title", label: "Title", required: true },
  { name: "type", label: "Type", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    name: "tags",
    label: "Tags",
    required: true,
    description: "Comma separated tags",
  },
  { name: "url", label: "URL", type: "url", required: true },
  { name: "institution", label: "Institution", required: true },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function DatasetItemsPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DatasetItem | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createItem, mutation: createMutation } =
    useCreate<DatasetItem>();
  const { mutateAsync: updateItem, mutation: updateMutation } =
    useUpdate<DatasetItem>();
  const { mutateAsync: deleteItem } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingItem(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((item: DatasetItem) => {
    setEditingItem(item);
    setInitialValues({
      title: item.title,
      type: item.type,
      description: item.description,
      tags: item.tags,
      url: item.url,
      institution: item.institution,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该数据集吗？")) return;
      try {
        await deleteItem({
          resource: DATASET_ITEMS_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deleteItem],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingItem) {
          await updateItem({
            resource: DATASET_ITEMS_RESOURCE,
            id: String(editingItem.id),
            values: payload,
          });
        } else {
          await createItem({
            resource: DATASET_ITEMS_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingItem(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createItem, editingItem, updateItem],
  );

  const tableConfig = useMemo(
    () =>
      createDatasetItemsConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={datasetItemsMeta.title}
      description={datasetItemsMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增数据集
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
        title={editingItem ? "编辑数据集" : "新增数据集"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={datasetFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingItem ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
