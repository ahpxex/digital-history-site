"use client";

import { Button, Chip, Link } from "@heroui/react";
import { Wrench } from "@phosphor-icons/react";

interface ResearchTool {
  id: number | string;
  name: string;
  category: string;
  description: string;
  developer?: string | null;
  url?: string | null;
}

export function ResearchToolsList({ tools }: { tools: ResearchTool[] }) {
  if (!tools?.length) {
    return (
      <div className="w-full text-center py-20 text-default-400">
        暂无研究工具。
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tools.map((tool) => (
        <div 
            key={tool.id} 
            className="group flex flex-col md:flex-row gap-6 p-6 bg-content2/50 hover:bg-content1 border border-transparent hover:border-default-200 rounded-xl transition-all hover:shadow-sm"
        >
          <div className="flex-shrink-0">
             <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Wrench size={24} weight="duotone" />
             </div>
          </div>
          <div className="flex-grow space-y-2">
             <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-foreground">{tool.name}</h3>
                <Chip size="sm" variant="flat" className="bg-default-200">{tool.category}</Chip>
             </div>
             <p className="text-default-500 text-sm leading-relaxed max-w-3xl">{tool.description}</p>
             {tool.developer && (
                <div className="text-xs text-default-400 mt-2">
                    开发者: <span className="font-medium text-default-600">{tool.developer}</span>
                </div>
             )}
          </div>
          <div className="flex-shrink-0 flex items-center md:self-center">
             {tool.url && (
                <Button 
                    as={Link} 
                    href={tool.url} 
                    isExternal 
                    size="sm" 
                    color="primary" 
                    variant="light" 
                    radius="full"
                    className="font-medium"
                >
                    访问工具
                </Button>
             )}
          </div>
        </div>
      ))}
    </div>
  );
}
