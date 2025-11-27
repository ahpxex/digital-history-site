import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedPapers() {
  await prisma.paper.createMany({
    data: [
      {
        docTitle: "基于深度学习的古籍文字识别研究",
        author: "张伟",
        authorAffiliation: "北京大学数字人文中心",
        docAbstract:
          "本文提出了一种基于CRNN的古籍文字识别方法，在《四库全书》样本集上达到了95%的准确率。",
        docKeywords: "深度学习, OCR, 古籍数字化, 卷积神经网络",
        topic: "人工智能与历史",
        methods: "深度学习, 图像处理",
        tools: "PyTorch, OpenCV",
        sourcePublisher: "数字人文研究",
        sourceLevel: "A",
        timePublished: "2024-01",
        worker: "文字识别组",
      },
      {
        docTitle: "明清档案的数字化与知识图谱构建",
        author: "李娜",
        authorAffiliation: "中国人民大学清史研究所",
        docAbstract:
          "探讨了如何利用Neo4j构建明清档案中的人物关系图谱，并分析了家族联姻网络。",
        docKeywords: "知识图谱, 明清档案, 社会网络分析",
        topic: "语义建模",
        methods: "实体抽取, 关系抽取, 图数据库",
        tools: "Neo4j, Python",
        sourcePublisher: "历史地理",
        sourceLevel: "B",
        timePublished: "2023-11",
        worker: "图谱构建组",
      },
      {
        docTitle: "丝绸之路历史地理信息系统设计与实现",
        author: "王强",
        authorAffiliation: "兰州大学敦煌学研究所",
        docAbstract:
          "基于WebGIS技术，整合了丝绸之路沿线的考古遗址、地理环境和历史文献数据。",
        docKeywords: "GIS, 丝绸之路, 空间分析",
        topic: "空间分析",
        methods: "GIS, 空间数据库",
        tools: "ArcGIS, Vue.js",
        sourcePublisher: "中国历史地理论丛",
        sourceLevel: "A",
        timePublished: "2023-09",
        worker: "GIS组",
      },
      {
        docTitle: "口述历史的数字化存储与检索技术",
        author: "刘洋",
        authorAffiliation: "南京大学历史学院",
        docAbstract:
          "针对海量口述历史录音数据，研究了基于语音识别的自动索引和全文检索系统。",
        docKeywords: "口述历史, 语音识别, 信息检索",
        topic: "媒体保存",
        methods: "ASR, NLP",
        tools: "Kaldi, Elasticsearch",
        sourcePublisher: "档案学通讯",
        sourceLevel: "B",
        timePublished: "2022-12",
        worker: "多媒体组",
      },
      {
        docTitle: "清明上河图的数字化复原与交互展示",
        author: "赵敏",
        authorAffiliation: "浙江大学文化遗产研究院",
        docAbstract:
          "利用三维建模技术对清明上河图中的建筑和人物进行复原，并开发了VR交互系统。",
        docKeywords: "虚拟现实, 数字化复原, 文化遗产",
        topic: "虚拟再现",
        methods: "3D建模, 虚拟现实",
        tools: "Unity3D, 3ds Max",
        sourcePublisher: "文物保护与考古科学",
        sourceLevel: "A",
        timePublished: "2024-03",
        worker: "VR组",
      },
      {
        docTitle: "基于大数据的中国近代经济史研究",
        author: "陈刚",
        authorAffiliation: "复旦大学经济学院",
        docAbstract:
          "通过分析近代海关数据和商会档案，揭示了近代中国对外贸易的长期趋势。",
        docKeywords: "经济史, 大数据, 计量史学",
        topic: "定量历史",
        methods: "统计分析, 时间序列分析",
        tools: "R, Stata",
        sourcePublisher: "中国经济史研究",
        sourceLevel: "A",
        timePublished: "2023-06",
        worker: "数据分析组",
      },
      {
        docTitle: "数字人文视野下的唐诗宋词分析",
        author: "黄婷",
        authorAffiliation: "武汉大学信息管理学院",
        docAbstract:
          "利用文本挖掘技术分析了唐诗宋词中的意象分布和情感演变。",
        docKeywords: "文本挖掘, 唐诗宋词, 情感分析",
        topic: "文本分析",
        methods: "词频分析, 情感计算",
        tools: "Python, NLTK",
        sourcePublisher: "图书情报知识",
        sourceLevel: "B",
        timePublished: "2024-02",
        worker: "文本组",
      },
      {
        docTitle: "敦煌壁画的数字化保护与修复技术",
        author: "周平",
        authorAffiliation: "敦煌研究院",
        docAbstract:
          "介绍了高光谱成像技术在敦煌壁画病害检测和虚拟修复中的应用。",
        docKeywords: "数字化保护, 高光谱, 虚拟修复",
        topic: "文化遗产保护",
        methods: "光谱分析, 图像修复",
        tools: "Matlab, ENVI",
        sourcePublisher: "敦煌研究",
        sourceLevel: "A",
        timePublished: "2023-08",
        worker: "影像组",
      },
      {
        docTitle: "中国传统村落的数字化建档与虚拟漫游",
        author: "吴芳",
        authorAffiliation: "同济大学建筑与城市规划学院",
        docAbstract:
          "建立了中国传统村落的数字化档案，并实现了基于Web的虚拟漫游平台。",
        docKeywords: "传统村落, 数字化建档, 虚拟漫游",
        topic: "建筑遗产",
        methods: "倾斜摄影, WebGL",
        tools: "Three.js, Cesium",
        sourcePublisher: "建筑学报",
        sourceLevel: "B",
        timePublished: "2023-10",
        worker: "测绘组",
      },
      {
        docTitle: "历史文献的自动摘要生成算法研究",
        author: "郑杰",
        authorAffiliation: "哈尔滨工业大学计算机学院",
        docAbstract:
          "提出了一种结合BERT和图神经网络的历史文献长文本摘要生成模型。",
        docKeywords: "自动摘要, 深度学习, 自然语言处理",
        topic: "NLP应用",
        methods: "预训练模型, 图神经网络",
        tools: "TensorFlow, HuggingFace",
        sourcePublisher: "中文信息学报",
        sourceLevel: "A",
        timePublished: "2024-04",
        worker: "算法组",
      },
    ],
  });
}

