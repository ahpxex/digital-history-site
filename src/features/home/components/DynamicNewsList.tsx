"use client";

import { Card, CardHeader, CardBody, CardFooter, Image, Link } from "@heroui/react";

interface NewsItem {
  id: number | string;
  title: string;
  issue?: string | null;
  coverUrl?: string | null;
  description: string;
  link?: string | null;
  publishDate?: string | Date | null;
}

export function DynamicNewsList({ news }: { news: NewsItem[] }) {
    if (!news?.length) {
      return (
        <div className="w-full text-center py-20 text-default-400">
          暂无动态。
        </div>
      );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
                <Card key={item.id} className="border-none bg-transparent shadow-none hover:bg-default-50/50 transition-colors p-2">
                    <CardHeader className="p-0 pb-4">
                         <div className="aspect-video w-full bg-default-100 rounded-xl overflow-hidden relative shadow-sm">
                            {item.coverUrl ? (
                                <Image 
                                    src={item.coverUrl} 
                                    alt={item.title}
                                    classNames={{ wrapper: "w-full h-full", img: "w-full h-full object-cover" }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-default-300 bg-default-50">
                                    <span className="text-4xl opacity-20">News</span>
                                </div>
                            )}
                         </div>
                    </CardHeader>
                    <CardBody className="p-0 space-y-3">
                        <div className="flex justify-between items-center">
                             <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                {item.issue || "动态更新"}
                             </span>
                             {item.publishDate && (
                                <span className="text-xs text-default-400 font-medium">
                                    {new Date(item.publishDate).toLocaleDateString()}
                                </span>
                             )}
                        </div>
                        <h3 className="text-xl font-bold leading-tight hover:text-primary transition-colors text-foreground">
                            {item.link ? (
                                <Link href={item.link} isExternal className="text-inherit">
                                    {item.title}
                                </Link>
                            ) : item.title}
                        </h3>
                        <p className="text-default-500 text-sm line-clamp-3 leading-relaxed">
                            {item.description}
                        </p>
                    </CardBody>
                    <CardFooter className="p-0 pt-4">
                        {item.link && (
                            <Link href={item.link} isExternal size="sm" className="font-semibold text-primary hover:text-primary/80">
                                阅读全文 &rarr;
                            </Link>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
