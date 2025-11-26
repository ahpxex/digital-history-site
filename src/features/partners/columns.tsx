import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { ActionMenu } from "@/infra/ui";
import type { Partner } from "./types";

export interface PartnersTableContext {
  onEdit: (partner: Partner) => void;
  onDelete: (id: number) => void;
}

export function createPartnersColumns(
  context: PartnersTableContext,
): ColumnDef<Partner>[] {
  return [
    {
      accessorKey: "name",
      header: "合作伙伴",
      cell: (info) => {
        const partner = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800 bg-white">
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{partner.name}</span>
              <span className="text-xs text-gray-500">
                {partner.websiteUrl}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "websiteUrl",
      header: "网站",
      cell: (info) => (
        <Link
          href={info.getValue() as string}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline"
        >
          访问
        </Link>
      ),
    },
    {
      id: "actions",
      header: "操作",
      cell: (info) => {
        const partner = info.row.original;
        return (
          <ActionMenu
            onEdit={() => context.onEdit(partner)}
            onDelete={() => context.onDelete(partner.id)}
          />
        );
      },
    },
  ];
}
