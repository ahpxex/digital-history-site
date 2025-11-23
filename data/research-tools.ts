export type ResearchTool = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  duration: string;
  complexity: "快速部署" | "进阶协作" | "实验性";
  featuredStack: string[];
  steps: { title: string; detail: string }[];
  outcomes: string[];
  resources: { label: string; url: string }[];
};

export const researchTools: ResearchTool[] = [
  {
    slug: "semantic-playground",
    title: "语义标注沙箱",
    summary: "面向跨语种材料的批量标注，并支持自动对齐。",
    description:
      "提供可视化实体管理、BERT Prompt 管线与质检仪表盘，适合需要快速上线的语义标注项目。",
    duration: "2 周交付",
    complexity: "快速部署",
    featuredStack: ["spaCy", "Weaviate", "Next.js"],
    steps: [
      { title: "样本导入", detail: "解析 PDF、音频转写，自动生成实体初稿" },
      { title: "模型共标", detail: "支持多人协作与冲突解决" },
      { title: "语料 API", detail: "开放 GraphQL 查询接口" },
    ],
    outcomes: [
      "提供打包的多语言实体词典",
      "对接搜索与可视化前端",
    ],
    resources: [
      { label: "演示环境", url: "https://digital-history.example.com/tools/semantic-playground" },
      { label: "开放 API", url: "https://digital-history.example.com/api/semantic-playground" },
    ],
  },
  {
    slug: "timeline-studio",
    title: "多线索历史时间轴",
    summary: "为多角色、多地理坐标的历史叙事提供流式渲染。",
    description:
      "内置事件对齐算法与 WebGL 渲染器，兼容 Neo4j、Supabase 等数据源，适合展陈与课堂演示。",
    duration: "4 周交付",
    complexity: "进阶协作",
    featuredStack: ["Neo4j", "Deck.gl", "Cloudflare D1"],
    steps: [
      { title: "叙事拆解", detail: "建立角色、地点与事件的映射" },
      { title: "流式渲染", detail: "WebGL Timeline 与地图联动" },
      { title: "协作发布", detail: "多语言字幕与脚本导出" },
    ],
    outcomes: [
      "自动生成多分辨率视频素材",
      "支持展陈现场的互动投影",
    ],
    resources: [
      { label: "模板数据", url: "https://digital-history.example.com/tools/timeline-studio" },
      { label: "WebGL 指南", url: "https://digital-history.example.com/docs/timeline" },
    ],
  },
  {
    slug: "data-trust-audit",
    title: "数据可信度审计",
    summary: "用数据指纹和溯源报告降低引用风险。",
    description:
      "结合可重复的采集脚本、版本快照与可信存证，帮助团队生成“引用即服务”的审计结果。",
    duration: "3 周交付",
    complexity: "实验性",
    featuredStack: ["dbt", "DuckDB", "Supabase"],
    steps: [
      { title: "采集验证", detail: "运行自动抽检与偏差分析" },
      { title: "指纹生成", detail: "为每份数据生成 CID" },
      { title: "溯源报告", detail: "输出带图表的交互报告" },
    ],
    outcomes: [
      "为论文与展览提供引用编号",
      "可对接链上存证或 DOI 服务",
    ],
    resources: [
      { label: "报告样例", url: "https://digital-history.example.com/tools/data-trust-audit" },
      { label: "CLI 脚本", url: "https://digital-history.example.com/docs/data-trust-cli" },
    ],
  },
];

export function getToolBySlug(slug: string) {
  return researchTools.find((tool) => tool.slug === slug);
}