async function seedFeaturedCases() {
  await prisma.featuredCase.createMany({
    data: [
      {
        title: "全景故宫",
        type: "可视化",
        description: "720度全景视角浏览故宫建筑群，支持VR模式体验。",
        tags: "VR, 故宫, 建筑",
        url: "https://example.com/gugong",
        institution: "故宫博物院",
        sortOrder: 1,
      },
      {
        title: "数字敦煌资源库",
        type: "档案",
        description: "收录敦煌石窟的高清壁画图像和详细解说资料。",
        tags: "壁画, 敦煌, 数字化",
        url: "https://example.com/dunhuang",
        institution: "敦煌研究院",
        sortOrder: 2,
      },
      {
        title: "中国历代人物传记资料库",
        type: "数据库",
        description: "涵盖中国历史上约50万人的生平、任官和亲属关系数据。",
        tags: "人物, 历史, 数据",
        url: "https://example.com/cbdb",
        institution: "哈佛大学 & 台湾中研院",
        sortOrder: 3,
      },
      {
        title: "中华文明时空基础架构",
        type: "可视化",
        description: "提供中国历史地理信息服务，支持历史地图叠加与查询。",
        tags: "GIS, 地图, 历史",
        url: "https://example.com/ccts",
        institution: "台湾中研院",
        sortOrder: 4,
      },
      {
        title: "清宫档案影像数据库",
        type: "档案",
        description: "数百万页清代宫廷档案的高清扫描件在线阅览。",
        tags: "档案, 清史, 影像",
        url: "https://example.com/qingarchives",
        institution: "第一历史档案馆",
        sortOrder: 5,
      },
      {
        title: "中国家谱总目数据库",
        type: "数据库",
        description: "收录全球范围内收藏的中国家谱目录信息。",
        tags: "家谱, 宗族, 目录",
        url: "https://example.com/genealogy",
        institution: "上海图书馆",
        sortOrder: 6,
      },
      {
        title: "民国图书数据库",
        type: "档案",
        description: "全文检索民国时期出版的各类图书资源。",
        tags: "民国, 图书, 全文",
        url: "https://example.com/republicbooks",
        institution: "国家图书馆",
        sortOrder: 7,
      },
      {
        title: "抗日战争特难死难者名录",
        type: "可视化",
        description: "以地图和时间轴形式展示抗战时期的死难者数据。",
        tags: "抗战, 历史, 记忆",
        url: "https://example.com/warmemory",
        institution: "抗战纪念馆",
        sortOrder: 8,
      },
      {
        title: "中国非物质文化遗产数字博物馆",
        type: "多媒体",
        description: "展示中国各级非物质文化遗产项目的图文音像资料。",
        tags: "非遗, 文化, 传承",
        url: "https://example.com/ich",
        institution: "中国艺术研究院",
        sortOrder: 9,
      },
      {
        title: "历代进士登科数据库",
        type: "数据库",
        description: "查询历代进士的科年、籍贯、三代等信息。",
        tags: "科举, 进士, 历史",
        url: "https://example.com/jinshi",
        institution: "浙江大学",
        sortOrder: 10,
      },
    ],
  });
}

