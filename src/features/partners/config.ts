import type { TableConfig, TableMeta } from "@/infra/table";
import { createPartnersColumns, type PartnersTableContext } from "./columns";
import { PARTNERS_RESOURCE } from "./repository";
import type { Partner } from "./types";

export const partnersMeta: TableMeta = {
  title: "合作机构",
  description: "维护合作伙伴与其展示信息。",
};

export function createPartnersConfig(
  context: PartnersTableContext,
): TableConfig<Partner> {
  return {
    resource: PARTNERS_RESOURCE,
    columns: createPartnersColumns(context),
    enableSearch: true,
    searchPlaceholder: "搜索合作伙伴...",
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  };
}
