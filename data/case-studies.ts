import type { Paper } from "@/lib/api/types";

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  year: number;
  region: Paper["region"];
  theme: Paper["theme"];
  heroImage: string;
  institution: string;
  tags: string[];
  stats: { label: string; value: string; hint?: string }[];
  sections: { heading: string; body: string[] }[];
  resources: { label: string; url: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "shanghai-memory",
    title: "上海城市记忆图谱",
    subtitle: "用语义标注串联 120TB 城市影像与口述史",
    summary:
      "围绕上海城市更新档案，构建跨媒体知识图谱，将 1950-2020 年的影像、口述史、传感器数据串联为可检索的记忆图谱。",
    year: 2024,
    region: "east-asia",
    theme: "urban-memory",
    heroImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    institution: "数字史学实验室 × 同济城市数据中心",
    tags: ["城市史", "知识图谱", "语义检索"],
    stats: [
      { label: "影像素材", value: "120TB", hint: "高速数字化" },
      { label: "口述史", value: "680 小时" },
      { label: "语种", value: "6", hint: "自动对齐" },
    ],
    sections: [
      {
        heading: "项目背景",
        body: [
          "团队需要在短时间内整合散落于档案馆、社区中心与城市传感器的数据。传统的目录式检索无法满足多模态研究需求，因而搭建了语义层的知识图谱。",
        ],
      },
      {
        heading: "方法亮点",
        body: [
          "通过 Transformer 模型完成影像与文本的互指，共享统一的实体与事件本体。",
          "结合城市物联网的实时指标，生成时间切片，支持研究者播放历史“叙事路径”。",
        ],
      },
      {
        heading: "成果与影响",
        body: [
          "在 2024 年上海城市记忆展上线交互式地图，参观者可按地块探索故事。",
          "研究团队将图谱 API 开放给学界，目前已支撑 12 篇论文初稿。",
        ],
      },
    ],
    resources: [
      { label: "展陈 Demo", url: "https://digital-history.example.com/cases/shanghai" },
      { label: "API 文档", url: "https://digital-history.example.com/docs/shanghai-api" },
    ],
  },
  {
    slug: "atlantic-whale-network",
    title: "北大西洋捕鲸网络",
    subtitle: "联结航海日志、遥感数据与生态模型",
    summary:
      "北欧海洋史中心利用 18-19 世纪的航海日志与遥感推算船队路径，结合生态模型评估捕鲸活动对海洋的长期影响。",
    year: 2023,
    region: "europe",
    theme: "marine-ecology",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    institution: "北欧海洋史中心",
    tags: ["海洋史", "生态模拟", "遥感"],
    stats: [
      { label: "航海日志", value: "3,200 册" },
      { label: "重建航线", value: "480 条" },
      { label: "生态指标", value: "14 项" },
    ],
    sections: [
      {
        heading: "档案数字化",
        body: [
          "志愿者拍摄的航海日志存在大量异形字符，团队训练了手写体 OCR，并引入句法解析获得船长、坐标与天气等字段。",
        ],
      },
      {
        heading: "遥感校验",
        body: [
          "利用卫星反演的海表温度与冰盖变化校对日志中的路线，构建“可信区间”。",
          "数据最终汇入 Neo4j，形成可查询的航路网络。",
        ],
      },
      {
        heading: "生态评估",
        body: [
          "与生态学家合作，将航线与鲸类族群观测结合，推演不同捕捞策略下的栖息地受损程度。",
        ],
      },
    ],
    resources: [
      { label: "网络图谱", url: "https://digital-history.example.com/cases/atlantic" },
      { label: "遥感处理脚本", url: "https://digital-history.example.com/code/whale-routes" },
    ],
  },
  {
    slug: "climate-voices",
    title: "气候史记忆碎片",
    subtitle: "跨语种口述史与 AI 转录的协作流程",
    summary:
      "Global Climate Voices 团队与 12 个社区电台合作，搭建低带宽可用的录音上传与自动转录服务，记录全球极端气候记忆。",
    year: 2025,
    region: "global",
    theme: "climate-history",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    institution: "Global Climate Voices",
    tags: ["口述史", "AI", "低带宽"],
    stats: [
      { label: "访谈语种", value: "9" },
      { label: "社区伙伴", value: "12" },
      { label: "转录延迟", value: "< 2 小时" },
    ],
    sections: [
      {
        heading: "协作架构",
        body: [
          "设计短信指令即可创建任务的工作流，确保低网速地区也能提交录音。",
        ],
      },
      {
        heading: "语义检索",
        body: [
          "通过多语 ASR + Embedding，将访谈片段推送到语义沙箱，研究者可按主题拼接叙事。",
        ],
      },
      {
        heading: "影响",
        body: [
          "成果被 COP30 青年工作坊引用，用于展示气候叙事不平衡问题。",
        ],
      },
    ],
    resources: [
      { label: "访谈片段合集", url: "https://digital-history.example.com/cases/climate" },
      { label: "API SDK", url: "https://digital-history.example.com/sdk/climate-voices" },
    ],
  },
];

export function getCaseBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
