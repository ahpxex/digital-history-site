import type { Paper } from "@/lib/api/types";

export const mockPapers: Paper[] = [
  {
    id: "dh-001",
    title: "上海城市记忆图谱",
    authors: ["数字史学实验室", "同济城市数据中心"],
    year: 2024,
    region: "east-asia",
    theme: "urban-memory",
    abstract:
      "整合 40 余个开放数据源，构建上海城市影像与口述史的跨媒介知识图谱，支持语义检索与展陈。",
    source: "/cases/shanghai-memory",
    doi: "10.1234/dh.2024.001",
  },
  {
    id: "dh-002",
    title: "北大西洋捕鲸网络",
    authors: ["北欧海洋史中心"],
    year: 2023,
    region: "europe",
    theme: "marine-ecology",
    abstract:
      "基于 18-19 世纪航海日志与遥感数据，重建捕鲸活动路线，揭示生态影响与贸易网络。",
    source: "/cases/atlantic-whale-network",
  },
  {
    id: "dh-003",
    title: "气候史记忆碎片",
    authors: ["Global Climate Voices"],
    year: 2025,
    region: "global",
    theme: "climate-history",
    abstract:
      "通过跨语种口述史与 AI 转录工具，记录不同社区对极端气候事件的记忆与行动。",
    source: "/cases/climate-voices",
  },
  {
    id: "dh-004",
    title: "数字丝绸之路媒体档案",
    authors: ["Silk Road Media Lab"],
    year: 2022,
    region: "central-asia",
    theme: "cross-border-trade",
    abstract:
      "构建沿线国家电视及电台节目档案的跨语种索引，探索贸易叙事的媒介变化。",
    source: "https://digital-history.example.com/cases/silkroad-media",
  },
  {
    id: "dh-005",
    title: "口述史去噪模型",
    authors: ["MIT Oral History Initiative"],
    year: 2025,
    region: "north-america",
    theme: "oral-history-ai",
    abstract:
      "联合 7 所高校发布多语种口述史噪声数据集，并训练可迁移的去噪大模型。",
    source: "https://digital-history.example.com/cases/mit-oral-ai",
  },
  {
    id: "dh-006",
    title: "非洲独立运动语料",
    authors: ["Pan-African DH Network"],
    year: 2021,
    region: "africa",
    theme: "political-history",
    abstract:
      "整理 1950-1975 年独立运动档案，利用 NLP 梳理跨国网络与政策主张。",
    source: "https://digital-history.example.com/cases/pan-africa",
  },
  {
    id: "dh-007",
    title: "亚马孙流域考察 VR",
    authors: ["Amazonia XR Studio"],
    year: 2024,
    region: "south-america",
    theme: "ecological-history",
    abstract:
      "结合 LiDAR 与水文模型，复原亚马孙考察路线，支持 VR 交互教学与科研。",
    source: "https://digital-history.example.com/cases/amazonia-xr",
  },
  {
    id: "dh-008",
    title: "柏林墙声景计划",
    authors: ["Sound of History Collective"],
    year: 2023,
    region: "europe",
    theme: "memory-studies",
    abstract:
      "收集上百位亲历者的声景记忆，利用声场重建重现冷战时期的城市感知。",
    source: "https://digital-history.example.com/cases/berlin-soundscape",
  },
];
