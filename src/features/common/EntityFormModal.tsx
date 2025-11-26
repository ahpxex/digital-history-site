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
} from "@heroui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type FieldType = "text" | "textarea" | "number" | "url" | "date";

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  allowNull?: boolean;
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

  useEffect(() => {
    if (!isOpen) {
      setValues({});
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
