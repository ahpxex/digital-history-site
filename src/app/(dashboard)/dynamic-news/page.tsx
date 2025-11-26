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
  createDynamicNewsConfig,
  DYNAMIC_NEWS_RESOURCE,
  type DynamicNews,
  dynamicNewsMeta,
} from "@/features/dynamic-news";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const newsFields: FieldConfig[] = [
  { name: "title", label: "标题", required: true },
  { name: "issue", label: "期号", allowNull: true },
  { name: "coverUrl", label: "封面URL", type: "url", allowNull: true },
  {
    name: "description",
    label: "描述",
    type: "textarea",
    required: true,
  },
  { name: "link", label: "链接", type: "url", allowNull: true },
  {
    name: "publishDate",
    label: "发布日期",
    type: "date",
    allowNull: true,
  },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  );

export default function DynamicNewsPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<DynamicNews | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createNews, mutation: createMutation } =
    useCreate<DynamicNews>();
  const { mutateAsync: updateNews, mutation: updateMutation } =
    useUpdate<DynamicNews>();
  const { mutateAsync: deleteNews } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingNews(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((record: DynamicNews) => {
    setEditingNews(record);
    setInitialValues({
      title: record.title,
      issue: record.issue,
      coverUrl: record.coverUrl,
      description: record.description,
      link: record.link,
      publishDate: record.publishDate,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该新闻吗？")) return;
      try {
        await deleteNews({
          resource: DYNAMIC_NEWS_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deleteNews],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingNews) {
          await updateNews({
            resource: DYNAMIC_NEWS_RESOURCE,
            id: String(editingNews.id),
            values: payload,
          });
        } else {
          await createNews({
            resource: DYNAMIC_NEWS_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingNews(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createNews, editingNews, updateNews],
  );

  const tableConfig = useMemo(
    () =>
      createDynamicNewsConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={dynamicNewsMeta.title}
      description={dynamicNewsMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          发布动态
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
        title={editingNews ? "编辑动态" : "发布动态"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={newsFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingNews ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