async function seedResearchTools() {
  await prisma.researchTool.createMany({
    data: [
      {
        name: "Markus",
        category: "文本标记",
        description: "专为古籍文本设计的在线标记和实体识别平台。",
        developer: "莱顿大学",
        url: "https://dh.chinese-empires.eu/markus/",
      },
      {
        name: "DocuSky",
        category: "协作平台",
        description: "提供个人化的数字人文文献整理与协作研究环境。",
        developer: "台湾大学",
        url: "https://docusky.org.tw",
      },
      {
        name: "LoGaRT",
        category: "地方志工具",
        description: "中国地方志资源工具集，支持全文检索和数据提取。",
        developer: "马克斯普朗克研究所",
        url: "https://logart.mpiwg-berlin.mpg.de",
      },
      {
        name: "CBDB Query",
        category: "查询系统",
        description: "中国历代人物传记资料库的在线查询与分析接口。",
        developer: "哈佛大学",
        url: "https://projects.iq.harvard.edu/cbdb",
      },
      {
        name: "CHGIS",
        category: "地理信息",
        description: "提供中国历史行政区划的基础GIS数据下载。",
        developer: "复旦大学 & 哈佛大学",
        url: "https://cga.harvard.edu/chgis",
      },
      {
        name: "TextTools",
        category: "文本分析",
        description: "一套轻量级的中文文本清理、分词和词频统计工具。",
        developer: "数字人文社区",
        url: "https://texttools.example.com",
      },
      {
        name: "Palladio",
        category: "可视化",
        description: "基于浏览器的复杂历史数据网络与时空可视化工具。",
        developer: "斯坦福大学",
        url: "http://hdlab.stanford.edu/palladio/",
      },
      {
        name: "VGE Lab",
        category: "虚拟地理",
        description: "用于构建历史地理虚拟环境的开源框架。",
        developer: "VGE团队",
        url: "https://vge.example.com",
      },
      {
        name: "AutoOCR",
        category: "OCR工具",
        description: "针对竖排繁体古籍优化的光学字符识别引擎。",
        developer: "开源社区",
        url: "https://autoocr.example.com",
      },
      {
        name: "TimeMap",
        category: "时空地图",
        description: "快速将带时间信息的地理数据转换为动态地图。",
        developer: "TimeMap Devs",
        url: "https://timemap.example.com",
      },
    ],
  });
}

