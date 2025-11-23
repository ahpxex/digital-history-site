import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getToolBySlug, researchTools } from "@/data/research-tools";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return researchTools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  return (
    <article className="bg-card">
      <section className="bg-gradient-to-br from-primary/5 via-card to-transparent">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {tool!.complexity} · {tool!.duration}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">{tool!.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{tool!.description}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {tool!.featuredStack.map((stack) => (
              <span key={stack} className="rounded-full bg-white/70 px-3 py-1 text-xs text-slate-600">
                {stack}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {tool!.steps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-border/70 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">步骤</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h2>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border/70 bg-muted/40 p-6">
          <h3 className="text-xl font-semibold text-foreground">交付成果</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            {tool!.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-3 rounded-3xl border border-border/70 bg-card/80 p-6">
          <h3 className="text-xl font-semibold text-foreground">资源链接</h3>
          <ul className="space-y-2 text-sm">
            {tool!.resources.map((resource) => (
              <li key={resource.url}>
                <Link
                  href={resource.url}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {resource.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
