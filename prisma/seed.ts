import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedPapers() {
  await prisma.paper.createMany({
    data: [
      {
        docTitle: "Mapping the Silk Road: Digital Cartography in History",
        author: "Liang Chen",
        authorAffiliation: "Beijing Digital Humanities Lab",
        docAbstract:
          "Demonstrates how GIS pipelines can reconstruct ancient trade routes with multi-source archival material.",
        docKeywords: "digital cartography, silk road, GIS",
        topic: "Spatial Analytics",
        methods: "GIS, network analysis",
        tools: "QGIS, Kepler.gl",
        sourcePublisher: "Journal of Digital History",
        sourceLevel: "A",
        timePublished: "2023-11",
        worker: "Team A",
      },
      {
        docTitle: "Knowledge Graphs for Qing Dynasty Archives",
        author: "Yuting Wang",
        authorAffiliation: "HK Institute of Humanities",
        docAbstract:
          "Explores entity resolution workflows applied to Qing dynasty bureaucratic documents via graph databases.",
        docKeywords: "knowledge graph, Qing dynasty, graph DB",
        topic: "Semantic Modeling",
        methods: "entity extraction, ontology design",
        tools: "Neo4j, spaCy",
        sourcePublisher: "Digital Scholarship Quarterly",
        sourceLevel: "B",
        timePublished: "2024",
        worker: "Team B",
      },
      {
        docTitle: "Audio Restoration Pipelines for Oral History",
        author: "Elena Rodriguez",
        authorAffiliation: "Lisbon Sound Archive",
        docAbstract:
          "Presents reproducible Bun-based workflows to denoise and annotate large oral history collections.",
        docKeywords: "audio, oral history, restoration",
        topic: "Media Preservation",
        methods: "signal processing, cloud rendering",
        tools: "Audacity, WebAudio API",
        sourcePublisher: "International Journal of Digital Heritage",
        sourceLevel: "A",
        timePublished: "2022-05",
        worker: "Team C",
      },
    ],
  });
}

async function seedFeaturedCases() {
  await prisma.featuredCase.createMany({
    data: [
      {
        title: "Maritime Asia Explorer",
        type: "Visualization",
        description:
          "Interactive voyage explorer built on Recharts and deck.gl visual layers.",
        tags: "viz,sea,trade",
        url: "https://example.com/maritime",
        institution: "National Museum of Asian History",
        sortOrder: 1,
      },
      {
        title: "City Memory Vault",
        type: "Archive",
        description:
          "Community contributed oral histories with semantic search powered by Prisma.",
        tags: "oral history,archive",
        url: "https://example.com/memory",
        institution: "Lisbon Urban Lab",
        sortOrder: 2,
      },
    ],
  });
}

async function seedResearchTools() {
  await prisma.researchTool.createMany({
    data: [
      {
        name: "ChronoClean",
        category: "Data Prep",
        description:
          "Time-series normalization and cleaning toolkit for historical ledgers.",
        developer: "Chrono Labs",
        url: "https://chronolabs.io",
      },
      {
        name: "Narrative Lens",
        category: "Annotation",
        description:
          "Collaborative annotation UI optimized for multilingual manuscripts.",
        developer: "Narrative Lab",
        url: "https://narrativelens.app",
      },
    ],
  });
}

async function seedDatasets() {
  await prisma.datasetItem.createMany({
    data: [
      {
        title: "Republic Era Census",
        type: "Tabular",
        description:
          "Digitized population data across six provinces between 1920-1935.",
        tags: "population,census,china",
        url: "https://data.example.com/census",
        institution: "East Asia Data Center",
      },
      {
        title: "Colonial Port Logs",
        type: "Text",
        description:
          "Harbor records with cargo manifests for 1800s Southeast Asia.",
        tags: "trade,port,sea",
        url: "https://data.example.com/ports",
        institution: "Maritime Library",
      },
    ],
  });

  await prisma.datasetChartData.createMany({
    data: [
      { chartType: "datasetsByType", label: "Tabular", value: 18 },
      { chartType: "datasetsByType", label: "Text", value: 12 },
      { chartType: "datasetsByType", label: "Spatial", value: 7 },
      { chartType: "institutions", label: "Museums", value: 6 },
      { chartType: "institutions", label: "Universities", value: 9 },
    ],
  });
}

async function seedDynamics() {
  await prisma.dynamicNews.createMany({
    data: [
      {
        title: "Digital Heritage Forum 2025",
        issue: "Vol. 12",
        coverUrl: "https://images.example.com/forum-2025.jpg",
        description:
          "Call for papers focused on AI-assisted restoration workflows.",
        link: "https://forum.example.com/cfp",
        publishDate: new Date("2025-03-01"),
      },
      {
        title: "Open Archives Hackathon",
        issue: "Special Issue",
        coverUrl: "https://images.example.com/hackathon.jpg",
        description: "48-hour sprint to enrich national archive metadata.",
        link: "https://hackathon.example.com",
        publishDate: new Date("2024-09-15"),
      },
    ],
  });
}

async function seedPartners() {
  await prisma.partner.createMany({
    data: [
      {
        name: "Digital Silk Lab",
        logoUrl: "https://images.example.com/logos/dsl.png",
        websiteUrl: "https://digitalsilklab.org",
      },
      {
        name: "Heritage Cloud Collective",
        logoUrl: "https://images.example.com/logos/hcc.png",
        websiteUrl: "https://heritagecloud.co",
      },
    ],
  });
}

async function main() {
  // Clear data to keep seeds idempotent
  await prisma.$transaction([
    prisma.datasetChartData.deleteMany(),
    prisma.datasetItem.deleteMany(),
    prisma.featuredCase.deleteMany(),
    prisma.dynamicNews.deleteMany(),
    prisma.researchTool.deleteMany(),
    prisma.partner.deleteMany(),
    prisma.paper.deleteMany(),
  ]);

  await seedPapers();
  await seedFeaturedCases();
  await seedResearchTools();
  await seedDatasets();
  await seedDynamics();
  await seedPartners();
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
