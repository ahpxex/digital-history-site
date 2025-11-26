import type { Icon } from "@phosphor-icons/react";

import { TableIcon } from "@phosphor-icons/react";

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
    groupLabel: "Digital History",
    items: [
      { label: "Papers", href: "/papers", icon: TableIcon },
      { label: "Featured Cases", href: "/featured-cases", icon: TableIcon },
      { label: "Research Tools", href: "/research-tools", icon: TableIcon },
      { label: "Datasets", href: "/datasets", icon: TableIcon },
      {
        label: "Dataset Chart Data",
        href: "/datasets/chart-data",
        icon: TableIcon,
      },
      { label: "Dynamic News", href: "/dynamic-news", icon: TableIcon },
      { label: "Partners", href: "/partners", icon: TableIcon },
    ],
  },
];

export const bottomMenuItems: MenuItem[] = [];
