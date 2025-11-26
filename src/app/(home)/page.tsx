import { getTrpcCaller } from "@/server/api/server-client";
import { HomeSearch } from "@/features/home/components/HomeSearch";
import { FeaturedCasesGrid } from "@/features/home/components/FeaturedCasesGrid";
import { DatasetList } from "@/features/home/components/DatasetList";
import { ResearchToolsList } from "@/features/home/components/ResearchToolsList";
import { DynamicNewsList } from "@/features/home/components/DynamicNewsList";
import { PartnersGrid } from "@/features/home/components/PartnersGrid";

export default async function HomePage() {
  const trpc = await getTrpcCaller();
  
  // Fetch data for all sections
  const [
    featuredCases,
    datasets,
    researchTools,
    dynamicNews,
    partners
  ] = await Promise.all([
    trpc.featuredCases.list({ pageSize: 6, page: 1, sortOrder: "desc" }),
    trpc.datasetItems.list({ pageSize: 6, page: 1, sortBy: "title", sortOrder: "asc" }),
    trpc.researchTools.list({ pageSize: 6, page: 1, sortBy: "name", sortOrder: "asc" }),
    trpc.dynamicNews.list({ pageSize: 6, page: 1, sortBy: "publishDate", sortOrder: "desc" }),
    trpc.partners.list({ pageSize: 20, page: 1, sortBy: "name", sortOrder: "asc" })
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 bg-gradient-to-b from-background to-content2/20">
        <div className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
            数字历史
          </h1>
          <p className="text-xl text-default-500 max-w-2xl mx-auto font-light">
            发现助力数字人文的精选案例、研究工具和数据集。
          </p>
        </div>
        
        <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <HomeSearch />
        </div>
      </div>

      <div className="space-y-24 py-12">
        {/* Featured Cases Section */}
        <section id="featured-cases" className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 text-center md:text-left border-b border-divider pb-4">
            <h2 className="text-3xl font-bold tracking-tight">精选案例</h2>
            <p className="text-default-500 mt-2">
              探索数字历史领域的典范项目与方法论。
            </p>
          </div>
          <FeaturedCasesGrid cases={featuredCases.data} />
        </section>

        {/* Datasets Section */}
        <section id="datasets" className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 text-center md:text-left border-b border-divider pb-4">
            <h2 className="text-3xl font-bold tracking-tight">数据集</h2>
            <p className="text-default-500 mt-2">
              可供下载和分析的结构化历史数据。
            </p>
          </div>
          <DatasetList datasets={datasets.data} />
        </section>

        {/* Research Tools Section */}
        <section id="research-tools" className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 text-center md:text-left border-b border-divider pb-4">
            <h2 className="text-3xl font-bold tracking-tight">研究工具</h2>
            <p className="text-default-500 mt-2">
              辅助历史数据分析与可视化的软件与平台。
            </p>
          </div>
          <ResearchToolsList tools={researchTools.data} />
        </section>

        {/* Development Dynamics Section */}
        <section id="dynamic-news" className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 text-center md:text-left border-b border-divider pb-4">
            <h2 className="text-3xl font-bold tracking-tight">发展动态</h2>
            <p className="text-default-500 mt-2">
              最新新闻、学术出版物与社区动态。
            </p>
          </div>
          <DynamicNewsList news={dynamicNews.data} />
        </section>

        {/* Partners Section */}
        <section id="partners" className="container mx-auto px-6 max-w-7xl pb-20">
          <div className="mb-10 text-center md:text-left border-b border-divider pb-4">
            <h2 className="text-3xl font-bold tracking-tight">合作机构</h2>
            <p className="text-default-500 mt-2">
              与领先机构和研究中心的合作。
            </p>
          </div>
          <PartnersGrid partners={partners.data} />
        </section>
      </div>
    </div>
  );
}
