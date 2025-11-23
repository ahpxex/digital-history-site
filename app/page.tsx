import { homeContent } from "@/data/home-content";
import { AnnouncementBar } from "@/features/home/announcement-bar";
import { DatasetVisualization } from "@/features/home/dataset-visualization";
import { FeaturedCases } from "@/features/home/featured-cases";
import { HeroSection } from "@/features/home/hero-section";
import { NewsSection } from "@/features/home/news-section";
import { PartnersSection } from "@/features/home/partners";
import { StatsGrid } from "@/features/home/stats-grid";
import { ToolsShowcase } from "@/features/home/tools-showcase";

export default function HomePage() {
  const content = homeContent;
  const frontierSummary = `每周更新 ${content.news.frontier.length} 篇`;

  return (
    <>
      {content.announcement ? (
        <AnnouncementBar {...content.announcement} />
      ) : null}
      <HeroSection hero={content.hero} />
      <StatsGrid stats={content.stats} />
      <FeaturedCases
        cases={content.featuredCases}
        eyebrow={content.featuredCopy.eyebrow}
        title={content.featuredCopy.title}
        viewAllLabel={content.featuredCopy.viewAllLabel}
        learnMoreLabel={content.featuredCopy.learnMoreLabel}
      />
      <ToolsShowcase
        tools={content.tools}
        title={content.toolsCopy.title}
        subtitle={content.toolsCopy.subtitle}
      />
      <DatasetVisualization
        datasets={content.datasets}
        title={content.datasetCopy.title}
        subtitle={content.datasetCopy.subtitle}
        topicTitle={content.datasetCopy.topicTitle}
        regionTitle={content.datasetCopy.regionTitle}
      />
      <NewsSection
        news={content.news}
        frontierLabel={content.newsCopy.frontierLabel}
        frontierSummary={frontierSummary}
        eventsLabel={content.newsCopy.eventsLabel}
        eventsSummary={content.newsCopy.eventsSummary}
        learnMoreLabel={content.newsCopy.learnMoreLabel}
      />
      <PartnersSection
        partners={content.partners}
        title={content.partnersCopy.title}
        subtitle={content.partnersCopy.subtitle}
      />
    </>
  );
}
