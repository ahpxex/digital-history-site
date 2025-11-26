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
  createResearchToolsConfig,
  RESEARCH_TOOLS_RESOURCE,
  type ResearchTool,
  researchToolsMeta,
} from "@/features/research-tools";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const toolFields: FieldConfig[] = [
  { name: "name", label: "名称", required: true },
  { name: "category", label: "分类", required: true },
  {
    name: "description",
    label: "描述",
    type: "textarea",
    required: true,
  },
  {
    name: "developer",
    label: "开发者",
    allowNull: true,
  },
  {
    name: "url",
    label: "网站",
    type: "url",
    allowNull: true,
  },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function ResearchToolsPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ResearchTool | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createTool, mutation: createMutation } =
    useCreate<ResearchTool>();
  const { mutateAsync: updateTool, mutation: updateMutation } =
    useUpdate<ResearchTool>();
  const { mutateAsync: deleteTool } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingTool(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((tool: ResearchTool) => {
    setEditingTool(tool);
    setInitialValues({
      name: tool.name,
      category: tool.category,
      description: tool.description,
      developer: tool.developer,
      url: tool.url,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该工具吗？")) return;
      try {
        await deleteTool({
          resource: RESEARCH_TOOLS_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deleteTool],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingTool) {
          await updateTool({
            resource: RESEARCH_TOOLS_RESOURCE,
            id: String(editingTool.id),
            values: payload,
          });
        } else {
          await createTool({
            resource: RESEARCH_TOOLS_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingTool(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createTool, editingTool, updateTool],
  );

  const tableConfig = useMemo(
    () =>
      createResearchToolsConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={researchToolsMeta.title}
      description={researchToolsMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增工具
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
        title={editingTool ? "编辑工具" : "新增工具"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={toolFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingTool ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
