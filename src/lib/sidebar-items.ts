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
    groupLabel: "数字历史",
    items: [
      { label: "论文", href: "/papers", icon: TableIcon },
      { label: "精选案例", href: "/featured-cases", icon: TableIcon },
      { label: "研究工具", href: "/research-tools", icon: TableIcon },
      { label: "数据集", href: "/datasets", icon: TableIcon },
      {
        label: "数据集图表数据",
        href: "/datasets/chart-data",
        icon: TableIcon,
      },
      { label: "动态新闻", href: "/dynamic-news", icon: TableIcon },
      { label: "合作伙伴", href: "/partners", icon: TableIcon },
    ],
  },
];

export const bottomMenuItems: MenuItem[] = [];
