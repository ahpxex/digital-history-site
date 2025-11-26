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
  createFeaturedCasesConfig,
  FEATURED_CASES_RESOURCE,
  type FeaturedCase,
  featuredCasesMeta,
} from "@/features/featured-cases";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const caseFields: FieldConfig[] = [
  { name: "title", label: "标题", required: true },
  { name: "type", label: "类型", required: true },
  {
    name: "description",
    label: "描述",
    type: "textarea",
    required: true,
  },
  {
    name: "tags",
    label: "标签",
    required: true,
    description: "用逗号分隔标签",
  },
  { name: "url", label: "URL", type: "url", required: true },
  { name: "institution", label: "机构", required: true },
  {
    name: "sortOrder",
    label: "排序",
    type: "number",
    required: true,
  },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function FeaturedCasesPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<FeaturedCase | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createCase, mutation: createMutation } =
    useCreate<FeaturedCase>();
  const { mutateAsync: updateCase, mutation: updateMutation } =
    useUpdate<FeaturedCase>();
  const { mutateAsync: deleteCase } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingCase(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((record: FeaturedCase) => {
    setEditingCase(record);
    setInitialValues({
      title: record.title,
      type: record.type,
      description: record.description,
      tags: record.tags,
      url: record.url,
      institution: record.institution,
      sortOrder: record.sortOrder,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该案例吗？")) return;
      try {
        await deleteCase({
          resource: FEATURED_CASES_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deleteCase],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingCase) {
          await updateCase({
            resource: FEATURED_CASES_RESOURCE,
            id: String(editingCase.id),
            values: payload,
          });
        } else {
          await createCase({
            resource: FEATURED_CASES_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingCase(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createCase, editingCase, updateCase],
  );

  const tableConfig = useMemo(
    () =>
      createFeaturedCasesConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={featuredCasesMeta.title}
      description={featuredCasesMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增案例
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
        title={editingCase ? "编辑案例" : "新增案例"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={caseFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingCase ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
