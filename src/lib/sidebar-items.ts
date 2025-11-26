import type { Icon } from "@phosphor-icons/react";

import {
  TableIcon,
} from "@phosphor-icons/react";

export interface MenuItem {
  label: string;
  href: string;
  icon: Icon;
}

export interface MenuGroup {
  groupLabel?: string;
  items: MenuItem[];
}

export const mainMenuItems: MenuGroup[] = [
  {
    groupLabel: "Table",
    items: [
      { label: "Simple", href: "/tables/simple", icon: TableIcon },
      { label: "Pagination", href: "/tables/pagination", icon: TableIcon },
      { label: "Actions", href: "/tables/actions", icon: TableIcon },
      { label: "Rich Cell", href: "/tables/rich-cell", icon: TableIcon },
      { label: "Selectables", href: "/tables/selectables", icon: TableIcon },
    ],
  },
];

export const bottomMenuItems: MenuItem[] = [];
