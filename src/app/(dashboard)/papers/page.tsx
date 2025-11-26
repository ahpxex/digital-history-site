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
  createPapersConfig,
  PAPERS_RESOURCE,
  type Paper,
  papersMeta,
} from "@/features/papers";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const paperFormFields: FieldConfig[] = [
  { name: "docTitle", label: "标题", required: true },
  { name: "author", label: "作者", allowNull: true },
  {
    name: "authorAffiliation",
    label: "隶属关系",
    allowNull: true,
  },
  {
    name: "docAbstract",
    label: "摘要",
    type: "textarea",
    allowNull: true,
  },
  {
    name: "docKeywords",
    label: "关键字",
    allowNull: true,
    description: "逗号分隔的关键词",
  },
  { name: "topic", label: "话题", allowNull: true },
  { name: "methods", label: "方法", allowNull: true },
  { name: "tools", label: "工具", allowNull: true },
  { name: "sourcePublisher", label: "来源/期刊", allowNull: true },
  { name: "sourceLevel", label: "来源级别", allowNull: true },
  { name: "timePublished", label: "发布于", allowNull: true },
  { name: "worker", label: "维护者", allowNull: true },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function PapersPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createPaper, mutation: createMutation } =
    useCreate<Paper>();
  const { mutateAsync: updatePaper, mutation: updateMutation } =
    useUpdate<Paper>();
  const { mutateAsync: deletePaper } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingPaper(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((paper: Paper) => {
    setEditingPaper(paper);
    setInitialValues({
      docTitle: paper.docTitle,
      author: paper.author,
      authorAffiliation: paper.authorAffiliation,
      docAbstract: paper.docAbstract,
      docKeywords: paper.docKeywords,
      topic: paper.topic,
      methods: paper.methods,
      tools: paper.tools,
      sourcePublisher: paper.sourcePublisher,
      sourceLevel: paper.sourceLevel,
      timePublished: paper.timePublished,
      worker: paper.worker,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除这篇论文吗？")) return;
      try {
        await deletePaper({ resource: PAPERS_RESOURCE, id: String(id) });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deletePaper],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingPaper) {
          await updatePaper({
            resource: PAPERS_RESOURCE,
            id: String(editingPaper.id),
            values: payload,
          });
        } else {
          await createPaper({
            resource: PAPERS_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingPaper(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createPaper, editingPaper, updatePaper],
  );

  const tableConfig = useMemo(
    () =>
      createPapersConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={papersMeta.title}
      description={papersMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增论文
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
        title={editingPaper ? "编辑论文" : "新增论文"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={paperFormFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingPaper ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