async function seedDatasets() {
  await prisma.datasetItem.createMany({
    data: [
      {
        title: "1920-1930年中国各省人口普查数据",
        type: "表格",
        description: "包含民国时期主要省份的人口数量、性别比例和职业分布数据。",
        tags: "人口, 民国, 统计",
        url: "https://data.example.com/census1920",
        institution: "东亚数据中心",
      },
      {
        title: "清代海关贸易报告数据集",
        type: "文本",
        description: "1860-1949年间各通商口岸的海关年度贸易报告全文。",
        tags: "贸易, 海关, 经济",
        url: "https://data.example.com/customs",
        institution: "布里斯托大学",
      },
      {
        title: "民国时期上海物价指数表",
        type: "表格",
        description:
          "记录了1927-1937年间上海市场的米面、棉布等基本生活物资价格。",
        tags: "物价, 经济, 上海",
        url: "https://data.example.com/prices",
        institution: "上海社科院",
      },
      {
        title: "唐代墓志铭文本语料库",
        type: "文本",
        description: "整理录入了出土的唐代墓志铭文约5000方，附带元数据。",
        tags: "墓志铭, 唐代, 语料",
        url: "https://data.example.com/epitaphs",
        institution: "陕西师范大学",
      },
      {
        title: "中国古代建筑测绘图集",
        type: "图像",
        description: "包含梁思成等前辈学者测绘的中国古建筑平面、立面和剖面图。",
        tags: "建筑, 测绘, 图纸",
        url: "https://data.example.com/architecture",
        institution: "清华大学建筑学院",
      },
      {
        title: "宋代书院分布地理数据集",
        type: "空间",
        description: "包含宋代各路书院的经纬度坐标及建立时间。",
        tags: "书院, 宋代, GIS",
        url: "https://data.example.com/academies",
        institution: "哈佛大学包弼德团队",
      },
      {
        title: "晚清报刊广告图像数据集",
        type: "图像",
        description: "从《申报》等晚清报刊中提取的商业广告图像，反映当时消费文化。",
        tags: "广告, 报刊, 图像",
        url: "https://data.example.com/ads",
        institution: "海得堡大学",
      },
      {
        title: "中国方言语音样本库",
        type: "音频",
        description: "收集了全国2000多个点的汉语方言发音样本。",
        tags: "方言, 语音, 语言学",
        url: "https://data.example.com/dialects",
        institution: "中国社科院语言所",
      },
      {
        title: "二十四史人名地名索引表",
        type: "表格",
        description: "二十四史中出现的人名和地名对照索引，方便检索。",
        tags: "二十四史, 索引, 工具书",
        url: "https://data.example.com/24histories",
        institution: "中华书局",
      },
      {
        title: "中国历代疆域变迁矢量地图",
        type: "空间",
        description: "从秦汉至明清各朝代的疆域边界矢量数据（Shapefile格式）。",
        tags: "疆域, 地图, 历史",
        url: "https://data.example.com/boundaries",
        institution: "复旦史地所",
      },
    ],
  });

  await prisma.datasetChartData.createMany({
    data: [
      { chartType: "datasetsByType", label: "文本", value: 25 },
      { chartType: "datasetsByType", label: "表格", value: 30 },
      { chartType: "datasetsByType", label: "图像", value: 15 },
      { chartType: "datasetsByType", label: "空间数据", value: 10 },
      { chartType: "datasetsByType", label: "音频", value: 5 },
      { chartType: "institutions", label: "高校", value: 40 },
      { chartType: "institutions", label: "博物馆", value: 20 },
      { chartType: "institutions", label: "图书馆", value: 15 },
      { chartType: "institutions", label: "档案馆", value: 10 },
      { chartType: "institutions", label: "研究所", value: 15 },
    ],
  });
}

