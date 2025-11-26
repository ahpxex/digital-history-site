"use client";

import { Card, CardHeader, CardBody, CardFooter, Chip, Link } from "@heroui/react";
import { ArrowSquareOut } from "@phosphor-icons/react";

// Define a minimal interface based on what we know to avoid import issues if paths change
interface FeaturedCase {
  id: number | string;
  title: string;
  type: string;
  description: string;
  tags: string;
  url: string;
  institution: string;
}

export function FeaturedCasesGrid({ cases }: { cases: FeaturedCase[] }) {
  if (!cases?.length) {
    return (
      <div className="w-full text-center py-20 text-default-400">
        暂无精选案例。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((item) => (
        <Card 
            key={item.id} 
            className="border border-default-200 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1" 
            shadow="sm"
        >
          <CardHeader className="flex justify-between items-start px-6 pt-6 pb-0">
            <div className="flex flex-col gap-2">
                <Chip size="sm" variant="flat" color="secondary" className="w-fit">{item.type}</Chip>
                <h3 className="text-xl font-bold text-foreground line-clamp-2 leading-tight">{item.title}</h3>
            </div>
            {item.url && (
                <Link href={item.url} isExternal className="text-default-400 hover:text-primary">
                    <ArrowSquareOut size={20} />
                </Link>
            )}
          </CardHeader>
          <CardBody className="px-6 py-4">
             <p className="text-default-500 text-sm leading-relaxed line-clamp-3 mb-4">
                {item.description}
             </p>
             <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags?.split(',').slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs text-default-400 bg-default-100 px-2 py-1 rounded-md">
                        #{tag.trim()}
                    </span>
                ))}
             </div>
          </CardBody>
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs text-default-400">
                <span className="font-medium text-default-600">{item.institution}</span>
             </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
