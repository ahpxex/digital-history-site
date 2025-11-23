import Link from "next/link";

import { researchTools } from "@/data/research-tools";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <header className="space-y-3 pb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">研究工具</p>
        <h1 className="text-3xl font-semibold text-foreground">方法论与基础设施</h1>
        <p className="text-sm text-muted-foreground">
          结合语义标注、可视化与审计能力的工具管线，支持数字史学项目的端到端交付。
        </p>
      </header>
      <div className="space-y-6">
        {researchTools.map((tool) => (
          <article
            key={tool.slug}
            className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1 text-[0.7rem] font-semibold tracking-[0.2em] text-primary">
                {tool.complexity}
              </span>
              <span>{tool.duration}</span>
              <span className="text-muted-foreground">{tool.featuredStack.join(" · ")}</span>
            </div>
            <div className="mt-3 space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">{tool.title}</h2>
              <p className="text-sm text-muted-foreground">{tool.summary}</p>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {tool.steps.map((step) => (
                <li key={step.title} className="rounded-2xl border border-dashed border-border/60 px-4 py-3">
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ul>
            <Link
              href={"/tools/" + tool.slug}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              查看实施细节
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