async function seedDynamics() {
  await prisma.dynamicNews.createMany({
    data: [
      {
        title: "2025年数字人文国际研讨会征稿启事",
        issue: "通知",
        coverUrl: "https://picsum.photos/800/600?random=1",
        description: "会议将于2025年6月在北京举行，诚邀全球学者投稿。",
        link: "https://dh2025.example.com/cfp",
        publishDate: new Date("2024-11-01"),
      },
      {
        title: "“古籍活化”黑客马拉松大赛即将开幕",
        issue: "赛事",
        coverUrl: "https://picsum.photos/800/600?random=2",
        description: "48小时极客挑战，利用AI技术挖掘古籍价值。",
        link: "https://hackathon.example.com",
        publishDate: new Date("2024-11-15"),
      },
      {
        title: "国家社科基金重大项目“数字记忆”开题",
        issue: "新闻",
        coverUrl: "https://picsum.photos/800/600?random=3",
        description: "项目旨在构建国家级数字记忆资源库，多位专家出席。",
        link: "https://news.example.com/project-start",
        publishDate: new Date("2024-10-20"),
      },
      {
        title: "《数字人文》期刊2024年第4期目录发布",
        issue: "期刊",
        coverUrl: "https://picsum.photos/800/600?random=4",
        description: "本期聚焦“生成式人工智能与历史研究”专题。",
        link: "https://journal.example.com/issue4",
        publishDate: new Date("2024-12-01"),
      },
      {
        title: "第五届中国计算社会科学论坛在京举行",
        issue: "会议",
        coverUrl: "https://picsum.photos/800/600?random=5",
        description: "来自全国各地的300余名学者围绕计算社会科学前沿展开研讨。",
        link: "https://forum.example.com/css",
        publishDate: new Date("2024-11-10"),
      },
      {
        title: "关于举办“AI与历史研究”暑期学校的通知",
        issue: "培训",
        coverUrl: "https://picsum.photos/800/600?random=6",
        description: "为期两周的密集培训，教授Python编程与历史大数据分析。",
        link: "https://summer-school.example.com",
        publishDate: new Date("2025-01-15"),
      },
      {
        title: "数字图书馆推广工程成果展示周",
        issue: "展览",
        coverUrl: "https://picsum.photos/800/600?random=7",
        description: "展示近年来数字图书馆建设的最新成果和技术应用。",
        link: "https://exhibit.example.com",
        publishDate: new Date("2024-12-10"),
      },
      {
        title: "“云游博物馆”系列直播活动预告",
        issue: "活动",
        coverUrl: "https://picsum.photos/800/600?random=8",
        description: "知名馆长带你线上游览各大博物馆镇馆之宝。",
        link: "https://live.example.com/museum",
        publishDate: new Date("2024-11-25"),
      },
      {
        title: "第二届全国高校数字人文教学研讨会",
        issue: "教学",
        coverUrl: "https://picsum.photos/800/600?random=9",
        description: "探讨数字人文课程体系建设与人才培养模式。",
        link: "https://teaching.example.com",
        publishDate: new Date("2024-10-05"),
      },
      {
        title: "2024年度数字人文优秀成果奖评选结果公示",
        issue: "奖项",
        coverUrl: "https://picsum.photos/800/600?random=10",
        description: "共有20项优秀著作和平台项目入选。",
        link: "https://awards.example.com/results",
        publishDate: new Date("2024-12-20"),
      },
    ],
  });
}

async function seedPartners() {
  await prisma.partner.createMany({
    data: [
      {
        name: "北京大学数字人文研究中心",
        logoUrl: "https://picsum.photos/200/200?random=11",
        websiteUrl: "https://pkudh.org",
      },
      {
        name: "清华大学国学研究院",
        logoUrl: "https://picsum.photos/200/200?random=12",
        websiteUrl: "https://guoxue.tsinghua.edu.cn",
      },
      {
        name: "复旦大学历史地理研究中心",
        logoUrl: "https://picsum.photos/200/200?random=13",
        websiteUrl: "https://histgeog.fudan.edu.cn",
      },
      {
        name: "浙江大学人文高等研究院",
        logoUrl: "https://picsum.photos/200/200?random=14",
        websiteUrl: "https://ias.zju.edu.cn",
      },
      {
        name: "南京大学数字人文创客空间",
        logoUrl: "https://picsum.photos/200/200?random=15",
        websiteUrl: "https://dh.nju.edu.cn",
      },
      {
        name: "武汉大学信息管理学院",
        logoUrl: "https://picsum.photos/200/200?random=16",
        websiteUrl: "https://sim.whu.edu.cn",
      },
      {
        name: "上海图书馆数字人文项目组",
        logoUrl: "https://picsum.photos/200/200?random=17",
        websiteUrl: "https://library.sh.cn/dh",
      },
      {
        name: "中国国家图书馆数字资源部",
        logoUrl: "https://picsum.photos/200/200?random=18",
        websiteUrl: "https://nlc.cn/digital",
      },
      {
        name: "台湾大学数位人文研究中心",
        logoUrl: "https://picsum.photos/200/200?random=19",
        websiteUrl: "https://digital.ntu.edu.tw",
      },
      {
        name: "香港科技大学人文学部",
        logoUrl: "https://picsum.photos/200/200?random=20",
        websiteUrl: "https://huma.ust.hk",
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
