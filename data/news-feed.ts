export type FrontierArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: string[];
  timeToRead: string;
};

export type UpcomingEvent = {
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  agenda: string[];
  registrationUrl: string;
};

export const frontierArticles: FrontierArticle[] = [
  {
    slug: "ai-oral-history",
    title: "生成式 AI 进入多语口述史噪声修复流程",
    excerpt:
      "MIT 与伦敦政经联合团队开源跨语音噪声数据集，并发布低资源语言的指令模板。",
    date: "2025-03-02",
    tags: ["口述史", "生成式 AI"],
    timeToRead: "6 min",
    body: [
      "新开源的数据集覆盖 9 种语言、320 小时的带噪声素材，配套提供 Hugging Face 上的模型权重。",
      "团队还发布了人工标注指南，解释如何在低带宽环境中快速完成质检。",
    ],
  },
  {
    slug: "metaverse-archaeology",
    title: "元宇宙考古实验室上线可交互沉船展厅",
    excerpt:
      "实时点云拼接呈现地中海沉船现场，并支持研究者远程标注，生成共享的三维备忘录。",
    date: "2025-02-18",
    tags: ["考古", "点云"],
    timeToRead: "4 min",
    body: [
      "展厅由 WebGPU 驱动，浏览器即可体验。研究者可在沉船模型上放置标记，与现实挖掘进度同步。",
      "开放的 WebSocket 接口允许各地团队上传自己的点云数据，自动完成格式转换。",
    ],
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: "dha-2025",
    title: "Digital Humanities Asia 2025",
    location: "新加坡",
    date: "2025-05-12",
    description:
      "聚焦生成式 AI 与历史研究，设有城市记忆、知识图谱与公共人文三大专题。",
    agenda: [
      "Day 1：青年学者工作坊",
      "Day 2：案例展映与工具演示",
      "Day 3：跨机构合作撮合",
    ],
    registrationUrl: "https://dha2025.org/register",
  },
  {
    slug: "oral-history-ai",
    title: "全球口述史与 AI 峰会",
    location: "蒙特利尔",
    date: "2025-06-03",
    description:
      "讨论 AI 在口述史采集、转录与伦理审查中的应用，推出跨语语音模型挑战赛。",
    agenda: [
      "Keynote：语音模型伦理",
      "实操：部署低带宽录音工具包",
      "圆桌：社区数据主权",
    ],
    registrationUrl: "https://oralhistory-ai.org/register",
  },
];

export function getArticleBySlug(slug: string) {
  return frontierArticles.find((item) => item.slug === slug);
}

export function getEventBySlug(slug: string) {
  return upcomingEvents.find((item) => item.slug === slug);
}
