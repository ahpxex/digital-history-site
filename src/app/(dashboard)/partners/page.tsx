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
  createPartnersConfig,
  PARTNERS_RESOURCE,
  type Partner,
  partnersMeta,
} from "@/features/partners";
import {
  PaginationTable,
  type PaginationTableRef,
  TablePage,
} from "@/infra/table";

const partnerFields: FieldConfig[] = [
  { name: "name", label: "名称", required: true },
  {
    name: "logoFile",
    label: "Logo 图片",
    type: "file",
    accept: "image/*",
    uploadFieldName: "logoUrl",
    description: "上传 Logo 图片文件（JPEG, PNG, WebP, GIF，最大 5MB）",
  },
  { name: "logoUrl", label: "Logo URL", type: "url", description: "或直接输入图片 URL" },
  { name: "websiteUrl", label: "网站URL", type: "url", required: true },
];

const sanitizeValues = (values: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) => value !== undefined && key !== "logoFile"
    ),
  );

export default function PartnersPage() {
  const tableRef = useRef<PaginationTableRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const { mutateAsync: createPartner, mutation: createMutation } =
    useCreate<Partner>();
  const { mutateAsync: updatePartner, mutation: updateMutation } =
    useUpdate<Partner>();
  const { mutateAsync: deletePartner } = useDelete();

  const openForCreate = useCallback(() => {
    setEditingPartner(null);
    setInitialValues({});
    setModalOpen(true);
  }, []);

  const openForEdit = useCallback((partner: Partner) => {
    setEditingPartner(partner);
    setInitialValues({
      name: partner.name,
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl,
    });
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("确定要删除该合作机构吗？")) return;
      try {
        await deletePartner({
          resource: PARTNERS_RESOURCE,
          id: String(id),
        });
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("删除失败，请稍后再试。");
      }
    },
    [deletePartner],
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const payload = sanitizeValues(values);
      try {
        if (editingPartner) {
          await updatePartner({
            resource: PARTNERS_RESOURCE,
            id: String(editingPartner.id),
            values: payload,
          });
        } else {
          await createPartner({
            resource: PARTNERS_RESOURCE,
            values: payload,
          });
        }
        setModalOpen(false);
        setEditingPartner(null);
        tableRef.current?.refresh();
      } catch (error) {
        console.error(error);
        alert("保存失败，请检查输入后重试。");
      }
    },
    [createPartner, editingPartner, updatePartner],
  );

  const tableConfig = useMemo(
    () =>
      createPartnersConfig({
        onEdit: openForEdit,
        onDelete: handleDelete,
      }),
    [handleDelete, openForEdit],
  );

  return (
    <TablePage
      title={partnersMeta.title}
      description={partnersMeta.description}
      actions={
        <Button
          color="primary"
          startContent={<Plus size={18} weight="bold" />}
          onPress={openForCreate}
        >
          新增机构
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
        title={editingPartner ? "编辑机构" : "新增机构"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={partnerFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        primaryActionLabel={editingPartner ? "保存修改" : "创建"}
      />
    </TablePage>
  );
}
