import { caseStudies } from "@/data/case-studies";
import { frontierArticles, upcomingEvents } from "@/data/news-feed";
import { researchTools } from "@/data/research-tools";
import type { Paper } from "@/lib/api/types";

export type HomeContent = {
  announcement?: {
    message: string;
    link: string;
    linkLabel: string;
    dismissLabel: string;
  } | null;
  hero: {
    badge: string;
    title: string;
    description: string;
    videoSrc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrimaryHref: string;
    ctaSecondaryHref: string;
    highlights: {
      label: string;
      value: number;
      suffix?: string;
    }[];
  };
  stats: {
    id: string;
    label: string;
    value: number;
    unit?: string;
    description: string;
  }[];
  featuredCases: Array<
    Pick<Paper, "title" | "abstract" | "region" | "theme" | "year"> & {
      id: string;
      image: string;
      tags: string[];
      link: string;
    }
  >;
  tools: {
    id: string;
    title: string;
    description: string;
    steps: string[];
    link: string;
    badge: string;
    duration: string;
  }[];
  datasets: {
    topics: { name: string; value: number; fill: string }[];
    regions: { name: string; value: number; fill: string }[];
  };
  news: {
    frontier: {
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      link: string;
      tags: string[];
    }[];
    events: {
      id: string;
      slug: string;
      title: string;
      location: string;
      date: string;
      link: string;
    }[];
  };
  partners: {
    id: string;
    name: string;
    description: string;
    country: string;
    url: string;
  }[];
  featuredCopy: {
    eyebrow: string;
    title: string;
    viewAllLabel: string;
    learnMoreLabel: string;
  };
  toolsCopy: {
    title: string;
    subtitle: string;
  };
  datasetCopy: {
    title: string;
    subtitle: string;
    topicTitle: string;
    regionTitle: string;
  };
  newsCopy: {
    frontierLabel: string;
    eventsLabel: string;
    eventsSummary: string;
    learnMoreLabel: string;
  };
  partnersCopy: {
    title: string;
    subtitle: string;
  };
};

const sharedTopics = [
  { name: "档案数字化", value: 32, fill: "oklch(0.65 0.2 30)" },
  { name: "口述史AI", value: 21, fill: "oklch(0.63 0.16 120)" },
  { name: "城市记忆", value: 27, fill: "oklch(0.62 0.18 200)" },
  { name: "冲突复原", value: 18, fill: "oklch(0.58 0.2 300)" },
  { name: "气候史", value: 16, fill: "oklch(0.71 0.18 80)" },
];

const sharedRegions = [
  { name: "东亚", value: 42, fill: "oklch(0.72 0.2 60)" },
  { name: "北美", value: 36, fill: "oklch(0.68 0.2 15)" },
  { name: "欧洲", value: 31, fill: "oklch(0.63 0.18 240)" },
  { name: "南美", value: 14, fill: "oklch(0.56 0.18 350)" },
  { name: "非洲", value: 11, fill: "oklch(0.53 0.17 20)" },
];

export const homeContent: HomeContent = {
  announcement: null,
  hero: {
    badge: "全球数字史学案例数据库",
    title: "以实验驱动的数字史学案例数据库",
    description:
      "连通全球 200+ 研究团队的案例、工具、数据集与资源，支持跨语、跨区域的历史研究协作。",
    videoSrc: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    ctaPrimary: "探索案例",
    ctaSecondary: "研究工具",
    ctaPrimaryHref: "/cases",
    ctaSecondaryHref: "/tools",
    highlights: [
      { label: "收录案例", value: 248, suffix: "+" },
      { label: "开放数据集", value: 37 },
      { label: "合作机构", value: 62 },
    ],
  },
  stats: [
    {
      id: "01",
      label: "跨语言检索",
      value: 12,
      unit: "种语言",
      description: "覆盖主要学术语种，实现摘要与标签的双语比对。",
    },
    {
      id: "02",
      label: "平均更新",
      value: 8,
      unit: "天",
      description: "自动同步全球资讯源与会议公告。",
    },
    {
      id: "03",
      label: "开放 API",
      value: 3,
      unit: "个",
      description: "支持项目检索、数据集调用与引用分析。",
    },
  ],
  featuredCases: caseStudies.slice(0, 3).map((item) => ({
    id: item.slug,
    title: item.title,
    abstract: item.summary,
    tags: item.tags,
    region: item.region,
    theme: item.theme,
    year: item.year,
    image: item.heroImage,
    link: "/cases/" + item.slug,
  })),
  tools: researchTools.map((tool) => ({
    id: tool.slug,
    title: tool.title,
    description: tool.summary,
    steps: tool.steps.map((step) => step.title),
    link: "/tools/" + tool.slug,
    badge: tool.complexity,
    duration: tool.duration,
  })),
  datasets: {
    topics: sharedTopics,
    regions: sharedRegions,
  },
  news: {
    frontier: frontierArticles.map((article) => ({
      id: article.slug,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      link: "/news/" + article.slug,
      tags: article.tags,
    })),
    events: upcomingEvents.map((event) => ({
      id: event.slug,
      slug: event.slug,
      title: event.title,
      location: event.location,
      date: event.date,
      link: "/events/" + event.slug,
    })),
  },
  partners: [
    {
      id: "partner-1",
      name: "Digital History Lab",
      description: "数字史学实验室 · 负责核心数据标准与 API。",
      country: "China",
      url: "https://digital-history.example.com",
    },
    {
      id: "partner-2",
      name: "Global Archives Alliance",
      description: "跨国档案馆联盟 · 提供高分辨率档案与培训。",
      country: "EU",
      url: "https://archives-alliance.example.com",
    },
    {
      id: "partner-3",
      name: "Urban Memory Studio",
      description: "城市记忆工作室 · 与地方博物馆共建展陈。",
      country: "Singapore",
      url: "https://urban-memory.example.com",
    },
  ],
  featuredCopy: {
    eyebrow: "案例速览",
    title: "精选案例",
    viewAllLabel: "查看全部",
    learnMoreLabel: "了解详情",
  },
  toolsCopy: {
    title: "研究工具",
    subtitle: "面向数字史学项目的精选方法论与管线",
  },
  datasetCopy: {
    title: "数据集洞察",
    subtitle: "使用可视化快速理解主题热度与地区覆盖",
    topicTitle: "主题热度",
    regionTitle: "地区覆盖",
  },
  newsCopy: {
    frontierLabel: "前沿追踪",
    eventsLabel: "会议资讯",
    eventsSummary: "即将到来的会议与工作坊",
    learnMoreLabel: "了解详情",
  },
  partnersCopy: {
    title: "合作机构",
    subtitle: "与全球高校、研究机构与档案馆共建数字史学生态",
  },
};
