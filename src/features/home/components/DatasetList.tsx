"use client";

import { Card, CardBody, Chip, Link, Button } from "@heroui/react";
import { Database } from "@phosphor-icons/react";

interface DatasetItem {
  id: number | string;
  title: string;
  type: string;
  description: string;
  tags: string;
  institution: string;
  url: string;
}

export function DatasetList({ datasets }: { datasets: DatasetItem[] }) {
    if (!datasets?.length) {
      return (
        <div className="w-full text-center py-20 text-default-400">
          暂无数据集。
        </div>
      );
    }
    
    return (
        <div className="grid grid-cols-1 gap-4">
            {datasets.map((item) => (
                <Card key={item.id} shadow="none" className="border border-default-200 bg-transparent hover:bg-default-50 transition-colors">
                    <CardBody className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                            <Database size={24} weight="fill" />
                        </div>
                        <div className="flex-grow space-y-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                                <Chip size="sm" variant="dot" color="warning" className="border-none">{item.type}</Chip>
                            </div>
                            <p className="text-sm text-default-500 line-clamp-2 max-w-3xl">{item.description}</p>
                            <div className="flex gap-3 text-xs text-default-400 pt-1">
                                <span className="font-medium text-default-500">{item.institution}</span>
                                {item.tags && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate max-w-md">{item.tags}</span>
                                  </>
                                )}
                            </div>
                        </div>
                        <div className="flex-shrink-0 pt-2 md:pt-0">
                             <Button as={Link} href={item.url} isExternal size="sm" variant="bordered" className="font-medium border-default-300 text-default-600">
                                访问数据
                             </Button>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
