"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Image,
  Progress,
} from "@heroui/react";
import { Upload, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type FieldType = "text" | "textarea" | "number" | "url" | "date" | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  allowNull?: boolean;
  accept?: string;
  uploadFieldName?: string;
}

export interface EntityFormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  isSubmitting?: boolean;
  primaryActionLabel?: string;
}

const DEFAULT_TYPE: FieldType = "text";

function formatInitialValue(field: FieldConfig, value: any): string {
  if (value === undefined || value === null) {
    return "";
  }

  if (field.type === "date") {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split("T")[0];
  }

  return String(value);
}

function normalizeValue(field: FieldConfig, value: string): any {
  if (!value) {
    return field.allowNull ? null : undefined;
  }

  switch (field.type ?? DEFAULT_TYPE) {
    case "number": {
      const parsed = Number(value);
      if (Number.isNaN(parsed)) {
        return field.allowNull ? null : undefined;
      }
      return parsed;
    }
    case "date":
      return value;
    default:
      return value;
  }
}

export function EntityFormModal({
  title,
  isOpen,
  onClose,
  fields,
  initialValues,
  onSubmit,
  isSubmitting = false,
  primaryActionLabel = "保存",
}: EntityFormModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setValues({});
      setUploading({});
      setUploadProgress({});
      setPreviews({});
      return;
    }

    const nextValues: Record<string, string> = {};
    fields.forEach((field) => {
      nextValues[field.name] = formatInitialValue(
        field,
        initialValues?.[field.name],
      );
    });
    setValues(nextValues);
  }, [fields, initialValues, isOpen]);

  const handleChange = useCallback((name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleFileSelect = useCallback(
    async (fieldName: string, file: File) => {
      // Generate local preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setPreviews((prev) => ({ ...prev, [fieldName]: preview }));
      };
      reader.readAsDataURL(file);

      // Then upload
      setUploading((prev) => ({ ...prev, [fieldName]: true }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

      try {
        const formData = new FormData();
        formData.append("file", file);

        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          currentProgress = Math.min(currentProgress + 30, 90);
          setUploadProgress((prev) => ({ ...prev, [fieldName]: currentProgress }));
        }, 100);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));

        const targetField = fields.find((f) => f.name === fieldName)?.uploadFieldName || fieldName;
        handleChange(targetField, data.url);

        setTimeout(() => {
          setUploading((prev) => ({ ...prev, [fieldName]: false }));
          setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
        }, 500);
      } catch (error) {
        console.error("Upload error:", error);
        alert(
          error instanceof Error ? error.message : "Upload failed"
        );
        setUploading((prev) => ({ ...prev, [fieldName]: false }));
        setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
      }
    },
    [fields, handleChange],
  );

  const handleClearFile = useCallback((fieldName: string) => {
    const targetField = fields.find((f) => f.name === fieldName)?.uploadFieldName || fieldName;
    handleChange(targetField, "");
    setPreviews((prev) => ({ ...prev, [fieldName]: "" }));
  }, [fields, handleChange]);

  const isSubmitDisabled = useMemo(() => {
    return fields.some((field) => {
      if (!field.required) return false;
      const value = values[field.name];
      if (field.type === "number") {
        return value === "" || Number.isNaN(Number(value));
      }
      return (value ?? "").trim().length === 0;
    });
  }, [fields, values]);

  const handleSubmit = useCallback(async () => {
    const normalized: Record<string, any> = {};
    fields.forEach((field) => {
      const raw = values[field.name] ?? "";
      normalized[field.name] = normalizeValue(field, raw.trim());
    });
    await onSubmit(normalized);
  }, [fields, onSubmit, values]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {fields.map((field) => {
            const fieldType = field.type ?? DEFAULT_TYPE;
            const value = values[field.name] ?? "";
            const preview = previews[field.name];
            const isUploading = uploading[field.name];
            const progress = uploadProgress[field.name] ?? 0;

            if (fieldType === "file") {
              return (
                <div key={field.name} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium flex-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {value && !isUploading && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-red-500"
                        onPress={() => handleClearFile(field.name)}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-end gap-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept={field.accept || "image/*"}
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          if (file) {
                            handleFileSelect(field.name, file);
                          }
                        }}
                        disabled={isUploading}
                        className="hidden"
                      />
                      <Button
                        as="span"
                        color="primary"
                        variant="flat"
                        size="sm"
                        startContent={<Upload size={16} />}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? "上传中..." : "选择文件"}
                      </Button>
                    </label>

                    {preview && (
                      <Image
                        src={preview}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded border border-gray-300"
                      />
                    )}
                  </div>

                  {progress > 0 && progress < 100 && (
                    <Progress
                      value={progress}
                      size="sm"
                      color="primary"
                      className="w-full"
                    />
                  )}

                  {field.description && (
                    <p className="text-xs text-gray-500">{field.description}</p>
                  )}
                </div>
              );
            }

            const commonProps = {
              label: field.label,
              placeholder: field.placeholder,
              isRequired: field.required,
              value,
              onValueChange: (nextValue: string) =>
                handleChange(field.name, nextValue),
            };

            if (fieldType === "textarea") {
              return (
                <div key={field.name} className="flex flex-col gap-1">
                  <Textarea minRows={4} {...commonProps} />
                  {field.description ? (
                    <p className="text-xs text-gray-500">{field.description}</p>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={field.name} className="flex flex-col gap-1">
                <Input
                  type={fieldType === "number" ? "number" : fieldType}
                  {...commonProps}
                />
                {field.description ? (
                  <p className="text-xs text-gray-500">{field.description}</p>
                ) : null}
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            取消
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={isSubmitDisabled || isSubmitting}
            isLoading={isSubmitting}
          >
            {primaryActionLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
